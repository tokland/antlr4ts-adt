import { ArrayType, BasicType, FieldModel, Module, parseStruct, TypeKind } from "ts-file-parser"; // TODO: Use released version
import _ from "lodash";
import fs from "fs";
import path from "path";
import prettier from "prettier";

type Contexts = Context[];

type ContextName = string;

type Field = TokenField | RuleField;

interface TokenField {
    type: "token";
    prop: string;
}

interface RuleField {
    type: "rule";
    prop: string;
    ruleName: string;
    isArray: boolean;
}

interface Context {
    name: ContextName;
    parent: ContextName;
    fields: Field[];
}

function uncapitalize(s: string) {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

function getName(contextName: string): string {
    return contextName.replace(/Context$/, "");
}

function getTypeName(contextName: string): string {
    return uncapitalize(getName(contextName));
}

function getFieldName(field: Field): string {
    return field.type === "rule"
        ? field.ruleName.replace(/Context$/, "") + (field.isArray ? "[]" : "")
        : "Token";
}

function getPropFromString(s: string): string {
    return s.replace(/^_/, "");
}

function getTsDeclarations(parentContextName: string, childrenContexts: Context[]): string {
    return [
        parentContextName !== "ParserRuleContext"
            ? `export type ${getName(parentContextName)} = ${childrenContexts
                  .map(c => getName(c.name))
                  .join(" | ")}`
            : "",
        ...childrenContexts.map(
            ctx => `
                export interface ${getName(ctx.name)} {
                    type: "${getTypeName(ctx.name)}";
                    ${ctx.fields.map(field => `${field.prop}: ${getFieldName(field)};`).join("\n")}
                }
            `
        ),
    ].join("\n");
}

function getContexts(json: Module): Contexts {
    return _.compact(
        json.classes.map((class_): Context | null => {
            const name = class_.name;
            const parentContextName = _(class_.extends)
                .map(e => (e.typeKind === TypeKind.BASIC ? (e as BasicType).typeName : null))
                .first();

            if (!parentContextName || !parentContextName.endsWith("Context")) return null;

            const fields = _.compact(class_.fields.map(fieldModel => getField(fieldModel)));
            return { name, parent: parentContextName, fields };
        })
    );
}

function getField(fieldModel: FieldModel): Field | null {
    const prop = getPropFromString(fieldModel.name);

    if (!fieldModel.type) {
        return null;
    } else if (fieldModel.type.typeKind === TypeKind.ARRAY) {
        const innerType = (fieldModel.type as ArrayType).base;
        if (innerType.typeKind !== TypeKind.BASIC) {
            return null;
        } else if ((innerType as BasicType).typeName.endsWith("Context")) {
            return { type: "rule", prop, ruleName: (innerType as BasicType).typeName, isArray: true };
        } else {
            return null;
        }
    } else if (fieldModel.type.typeKind !== TypeKind.BASIC) {
        return null;
    } else if ((fieldModel.type as BasicType).typeName === "Token") {
        return { type: "token", prop };
    } else if ((fieldModel.type as BasicType).typeName.endsWith("Context")) {
        return { type: "rule", prop, ruleName: (fieldModel.type as BasicType).typeName, isArray: false };
    } else {
        return null;
    }
}

function main(args: string[]): void {
    const [parserPath] = args;
    const contents = fs.readFileSync(parserPath).toString();
    const tsModule = parseStruct(contents, {}, parserPath);
    const contexts = getContexts(tsModule);
    const parserName = tsModule.classes[0]?.name;
    if (!parserName) throw new Error("No parser name");

    const lexerName = parserName.replace(/Parser$/, "Lexer");
    const baseName = parserName.replace(/Parser$/, "");

    const topCode = `
        import { Token, getAdtFromLexerParser } from "../../antlr4ts-adt"; // TODO
        import { ${lexerName} } from "./${lexerName}";
        import { ${parserName} } from "./${parserName}";
        export { Token };
    `;

    const bottomCode = `
        export function getAst<Rule extends keyof Mapping>(startRule: Rule, input: string): Mapping[Rule] {
            return getAdtFromLexerParser<CalculatorParser, Mapping[Rule]>(
                input,
                ${lexerName},
                ${parserName},
                parser => parser[startRule]
            );
        }
    `;

    const parentContextNames = new Set(contexts.map(ctx => ctx.parent));

    const rootContexts = contexts.filter(ctx => ctx.parent === "ParserRuleContext");

    const mapping = `
        interface Mapping {
            ${rootContexts.map(ctx => `${getTypeName(ctx.name)}: ${getName(ctx.name)}`)}
        };
    `;

    const tsOutput = _(contexts)
        .groupBy(context => context.parent)
        .toPairs()
        .map(([parentContextName, childrenContexts]) => {
            const unionContexts = childrenContexts.filter(ctx => !parentContextNames.has(ctx.name));
            return getTsDeclarations(parentContextName, unionContexts);
        })
        .thru(declarationLines => [topCode, ...declarationLines, mapping, bottomCode])
        .join("\n\n");

    const tsFormatted = prettier.format(tsOutput, { semi: true, parser: "typescript", tabWidth: 4 });
    const adtTypesOutputPath = path.join(path.dirname(parserPath), baseName + "Adt.ts");
    fs.writeFileSync(adtTypesOutputPath, tsFormatted);

    console.error(`Written: ${adtTypesOutputPath}`);
}

main(process.argv.slice(2));
