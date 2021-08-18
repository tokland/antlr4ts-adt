export interface Start {
    type: "Start";
    expr: Expression;
}

export interface ExprList {
    type: "ExprList";
    expression: Expression;
    head: Expression[];
    tail: Expression[];
}

export interface AggregateFn {
    type: "AggregateFn";
    name: Token;
}

export type Expression =
    | Number
    | Aggregate
    | Parentheses
    | AdditionOrSubtraction;

export interface Number {
    type: "Number";
    value: Token;
}

export interface Aggregate {
    type: "Aggregate";
    fn: AggregateFn;
    values: ExprList;
}

export interface Parentheses {
    type: "Parentheses";
    inner: Expression;
}

export interface AdditionOrSubtraction {
    type: "AdditionOrSubtraction";
    left: Expression;
    operator: Token;
    right: Expression;
}

export type Token = { symbol: string, text: string };
