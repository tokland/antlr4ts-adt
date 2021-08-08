Thin wrapper over antlr4ts to build typed ADTs from ANTLR4 grammars.

## Requirements

You need your ANTLR4 grammar to have:

0. A `start` with a single node.
1. Labels (` NODE # ThisIsALabel`) for each node type we want to extract.
2. Inner labels (`'(' inner=expression ')'`) to access parts of the node expression.

## Example

```
$ (cd src/example && npx antlr4ts Calculator.g4 -o antlr4 -visitor)
$ npx ts-node src/example/calculator.ts
```

[src/Calculator.g4]

[src/calculator.ts]
