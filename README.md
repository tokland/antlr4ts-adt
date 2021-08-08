Thin wrapper over antlr4ts to build full-typed ADTs from ANTLR4 grammars for Typescript.

## Requirements

The ANTLR4 grammar must have:

0. A `start` rule containing a single node.
1. Named labels (` NODE # ThisIsALabel`) to be used as the `type` property of the discriminated tagged union type.
2. Inner labels (`mylabel=NODE`) to be used as properties of that particular node type.

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

const ast = getAst<CalculatorVisitor<unknown>>("1 + 3", {
    lexer: CalculatorLexer,
    parser: CalculatorParser,
});
console.log(JSON.stringify(ast.node, null, 2));
console.log(ast.text, "=", calculatorEval(ast.node));
```

```
$ (cd src/example && npx antlr4ts Calculator.g4 -o antlr4 -visitor)
$ npx ts-node src/example/calculator.ts
```
