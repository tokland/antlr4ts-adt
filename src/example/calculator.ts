import { getAst } from "../antlr4ts-adt";
import { Expression, Start } from "./CalculatorAdt";
import { CalculatorLexer } from "./antlr4/CalculatorLexer";
import { CalculatorParser } from "./antlr4/CalculatorParser";

function calculatorEval(expr: Expression): number {
    switch (expr.type) {
        case "Number":
            return parseFloat(expr.value.text);
        case "Parentheses":
            return calculatorEval(expr.inner);
        case "AdditionOrSubtraction":
            const left = calculatorEval(expr.left);
            const right = calculatorEval(expr.right);
            return expr.operator.symbol === "ADD" ? left + right : left - right;
        case "Sum":
            const values = [...expr.values.head, ...expr.values.tail];
            return values.map(calculatorEval).reduce((acc, x) => acc + x, 0);
    }
}

const input = "1 + 2 + sum(30, 8, 1)";
const ast = getAst<Start>(input, { lexer: CalculatorLexer, parser: CalculatorParser });

console.log(JSON.stringify(ast, null, 2));
console.log(input, "=", calculatorEval(ast.expr));
