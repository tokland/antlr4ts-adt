export interface Start {
  type: "Start";
  expr: Expression;
}

export interface List {
  type: "List";
  expression: Expression;
  head: Expression[];
  tail: Expression[];
}

export type Expression = Number | Sum | Parentheses | AdditionOrSubtraction;

export interface Number {
  type: "Number";
  value: Token;
}

export interface Sum {
  type: "Sum";
  values: List;
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
