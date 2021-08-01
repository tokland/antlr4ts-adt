// Generated from Calculator.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { NumberContext } from "./CalculatorParser";
import { ParenthesesContext } from "./CalculatorParser";
import { PowerContext } from "./CalculatorParser";
import { MultiplicationOrDivisionContext } from "./CalculatorParser";
import { AdditionOrSubtractionContext } from "./CalculatorParser";
import { StartContext } from "./CalculatorParser";
import { ExpressionContext } from "./CalculatorParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CalculatorParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface CalculatorVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `Number`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by the `Parentheses`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParentheses?: (ctx: ParenthesesContext) => Result;

	/**
	 * Visit a parse tree produced by the `Power`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPower?: (ctx: PowerContext) => Result;

	/**
	 * Visit a parse tree produced by the `MultiplicationOrDivision`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicationOrDivision?: (ctx: MultiplicationOrDivisionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AdditionOrSubtraction`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditionOrSubtraction?: (ctx: AdditionOrSubtractionContext) => Result;

	/**
	 * Visit a parse tree produced by `CalculatorParser.start`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStart?: (ctx: StartContext) => Result;

	/**
	 * Visit a parse tree produced by `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
}

