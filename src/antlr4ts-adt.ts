import {
    CharStreams,
    CodePointCharStream,
    CommonToken,
    CommonTokenStream,
    Lexer,
    Parser,
    ParserRuleContext,
    Token as Antlr4Token,
} from "antlr4ts";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { RuleNode } from "antlr4ts/tree/RuleNode";

type Keys<T> = Exclude<keyof T, never>;
type Values<T> = T[keyof T];
type Get<T, Prop extends Key> = T[Prop & keyof T];

type RemoveVisitPrefix<T extends Key> = T extends `visit${infer S}` ? S : never;

type IgnoreProperies = "start" | "stop" | "parent";
type GetProperties<Prop> = Prop extends `_${infer U}` ? Exclude<U, IgnoreProperies> : never;

type Params<T> = T extends (...args: infer P) => any ? P : never;

type Key = keyof any;

type GetContext<Visitor, VisitMethod extends Key> = Params<NonNullable<Visitor[VisitMethod & keyof Visitor]>>[0];

type GetContextProperties<Visitor, VisitMethod extends Key> = GetProperties<Keys<GetContext<Visitor, VisitMethod>>>;

type InternalVisitMethod = "visit" | "visitStart" | "visitErrorNode" | "visitTerminal" | "visitChildren";
type AllVisitMethod<Visitor> = Exclude<keyof Visitor, InternalVisitMethod>;

type VisitMethod<Visitor> = Values<
    { [VM in AllVisitMethod<Visitor>]: GetContextProperties<Visitor, VM> extends never ? never : VM }
>;

type GetProps<Visitor, VM extends VisitMethod<Visitor>> = {
    [Prop in GetContextProperties<Visitor, VM>]: Get<GetContext<Visitor, VM>, `_${Prop}`> extends Antlr4Token
        ? Token
        : AstNode<Visitor>;
};

export interface Token {
    symbol: string;
    text: string;
}

export type AstNode<Visitor> = Values<
    { [VM in VisitMethod<Visitor>]: { type: RemoveVisitPrefix<VM> } & GetProps<Visitor, VM> }
>;

class BuildAstVisitor<Visitor> extends AbstractParseTreeVisitor<AstNode<Visitor>> {
    constructor(private parser: Parser) {
        super();
    }

    defaultResult(): AstNode<Visitor> {
        throw new Error();
    }

    visitChildren(node: RuleNode): AstNode<Visitor> {
        const contextName = node.constructor.name.replace(/Context$/, "");
        const keysToIgnore = ["_parent", "_start", "_stop"];

        if (contextName === "Start") {
            return super.visit(node.getChild(0));
        } else {
            const keys = Object.keys(node)
                .filter(key => key.startsWith("_"))
                .filter(key => !keysToIgnore.includes(key)) as Array<keyof RuleNode>;

            const pairs = keys.map((key): [keyof RuleNode, Token | AstNode<Visitor>] => {
                const prop = key.replace(/^_/, "") as keyof RuleNode;
                const innerNode = node[key];

                if (innerNode instanceof CommonToken) {
                    const symbol = this.parser.vocabulary.getSymbolicName(innerNode.type);
                    debugger;
                    const token: Token = { symbol: symbol || "", text: innerNode.text || "" };
                    return [prop, token];
                } else if (innerNode instanceof ParserRuleContext) {
                    return [prop, super.visit(innerNode)];
                } else {
                    throw new Error("Unknown node");
                }
            });

            return { type: contextName, ...Object.fromEntries(pairs) } as AstNode<Visitor>;
        }
    }
}

export interface AST<Node> {
    text: string;
    node: Node;
}

interface LexerClass {
    new (s: CodePointCharStream): Lexer;
}

interface ParserClass {
    new (s: CommonTokenStream): Parser & { start(): ParserRuleContext };
}

export function getAst<Visitor>(
    input: string,
    options: { lexer: LexerClass; parser: ParserClass }
): AST<AstNode<Visitor>> {
    const { lexer: LexerClass, parser: ParserClass } = options;
    const inputStream = CharStreams.fromString(input);
    const lexer = new LexerClass(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ParserClass(tokenStream);
    const tree = parser.start();
    const astVisitor = new BuildAstVisitor<Visitor>(parser);
    const node = astVisitor.visit(tree);
    return { text: input, node };
}
