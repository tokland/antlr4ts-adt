import _ from "lodash";
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
        case "Aggregate":
            const values = [...expr.values.head, ...expr.values.tail].map(calculatorEval);
            switch (expr.fn.name.text) {
                case "sum":
                    return _.sum(values);
                case "product":
                    return _.reduce(values, _.multiply, 1);
                default:
                    throw new Error(`Unsupported aggregate function: ${expr.fn.name}`);
            }
    }
}

const input = "1 + product(2,3,5) + sum(2,3,4,2)";
const ast = getAst<Start>(input, { lexer: CalculatorLexer, parser: CalculatorParser });

console.log(JSON.stringify(ast, null, 2));
console.log(input, "=", calculatorEval(ast.expr));
