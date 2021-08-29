import { FieldModel, Module, parseStruct, TypeKind, TypeModel } from "@tokland/ts-file-parser";
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

interface ContextMethod {
    name: string;
    typeString: string;
}

interface Context {
    name: ContextName;
    parent: ContextName;
    fields: Field[];
    methods: ContextMethod[];
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
        ...childrenContexts.map(ctx => {
            const fields = ctx.fields.filter(field => !ctx.methods.map(m => m.name).includes(field.prop));
            return `
                export interface ${getName(ctx.name)} {
                    type: "${getTypeName(ctx.name)}";
                    ${fields.map(field => `${field.prop}: ${getFieldName(field)};`).join("\n")}
                    ${ctx.methods.map(method => `${method.name}: ${method.typeString};`).join("\n")}
                }
            `.replace(/^\s*[\r\n]/gm, "");
        }),
    ].join("\n");
}

const ignoredMethods = ["enterRule", "exitRule", "accept"];

function getContexts(json: Module): Contexts {
    return _.compact(
        json.classes.map((class_): Context | null => {
            const name = class_.name;
            const parentContextName = _(class_.extends)
                .map(typeModel => (typeModel.typeKind === TypeKind.BASIC ? typeModel.typeName : null))
                .first();

            if (!parentContextName || !isContext(parentContextName)) return null;

            const fields = _.compact(class_.fields.map(fieldModel => getField(fieldModel)));
            const methods = class_.methods
                .filter(
                    method =>
                        !getTypeAsString(method.returnType).includes("TerminalNode") &&
                        !ignoredMethods.includes(method.name) &&
                        method.arguments.length === 0
                )
                .map(
                    (method): ContextMethod => ({
                        name: method.name,
                        typeString: getTypeAsString(method.returnType),
                    })
                );

            return { name, parent: parentContextName, fields, methods };
        })
    );
}

function getTypeAsString(typeModel: TypeModel): string {
    switch (typeModel.typeKind) {
        case TypeKind.BASIC:
            return getName(typeModel.typeName);
        case TypeKind.ARRAY:
            return `(${getTypeAsString(typeModel.base)})[]`;
        case TypeKind.UNION:
            return typeModel.options.map(option => getTypeAsString(option)).join(" | ");
    }
}

function isContext(name: string): boolean {
    return name.endsWith("Context");
}

function getField(fieldModel: FieldModel): Field | null {
    const prop = getPropFromString(fieldModel.name);

    if (!fieldModel.type) {
        return null;
    } else if (fieldModel.type.typeKind === TypeKind.ARRAY) {
        const innerType = fieldModel.type.base;
        if (innerType.typeKind !== TypeKind.BASIC) {
            return null;
        } else if (isContext(innerType.typeName)) {
            return { type: "rule", prop, ruleName: innerType.typeName, isArray: true };
        } else {
            return null;
        }
    } else if (fieldModel.type.typeKind !== TypeKind.BASIC) {
        return null;
    } else if (fieldModel.type.typeName === "Token") {
        return { type: "token", prop };
    } else if (isContext(fieldModel.type.typeName)) {
        return { type: "rule", prop, ruleName: fieldModel.type.typeName, isArray: false };
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
        import { Token, getAdtFromLexerParser } from "antlr4ts-adt";
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
