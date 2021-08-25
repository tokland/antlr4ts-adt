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

        const keys = Object.keys(node)
            .filter(key => key.startsWith("_"))
            .filter(key => !keysToIgnore.includes(key)) as Array<keyof RuleNode>;

        const pairs = keys.map((key): [keyof RuleNode, Token | MainType] => {
            const prop = key.replace(/^_/, "") as keyof RuleNode;
            const innerNode = node[key];

            if (innerNode instanceof CommonToken) {
                const symbol = this.parser.vocabulary.getSymbolicName(innerNode.type);
                const token: Token = { symbol: symbol, text: innerNode.text || "" };
                return [prop, token];
            } else if (innerNode instanceof ParserRuleContext) {
                return [prop, super.visit(innerNode)];
            } else if (innerNode instanceof Array) {
                // TODO: Fix this cast
                return [prop, innerNode.map(x => super.visit(x)) as any];
            } else {
                throw new Error("Unknown node");
            }
        });

        // TODO: Fix this cast
        return {
            type: uncapitalize(contextName),
            ...Object.fromEntries(pairs),
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
