// Generated from Calculator.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { NumberContext } from "./CalculatorParser";
import { AggregateContext } from "./CalculatorParser";
import { ParenthesesContext } from "./CalculatorParser";
import { AdditionOrSubtractionContext } from "./CalculatorParser";
import { StartContext } from "./CalculatorParser";
import { ExprListContext } from "./CalculatorParser";
import { AggregateFnContext } from "./CalculatorParser";
import { ExpressionContext } from "./CalculatorParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `CalculatorParser`.
 */
export interface CalculatorListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `number`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by the `number`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by the `aggregate`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAggregate?: (ctx: AggregateContext) => void;
	/**
	 * Exit a parse tree produced by the `aggregate`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAggregate?: (ctx: AggregateContext) => void;

	/**
	 * Enter a parse tree produced by the `parentheses`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterParentheses?: (ctx: ParenthesesContext) => void;
	/**
	 * Exit a parse tree produced by the `parentheses`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitParentheses?: (ctx: ParenthesesContext) => void;

	/**
	 * Enter a parse tree produced by the `additionOrSubtraction`
	 * labeled alternative in `CalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAdditionOrSubtraction?: (ctx: AdditionOrSubtractionContext) => void;
	/**
	 * Exit a parse tree produced by the `additionOrSubtraction`
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
	 * Enter a parse tree produced by `CalculatorParser.exprList`.
	 * @param ctx the parse tree
	 */
	enterExprList?: (ctx: ExprListContext) => void;
	/**
	 * Exit a parse tree produced by `CalculatorParser.exprList`.
	 * @param ctx the parse tree
	 */
	exitExprList?: (ctx: ExprListContext) => void;

	/**
	 * Enter a parse tree produced by `CalculatorParser.aggregateFn`.
	 * @param ctx the parse tree
	 */
	enterAggregateFn?: (ctx: AggregateFnContext) => void;
	/**
	 * Exit a parse tree produced by `CalculatorParser.aggregateFn`.
	 * @param ctx the parse tree
	 */
	exitAggregateFn?: (ctx: AggregateFnContext) => void;

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

