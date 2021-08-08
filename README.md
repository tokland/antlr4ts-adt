Thin wrapper over antlr4ts to build full-typed ADTs from ANTLR4 grammars for Typescript.

## Requirements

The package uses an opinionated approach that does not cover all use cases. To use it, your ANTLR4 grammar must have:

0. A `start` rule referencing a single rule.
1. Named labels (` NODE # ThisIsALabel`) that will be used as the `{ type: "ThisIsALabel` }` property of the discriminated tagged union.
2. Inner labels (`mylabel=NODE`) that will be used as properties of that particular node type.

## Example

A simple calculator: [ANTL4 Grammar](src/example/Calculator.g4), [AST example](src/example/calculator.ts)

```g4
grammar Calculator;

ADD: '+';
SUB: '-';
NUMBER: '-'?[0-9]+;
WHITESPACE: [ \r\n\t]+ -> skip;

start : expression;

expression
   : value=NUMBER                                         # Number
   | '(' inner=expression ')'                             # Parentheses
   | left=expression operator=(ADD|SUB) right=expression  # AdditionOrSubtraction
   ;
```

```typescript
type Grammar = CalculatorVisitor<unknown>;
type CalculatorNode = AstNode<Grammar>;
/* type CalculatorNode = {
    type: "Number";
    value: Token;
} | {
    type: "Parentheses";
    inner: CalculatorNode;
} | {
    type: "AdditionOrSubtraction";
    left: CalculatorNode;
    operator: Token;
    right: CalculatorNode;
} */

function calculatorEval(node: AstNode<CalculatorVisitor<unknown>>): number {
    switch (node.type) {
        case "Number":
            return parseFloat(node.value.text);
        case "Parentheses":
            return calculatorEval(node.inner);
        case "AdditionOrSubtraction":
            const left = calculatorEval(node.left);
            const right = calculatorEval(node.right);
            return node.operator.symbol === "ADD" ? left + right : left - right;
    }
}

const input = "(40 + 5) - 3";
const ast = getAst<CalculatorVisitor<unknown>>(input, {
    lexer: CalculatorLexer,
    parser: CalculatorParser,
});
console.log(JSON.stringify(ast, null, 2));
console.log(input, "=", calculatorEval(ast)); // (40 + 5) - 3 = 42
```

Usage:

```shell
$ (cd src/example && npx antlr4ts Calculator.g4 -o antlr4 -visitor)
$ npx ts-node src/example/calculator.ts
```
