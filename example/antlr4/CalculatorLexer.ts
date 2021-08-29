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
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly ADD = 6;
	public static readonly SUB = 7;
	public static readonly NUMBER = 8;
	public static readonly WHITESPACE = 9;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "ADD", "SUB", "NUMBER", "WHITESPACE",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "','", "'sum'", "'product'", "'('", "')'", "'+'", "'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, "ADD", 
		"SUB", "NUMBER", "WHITESPACE",
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\v:\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x03\x02\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03" +
		"\t\x05\t-\n\t\x03\t\x06\t0\n\t\r\t\x0E\t1\x03\n\x06\n5\n\n\r\n\x0E\n6" +
		"\x03\n\x03\n\x02\x02\x02\v\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06" +
		"\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x03\x02\x04\x03\x022" +
		";\x05\x02\v\f\x0F\x0F\"\"\x02<\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02" +
		"\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02" +
		"\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02" +
		"\x02\x02\x13\x03\x02\x02\x02\x03\x15\x03\x02\x02\x02\x05\x17\x03\x02\x02" +
		"\x02\x07\x1B\x03\x02\x02\x02\t#\x03\x02\x02\x02\v%\x03\x02\x02\x02\r\'" +
		"\x03\x02\x02\x02\x0F)\x03\x02\x02\x02\x11,\x03\x02\x02\x02\x134\x03\x02" +
		"\x02\x02\x15\x16\x07.\x02\x02\x16\x04\x03\x02\x02\x02\x17\x18\x07u\x02" +
		"\x02\x18\x19\x07w\x02\x02\x19\x1A\x07o\x02\x02\x1A\x06\x03\x02\x02\x02" +
		"\x1B\x1C\x07r\x02\x02\x1C\x1D\x07t\x02\x02\x1D\x1E\x07q\x02\x02\x1E\x1F" +
		"\x07f\x02\x02\x1F \x07w\x02\x02 !\x07e\x02\x02!\"\x07v\x02\x02\"\b\x03" +
		"\x02\x02\x02#$\x07*\x02\x02$\n\x03\x02\x02\x02%&\x07+\x02\x02&\f\x03\x02" +
		"\x02\x02\'(\x07-\x02\x02(\x0E\x03\x02\x02\x02)*\x07/\x02\x02*\x10\x03" +
		"\x02\x02\x02+-\x07/\x02\x02,+\x03\x02\x02\x02,-\x03\x02\x02\x02-/\x03" +
		"\x02\x02\x02.0\t\x02\x02\x02/.\x03\x02\x02\x0201\x03\x02\x02\x021/\x03" +
		"\x02\x02\x0212\x03\x02\x02\x022\x12\x03\x02\x02\x0235\t\x03\x02\x0243" +
		"\x03\x02\x02\x0256\x03\x02\x02\x0264\x03\x02\x02\x0267\x03\x02\x02\x02" +
		"78\x03\x02\x02\x0289\b\n\x02\x029\x14\x03\x02\x02\x02\x06\x02,16\x03\b" +
		"\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CalculatorLexer.__ATN) {
			CalculatorLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CalculatorLexer._serializedATN));
		}

		return CalculatorLexer.__ATN;
	}

}

