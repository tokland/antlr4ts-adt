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
type Expand<T> = {} & { [P in keyof T]: T[P] };
type Params<T> = T extends (...args: infer P) => any ? P : never;
type Key = keyof any;

type RemoveVisitPrefix<T extends Key> = T extends `visit${infer S}` ? S : never;

type InternalProperties = "start" | "stop" | "parent";
type InternalVisitMethod = "visit" | "visitStart" | "visitErrorNode" | "visitTerminal" | "visitChildren";

type GetProperties<Prop> = Prop extends `_${infer U}` ? Exclude<U, InternalProperties> : never;
type GetContext<Visitor, VisitMethod extends Key> = Params<NonNullable<Visitor[VisitMethod & keyof Visitor]>>[0];
type GetContextProperties<Visitor, VisitMethod extends Key> = GetProperties<Keys<GetContext<Visitor, VisitMethod>>>;

type AllVisitMethod<Visitor> = Exclude<keyof Visitor, InternalVisitMethod>;

type VisitMethod<Visitor> = Values<
    { [Method in AllVisitMethod<Visitor>]: GetContextProperties<Visitor, Method> extends never ? never : Method }
>;

type GetPropType<Visitor, Method extends VisitMethod<Visitor>, Prop extends string> = Get<
    GetContext<Visitor, Method>,
    `_${Prop}`
> extends Antlr4Token
    ? Token
    : AstNode<Visitor>;

type GetProps<Visitor, Method extends VisitMethod<Visitor>> = {
    [Prop in GetContextProperties<Visitor, Method>]: GetPropType<Visitor, Method, Prop>;
};

export interface Token {
    symbol: string;
    text: string;
}

export type AstNode<Visitor> = Values<
    { [Method in VisitMethod<Visitor>]: Expand<{ type: RemoveVisitPrefix<Method> } & GetProps<Visitor, Method>> }
>;

class AstBuilderVisitor<Visitor> extends AbstractParseTreeVisitor<AstNode<Visitor>> {
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

interface LexerClass {
    new (s: CodePointCharStream): Lexer;
}

interface ParserClass {
    new (s: CommonTokenStream): Parser & { start(): ParserRuleContext };
}

export function getAst<Visitor>(input: string, options: { lexer: LexerClass; parser: ParserClass }): AstNode<Visitor> {
    const { lexer: LexerClass, parser: ParserClass } = options;
    const inputStream = CharStreams.fromString(input);
    const lexer = new LexerClass(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ParserClass(tokenStream);
    const tree = parser.start();
    const astBuilderVisitor = new AstBuilderVisitor<Visitor>(parser);
    return astBuilderVisitor.visit(tree);
}
