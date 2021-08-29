import { Token, getAdtFromLexerParser } from "../../antlr4ts-adt"; // TODO
import { CalculatorLexer } from "./CalculatorLexer";
import { CalculatorParser } from "./CalculatorParser";
export { Token };

export interface Start {
    type: "start";
    expression: Expression;
}

export interface ExprList {
    type: "exprList";
    head: Expression[];
    tail: Expression[];
    expression: Expression[];
}

export interface AggregateFn {
    type: "aggregateFn";
    name: Token;
}

export type Expression =
    | Number
    | Aggregate
    | Parentheses
    | AdditionOrSubtraction;
export interface Number {
    type: "number";
    value: Token;
}

export interface Aggregate {
    type: "aggregate";
    fn: AggregateFn;
    values: ExprList;
    aggregateFn: AggregateFn;
    exprList: ExprList;
}

export interface Parentheses {
    type: "parentheses";
    inner: Expression;
    expression: Expression;
}

export interface AdditionOrSubtraction {
    type: "additionOrSubtraction";
    left: Expression;
    operator: Token;
    right: Expression;
    expression: Expression[];
}

interface Mapping {
    start: Start;
    exprList: ExprList;
    aggregateFn: AggregateFn;
    expression: Expression;
}

export function getAst<Rule extends keyof Mapping>(
    startRule: Rule,
    input: string
): Mapping[Rule] {
    return getAdtFromLexerParser<CalculatorParser, Mapping[Rule]>(
        input,
        CalculatorLexer,
        CalculatorParser,
        (parser) => parser[startRule]
    );
}
