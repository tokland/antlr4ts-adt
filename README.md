Thin wrapper over antlr4ts to build full-typed ADTs from ANTLR4 grammars for Typescript.

## Requirements

The package uses an opinionated approach that does not cover all use cases. To use it, your ANTLR4 grammar must have:

0. A `start` rule referencing a single rule.
1. Named labels (` NODE # ThisIsALabel`) that will be used as the `{ type: "ThisIsALabel` }` property of the discriminated tagged union.
2. Inner labels (`mylabel=NODE`) that will be used as properties of that particular node type.

## Example

A simple calculator: [ANTL4 Grammar](src/example/Calculator.g4), [AST example](src/example/calculator.ts)

Usage:

```shell
$ (cd src/example && npx antlr4ts Calculator.g4 -o antlr4 -visitor)
$ npx ts-node src/generate-adt.ts src/example/antlr4/CalculatorParser.ts StartContext src/example/CalculatorAdt.ts
$ npx ts-node src/example/calculator.ts
# 1 + 2 + sum(30, 8, 1) = 1
```
