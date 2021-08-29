import {
    Parser,
    CommonToken,
    ParserRuleContext,
    CodePointCharStream,
    Lexer,
    CommonTokenStream,
    CharStreams,
} from "antlr4ts";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";

export type Token = { symbol: string | undefined; text: string };

export class AstBuilderVisitor<MainType> extends AbstractParseTreeVisitor<MainType> {
    constructor(private parser: Parser) {
        super();
    }

    defaultResult(): MainType {
        throw new Error();
    }

    visitChildren(node: RuleNode): MainType {
        const contextName = node.constructor.name.replace(/Context$/, "");
        const keysToIgnore = ["_parent", "_start", "_stop"];

        const methodsToIgnore = ["constructor", "ruleIndex", "enterRule", "exitRule", "accept"];
        const allMethods = Object.getOwnPropertyNames(Reflect.getPrototypeOf(node));
        const methods = allMethods.filter(m => !methodsToIgnore.includes(m)) as Array<keyof RuleNode>;

        const keys = Object.keys(node)
            .filter(key => key.startsWith("_"))
            .filter(key => !keysToIgnore.includes(key)) as Array<keyof RuleNode>;

        const sourcePairs1 = keys.map(key => {
            const prop = key.replace(/^_/, "") as keyof RuleNode;
            const innerNode = node[key];
            return [prop, innerNode];
        });

        const sourcePairs2 = methods.map(method => {
            const innerNode = node[method]();
            return [method, innerNode];
        });

        const sourcePairs = [...sourcePairs1, ...sourcePairs2];

        const pairs = sourcePairs.map(([prop, innerNode]): [keyof RuleNode, Token | MainType] | null => {
            if (innerNode instanceof CommonToken) {
                const symbol = this.parser.vocabulary.getSymbolicName(innerNode.type);
                const token: Token = { symbol, text: innerNode.text || "" };
                return [prop, token];
            } else if (innerNode instanceof TerminalNode) {
                const symbol = this.parser.vocabulary.getSymbolicName(innerNode.symbol.type);
                const token: Token = { symbol, text: innerNode.text || "" };
                return [prop, token];
            } else if (innerNode instanceof ParserRuleContext) {
                return [prop, super.visit(innerNode)];
            } else if (innerNode instanceof Array) {
                // TODO: Fix this cast
                return [prop, innerNode.map(x => super.visit(x)) as any];
            } else if (!innerNode) {
                return null;
            } else {
                debugger;
                throw new Error(
                    `Unknown node (prop=${prop}): ${JSON.stringify(innerNode)} (type=${typeof innerNode})`
                );
            }
        });

        // TODO: Fix this cast
        return {
            type: uncapitalize(contextName),
            ...Object.fromEntries(pairs.flatMap(x => (x === null ? [] : [x]))),
        } as unknown as MainType;
    }
}

function uncapitalize(s: string) {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

type LexerClass = { new (s: CodePointCharStream): Lexer };

type ParserClass<MyParser extends Parser> = {
    new (s: CommonTokenStream): MyParser;
};

export function getAdtFromLexerParser<MyParser extends Parser, ResultType>(
    input: string,
    LexerClass: LexerClass,
    ParserClass: ParserClass<MyParser>,
    getTreeFn: (parser: MyParser) => () => ParserRuleContext
): ResultType {
    const inputStream = CharStreams.fromString(input);
    const lexer = new LexerClass(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ParserClass(tokenStream);
    const treeBuilder = getTreeFn(parser);
    const tree = treeBuilder.bind(parser)();
    const visitor = new AstBuilderVisitor<ResultType>(parser);
    return visitor.visit(tree);
}
