import _ from "lodash";
import { getAst } from "../antlr4ts-adt";
import { Expression, Start } from "./CalculatorAdt";
import { CalculatorLexer } from "./antlr4/CalculatorLexer";
import { CalculatorParser } from "./antlr4/CalculatorParser";

function evalExpr(expr: Expression): number {
    switch (expr.type) {
        case "Number":
            return parseFloat(expr.value.text);
        case "Parentheses":
            return evalExpr(expr.inner);
        case "AdditionOrSubtraction":
            const left = evalExpr(expr.left);
            const right = evalExpr(expr.right);
            return expr.operator.symbol === "ADD" ? left + right : left - right;
        case "Aggregate":
            const values = [...expr.values.head, ...expr.values.tail].map(evalExpr);
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

const [input] = process.argv.slice(2);
const ast = getAst<Start>(input, { lexer: CalculatorLexer, parser: CalculatorParser });

console.error(JSON.stringify(ast, null, 2));
console.log(evalExpr(ast.expr));
