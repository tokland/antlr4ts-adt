import { AstNode, getAst } from "../antlr4ts-adt";
import { CalculatorLexer } from "./antlr4/CalculatorLexer";
import { CalculatorParser } from "./antlr4/CalculatorParser";
import { CalculatorVisitor } from "./antlr4/CalculatorVisitor";

type CalculatorNode = AstNode<CalculatorVisitor<unknown>>;

function calculatorEval(node: CalculatorNode): number {
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
console.log(input, "=", calculatorEval(ast));
