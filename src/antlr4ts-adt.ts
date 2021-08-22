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

type Token = { symbol: string | undefined; text: string };

class AstBuilderVisitor<MainType> extends AbstractParseTreeVisitor<MainType> {
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
        return { type: contextName, ...Object.fromEntries(pairs) } as unknown as MainType;
    }
}

interface GetAstOptions<StartKey extends string> {
    lexer: { new (s: CodePointCharStream): Lexer };
    // TODO: start should not be hardcoded
    parser: { new (s: CommonTokenStream): Parser & { [K in StartKey]: () => ParserRuleContext } };
}

export function getAst<StartKey extends string, StartType>(
    input: string,
    startKey: StartKey,
    options: GetAstOptions<StartKey>
): StartType {
    const { lexer: LexerClass, parser: ParserClass } = options;
    const inputStream = CharStreams.fromString(input);
    const lexer = new LexerClass(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ParserClass(tokenStream);
    const tree = parser[startKey]();
    const astBuilderVisitor = new AstBuilderVisitor<StartType>(parser);
    return astBuilderVisitor.visit(tree);
}
