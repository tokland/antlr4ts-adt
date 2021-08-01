// Generated from Calculator.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { NumberContext } from "./CalculatorParser";
import { ParenthesesContext } from "./CalculatorParser";
import { PowerContext } from "./CalculatorParser";
import { MultiplicationOrDivisionContext } from "./CalculatorParser";
import { AdditionOrSubtractionContext } from "./CalculatorParser";
import { StartContext } from "./CalculatorParser";
import { ExpressionContext } from "./CalculatorParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `CalculatorParser`.
 */
export interface CalculatorListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `Number`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by the `Number`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by the `Parentheses`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterParentheses?: (ctx: ParenthesesContext) => void;
	/**
	 * Exit a parse tree produced by the `Parentheses`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitParentheses?: (ctx: ParenthesesContext) => void;

	/**
	 * Enter a parse tree produced by the `Power`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPower?: (ctx: PowerContext) => void;
	/**
	 * Exit a parse tree produced by the `Power`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPower?: (ctx: PowerContext) => void;

	/**
	 * Enter a parse tree produced by the `MultiplicationOrDivision`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicationOrDivision?: (ctx: MultiplicationOrDivisionContext) => void;
	/**
	 * Exit a parse tree produced by the `MultiplicationOrDivision`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicationOrDivision?: (ctx: MultiplicationOrDivisionContext) => void;

	/**
	 * Enter a parse tree produced by the `AdditionOrSubtraction`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAdditionOrSubtraction?: (ctx: AdditionOrSubtractionContext) => void;
	/**
	 * Exit a parse tree produced by the `AdditionOrSubtraction`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAdditionOrSubtraction?: (ctx: AdditionOrSubtractionContext) => void;

	/**
	 * Enter a parse tree produced by `CalculatorParser.start`.
	 * @param ctx the parse tree
	 */
	enterStart?: (ctx: StartContext) => void;
	/**
	 * Exit a parse tree produced by `CalculatorParser.start`.
	 * @param ctx the parse tree
	 */
	exitStart?: (ctx: StartContext) => void;

	/**
	 * Enter a parse tree produced by `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
}

