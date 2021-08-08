// Generated from Calculator.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class CalculatorLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly ADD = 3;
	public static readonly SUB = 4;
	public static readonly NUMBER = 5;
	public static readonly WHITESPACE = 6;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "ADD", "SUB", "NUMBER", "WHITESPACE",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'", "'+'", "'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "ADD", "SUB", "NUMBER", "WHITESPACE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CalculatorLexer._LITERAL_NAMES, CalculatorLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CalculatorLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(CalculatorLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Calculator.g4"; }

	// @Override
	public get ruleNames(): string[] { return CalculatorLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return CalculatorLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return CalculatorLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return CalculatorLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\b&\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x03\x06\x05\x06\x19\n\x06\x03\x06\x06\x06\x1C\n\x06\r\x06\x0E\x06" +
		"\x1D\x03\x07\x06\x07!\n\x07\r\x07\x0E\x07\"\x03\x07\x03\x07\x02\x02\x02" +
		"\b\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x03" +
		"\x02\x04\x03\x022;\x05\x02\v\f\x0F\x0F\"\"\x02(\x02\x03\x03\x02\x02\x02" +
		"\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02" +
		"\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x03\x0F\x03\x02\x02\x02\x05" +
		"\x11\x03\x02\x02\x02\x07\x13\x03\x02\x02\x02\t\x15\x03\x02\x02\x02\v\x18" +
		"\x03\x02\x02\x02\r \x03\x02\x02\x02\x0F\x10\x07*\x02\x02\x10\x04\x03\x02" +
		"\x02\x02\x11\x12\x07+\x02\x02\x12\x06\x03\x02\x02\x02\x13\x14\x07-\x02" +
		"\x02\x14\b\x03\x02\x02\x02\x15\x16\x07/\x02\x02\x16\n\x03\x02\x02\x02" +
		"\x17\x19\x07/\x02\x02\x18\x17\x03\x02\x02\x02\x18\x19\x03\x02\x02\x02" +
		"\x19\x1B\x03\x02\x02\x02\x1A\x1C\t\x02\x02\x02\x1B\x1A\x03\x02\x02\x02" +
		"\x1C\x1D\x03\x02\x02\x02\x1D\x1B\x03\x02\x02\x02\x1D\x1E\x03\x02\x02\x02" +
		"\x1E\f\x03\x02\x02\x02\x1F!\t\x03\x02\x02 \x1F\x03\x02\x02\x02!\"\x03" +
		"\x02\x02\x02\" \x03\x02\x02\x02\"#\x03\x02\x02\x02#$\x03\x02\x02\x02$" +
		"%\b\x07\x02\x02%\x0E\x03\x02\x02\x02\x06\x02\x18\x1D\"\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CalculatorLexer.__ATN) {
			CalculatorLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CalculatorLexer._serializedATN));
		}

		return CalculatorLexer.__ATN;
	}

}

