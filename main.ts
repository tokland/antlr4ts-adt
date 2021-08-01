import { CharStreams, CommonTokenStream } from "antlr4ts";
import { CalculatorLexer } from "./CalculatorLexer";
import { CalculatorParser } from "./CalculatorParser";

let inputStream = CharStreams.fromString("1+2");
let lexer = new CalculatorLexer(inputStream);
let tokenStream = new CommonTokenStream(lexer);
let parser = new CalculatorParser(tokenStream);

let tree = parser.start();
console.log(tree);

const start = tree.children![0];
console.log(
    start.text,
    start.constructor.name,
    (start as any)._left.text,
    (start as any)._operator.text,
    (start as any)._right.text
);
