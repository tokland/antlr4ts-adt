// Generated from Calculator.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { CalculatorListener } from "./CalculatorListener";
import { CalculatorVisitor } from "./CalculatorVisitor";


export class CalculatorParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly ADD = 6;
	public static readonly SUB = 7;
	public static readonly NUMBER = 8;
	public static readonly WHITESPACE = 9;
	public static readonly RULE_start = 0;
	public static readonly RULE_exprList = 1;
	public static readonly RULE_aggregateFn = 2;
	public static readonly RULE_expression = 3;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"start", "exprList", "aggregateFn", "expression",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "','", "'sum'", "'product'", "'('", "')'", "'+'", "'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, "ADD", 
		"SUB", "NUMBER", "WHITESPACE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CalculatorParser._LITERAL_NAMES, CalculatorParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CalculatorParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Calculator.g4"; }

	// @Override
	public get ruleNames(): string[] { return CalculatorParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return CalculatorParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(CalculatorParser._ATN, this);
	}
	// @RuleVersion(0)
	public start(): StartContext {
		let _localctx: StartContext = new StartContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, CalculatorParser.RULE_start);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 8;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exprList(): ExprListContext {
		let _localctx: ExprListContext = new ExprListContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, CalculatorParser.RULE_exprList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 11;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << CalculatorParser.T__1) | (1 << CalculatorParser.T__2) | (1 << CalculatorParser.T__3) | (1 << CalculatorParser.NUMBER))) !== 0)) {
				{
				this.state = 10;
				_localctx._expression = this.expression(0);
				_localctx._head.push(_localctx._expression);
				}
			}

			this.state = 17;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === CalculatorParser.T__0) {
				{
				{
				this.state = 13;
				this.match(CalculatorParser.T__0);
				this.state = 14;
				_localctx._expression = this.expression(0);
				_localctx._tail.push(_localctx._expression);
				}
				}
				this.state = 19;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aggregateFn(): AggregateFnContext {
		let _localctx: AggregateFnContext = new AggregateFnContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, CalculatorParser.RULE_aggregateFn);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 20;
			_localctx._name = this._input.LT(1);
			_la = this._input.LA(1);
			if (!(_la === CalculatorParser.T__1 || _la === CalculatorParser.T__2)) {
				_localctx._name = this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 6;
		this.enterRecursionRule(_localctx, 6, CalculatorParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 33;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case CalculatorParser.NUMBER:
				{
				_localctx = new NumberContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 23;
				(_localctx as NumberContext)._value = this.match(CalculatorParser.NUMBER);
				}
				break;
			case CalculatorParser.T__1:
			case CalculatorParser.T__2:
				{
				_localctx = new AggregateContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 24;
				(_localctx as AggregateContext)._fn = this.aggregateFn();
				this.state = 25;
				this.match(CalculatorParser.T__3);
				this.state = 26;
				(_localctx as AggregateContext)._values = this.exprList();
				this.state = 27;
				this.match(CalculatorParser.T__4);
				}
				break;
			case CalculatorParser.T__3:
				{
				_localctx = new ParenthesesContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 29;
				this.match(CalculatorParser.T__3);
				this.state = 30;
				(_localctx as ParenthesesContext)._inner = this.expression(0);
				this.state = 31;
				this.match(CalculatorParser.T__4);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 40;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new AdditionOrSubtractionContext(new ExpressionContext(_parentctx, _parentState));
					(_localctx as AdditionOrSubtractionContext)._left = _prevctx;
					this.pushNewRecursionContext(_localctx, _startState, CalculatorParser.RULE_expression);
					this.state = 35;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 36;
					(_localctx as AdditionOrSubtractionContext)._operator = this._input.LT(1);
					_la = this._input.LA(1);
					if (!(_la === CalculatorParser.ADD || _la === CalculatorParser.SUB)) {
						(_localctx as AdditionOrSubtractionContext)._operator = this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 37;
					(_localctx as AdditionOrSubtractionContext)._right = this.expression(2);
					}
					}
				}
				this.state = 42;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 3:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\v.\x04\x02\t" +
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03\x03" +
		"\x05\x03\x0E\n\x03\x03\x03\x03\x03\x07\x03\x12\n\x03\f\x03\x0E\x03\x15" +
		"\v\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05$\n\x05\x03\x05\x03\x05" +
		"\x03\x05\x07\x05)\n\x05\f\x05\x0E\x05,\v\x05\x03\x05\x02\x02\x03\b\x06" +
		"\x02\x02\x04\x02\x06\x02\b\x02\x02\x04\x03\x02\x04\x05\x03\x02\b\t\x02" +
		".\x02\n\x03\x02\x02\x02\x04\r\x03\x02\x02\x02\x06\x16\x03\x02\x02\x02" +
		"\b#\x03\x02\x02\x02\n\v\x05\b\x05\x02\v\x03\x03\x02\x02\x02\f\x0E\x05" +
		"\b\x05\x02\r\f\x03\x02\x02\x02\r\x0E\x03\x02\x02\x02\x0E\x13\x03\x02\x02" +
		"\x02\x0F\x10\x07\x03\x02\x02\x10\x12\x05\b\x05\x02\x11\x0F\x03\x02\x02" +
		"\x02\x12\x15\x03\x02\x02\x02\x13\x11\x03\x02\x02\x02\x13\x14\x03\x02\x02" +
		"\x02\x14\x05\x03\x02\x02\x02\x15\x13\x03\x02\x02\x02\x16\x17\t\x02\x02" +
		"\x02\x17\x07\x03\x02\x02\x02\x18\x19\b\x05\x01\x02\x19$\x07\n\x02\x02" +
		"\x1A\x1B\x05\x06\x04\x02\x1B\x1C\x07\x06\x02\x02\x1C\x1D\x05\x04\x03\x02" +
		"\x1D\x1E\x07\x07\x02\x02\x1E$\x03\x02\x02\x02\x1F \x07\x06\x02\x02 !\x05" +
		"\b\x05\x02!\"\x07\x07\x02\x02\"$\x03\x02\x02\x02#\x18\x03\x02\x02\x02" +
		"#\x1A\x03\x02\x02\x02#\x1F\x03\x02\x02\x02$*\x03\x02\x02\x02%&\f\x03\x02" +
		"\x02&\'\t\x03\x02\x02\')\x05\b\x05\x04(%\x03\x02\x02\x02),\x03\x02\x02" +
		"\x02*(\x03\x02\x02\x02*+\x03\x02\x02\x02+\t\x03\x02\x02\x02,*\x03\x02" +
		"\x02\x02\x06\r\x13#*";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CalculatorParser.__ATN) {
			CalculatorParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CalculatorParser._serializedATN));
		}

		return CalculatorParser.__ATN;
	}

}

export class StartContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalculatorParser.RULE_start; }
	// @Override
	public enterRule(listener: CalculatorListener): void {
		if (listener.enterStart) {
			listener.enterStart(this);
		}
	}
	// @Override
	public exitRule(listener: CalculatorListener): void {
		if (listener.exitStart) {
			listener.exitStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalculatorVisitor<Result>): Result {
		if (visitor.visitStart) {
			return visitor.visitStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprListContext extends ParserRuleContext {
	public _expression!: ExpressionContext;
	public _head: ExpressionContext[] = [];
	public _tail: ExpressionContext[] = [];
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalculatorParser.RULE_exprList; }
	// @Override
	public enterRule(listener: CalculatorListener): void {
		if (listener.enterExprList) {
			listener.enterExprList(this);
		}
	}
	// @Override
	public exitRule(listener: CalculatorListener): void {
		if (listener.exitExprList) {
			listener.exitExprList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalculatorVisitor<Result>): Result {
		if (visitor.visitExprList) {
			return visitor.visitExprList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggregateFnContext extends ParserRuleContext {
	public _name!: Token;
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalculatorParser.RULE_aggregateFn; }
	// @Override
	public enterRule(listener: CalculatorListener): void {
		if (listener.enterAggregateFn) {
			listener.enterAggregateFn(this);
		}
	}
	// @Override
	public exitRule(listener: CalculatorListener): void {
		if (listener.exitAggregateFn) {
			listener.exitAggregateFn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalculatorVisitor<Result>): Result {
		if (visitor.visitAggregateFn) {
			return visitor.visitAggregateFn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalculatorParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class NumberContext extends ExpressionContext {
	public _value!: Token;
	public NUMBER(): TerminalNode { return this.getToken(CalculatorParser.NUMBER, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalculatorListener): void {
		if (listener.enterNumber) {
			listener.enterNumber(this);
		}
	}
	// @Override
	public exitRule(listener: CalculatorListener): void {
		if (listener.exitNumber) {
			listener.exitNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalculatorVisitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AggregateContext extends ExpressionContext {
	public _fn!: AggregateFnContext;
	public _values!: ExprListContext;
	public aggregateFn(): AggregateFnContext {
		return this.getRuleContext(0, AggregateFnContext);
	}
	public exprList(): ExprListContext {
		return this.getRuleContext(0, ExprListContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalculatorListener): void {
		if (listener.enterAggregate) {
			listener.enterAggregate(this);
		}
	}
	// @Override
	public exitRule(listener: CalculatorListener): void {
		if (listener.exitAggregate) {
			listener.exitAggregate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalculatorVisitor<Result>): Result {
		if (visitor.visitAggregate) {
			return visitor.visitAggregate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesesContext extends ExpressionContext {
	public _inner!: ExpressionContext;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalculatorListener): void {
		if (listener.enterParentheses) {
			listener.enterParentheses(this);
		}
	}
	// @Override
	public exitRule(listener: CalculatorListener): void {
		if (listener.exitParentheses) {
			listener.exitParentheses(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalculatorVisitor<Result>): Result {
		if (visitor.visitParentheses) {
			return visitor.visitParentheses(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditionOrSubtractionContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _operator!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public ADD(): TerminalNode | undefined { return this.tryGetToken(CalculatorParser.ADD, 0); }
	public SUB(): TerminalNode | undefined { return this.tryGetToken(CalculatorParser.SUB, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalculatorListener): void {
		if (listener.enterAdditionOrSubtraction) {
			listener.enterAdditionOrSubtraction(this);
		}
	}
	// @Override
	public exitRule(listener: CalculatorListener): void {
		if (listener.exitAdditionOrSubtraction) {
			listener.exitAdditionOrSubtraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalculatorVisitor<Result>): Result {
		if (visitor.visitAdditionOrSubtraction) {
			return visitor.visitAdditionOrSubtraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


