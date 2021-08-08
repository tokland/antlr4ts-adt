import { CharStreams, CommonToken, CommonTokenStream, ParserRuleContext, Token } from "antlr4ts";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { CalculatorLexer } from "./CalculatorLexer";
import {
    AdditionOrSubtractionContext,
    CalculatorParser,
    NumberContext,
    ParenthesesContext,
} from "./CalculatorParser";
import { CalculatorVisitor } from "./CalculatorVisitor";

const inputStream = CharStreams.fromString("=(11 + 55) - 42");
const lexer = new CalculatorLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new CalculatorParser(tokenStream);
const tree = parser.start();

class CalculatorResultVisitor
    extends AbstractParseTreeVisitor<number>
    implements CalculatorVisitor<number>
{
    defaultResult() {
        return 0;
    }

    visitNumber(context: NumberContext): number {
        console.log("visitNumber", context.text);
        return parseFloat(context.text);
    }

    visitParentheses(context: ParenthesesContext): number {
        const inner = super.visit(context._inner);
        console.log("visitParentheses", { text: context.text, inner });
        return inner;
    }

    visitAdditionOrSubtraction(context: AdditionOrSubtractionContext): number {
        const left = super.visit(context._left);
        const right = super.visit(context._right);
        console.log("visitAdditionOrSubtraction", { left, op: context._operator.text, right });
        return context._operator.text === "+" ? left + right : left - right;
    }
}

type Z1 = Exclude<Keys<AdditionOrSubtractionContext>, Keys<ParserRuleContext>>;

type RemoveVisitPrefix<T extends string> = T extends `visit${infer S}` ? S : never;
type X1 = RemoveVisitPrefix<"visitHello">;

type Keys<T> = Exclude<keyof T, never>;

type Grammar = CalculatorVisitor<unknown>;

type T1 = Exclude<
    keyof Grammar,
    "visit" | "visitStart" | "visitErrorNode" | "visitTerminal" | "visitChildren"
>;
type T1b = RemoveVisitPrefix<T1>;

type T2 = Keys<Parameters<NonNullable<Grammar["visitExpression"]>>[0]>;
type T3 = Keys<Parameters<NonNullable<Grammar["visitNumber"]>>[0]>;
type T4 = Keys<Parameters<NonNullable<Grammar["visitAdditionOrSubtraction"]>>[0]>;

type GetContext<VisitMethod extends keyof Grammar> = Parameters<
    NonNullable<Grammar[VisitMethod]>
>[0];

type GetContextKeys<VisitMethod extends keyof Grammar> = Keys<GetContext<VisitMethod>>;

type GetProperties<S> = S extends `_${infer U}` ? Exclude<U, IgnoreProperies> : never;

type GetContextProperties<VisitMethod extends keyof Grammar> = GetProperties<
    Keys<GetContext<VisitMethod>>
>;

type IgnoreProperies = "start" | "stop" | "parent";
type R0 = GetContext<"visitAdditionOrSubtraction">;
type R0b = R0["_left"] extends Token ? 1 : 0;
type R0c = R0["_operator"] extends Token ? 1 : 0;
type R1 = GetContextKeys<"visitAdditionOrSubtraction">;

// TODO: CalculatorExpression OR TerminalNode (string)
/*
type GetProps<K extends T1, Expr> = { [K2 in GetProperties<GetContext<K>>]: Expr };
type R2 = GetProps<"visitAdditionOrSubtraction", number>;
*/

type F1 = GetProperties<GetContextKeys<"visitAdditionOrSubtraction">>;

type Expand<T> = { [K in keyof T]: T[K] };

type MyToken = { symbol: string; text: string };

type CalculatorNode_ = {
    [K in T1]: { type: RemoveVisitPrefix<K> } & (GetContextProperties<K> extends never
        ? { token: MyToken }
        : {
              [K2 in GetContextProperties<K>]: GetContext<K>[`_${K2}` &
                  keyof GetContext<K>] extends Token
                  ? MyToken
                  : CalculatorNode_;
          });
}[T1];

type T12 = Expand<CalculatorNode_>;

export type CalculatorNode = {
    [K in CalculatorNode_["type"]]: {
        [K2 in keyof Extract<CalculatorNode_, { type: K }>]: Extract<
            CalculatorNode_,
            { type: K }
        >[K2];
    };
};

type Q1 = Expand<Extract<CalculatorNode_, { type: "AdditionOrSubtraction" }>>;
type Q2 = Expand<Extract<CalculatorNode_, { type: "Number" }>>;

/*
type Node =
    | { type: "Number"; token: MyToken }
    | { type: "Parentheses"; inner: Node }
    | { type: "AdditionOrSubtraction"; operator: MyToken; left: Node; right: Node };
    */

type CNode = CalculatorNode_;
type G1 = keyof CNode;

class CalculatorAstVisitor
    extends AbstractParseTreeVisitor<CNode>
    implements CalculatorVisitor<CNode>
{
    defaultResult(): CNode {
        throw new Error();
    }

    visitChildren(node: RuleNode): CNode {
        console.log("visitChildren", node.constructor.name);
        const contextName = node.constructor.name.replace(/Context$/, "");

        // TODO: Start returns an array, what to do ?
        if (contextName === "Start") {
            return super.visit(node.getChild(1));
        } else {
            const keys = Object.keys(node)
                .filter(s => s.startsWith("_"))
                .filter(s => !["_parent", "_start", "_stop"].includes(s));

            if (keys.length === 0) {
                const node2 = (node as any).children[0].symbol;
                return {
                    type: contextName as any,
                    token: {
                        symbol:
                            CalculatorParser.VOCABULARY.getSymbolicName((node2 as any).type) ||
                            "unknown",
                        text: node2.text,
                    },
                };
            } else {
                const attrs = Object.fromEntries(
                    keys.map(key => {
                        const node2 = (node as any)[key];
                        const key2 = key.replace(/^_/, "");

                        if (node2 instanceof CommonToken) {
                            global.CalculatorParser = CalculatorParser;
                            return [
                                key2,
                                {
                                    symbol: CalculatorParser.VOCABULARY.getSymbolicName(node2.type),
                                    text: node2.text,
                                },
                            ];
                        } else if (node2 instanceof ParserRuleContext) {
                            return [key2, super.visit(node2)];
                        } else {
                            throw new Error("Unknown node");
                        }
                    })
                );
                return { type: contextName as any, ...(attrs as any) };
            }
        }
    }
}

declare const global: any;

const calculatorAstVisitor = new CalculatorAstVisitor();
const ast = calculatorAstVisitor.visit(tree);
console.log(JSON.stringify(ast, null, 2));

//const calculatorResultVisitor = new CalculatorResultVisitor();
//const res = calculatorResultVisitor.visit(tree);
// console.log({ res });

/*
const start = tree.children![0] as ExpressionContext;

console.log(
    start.text,
    start.constructor.name,
    (start as any)._left.text,
    (start as any)._operator.text,
    (start as any)._right.text
);
*/
