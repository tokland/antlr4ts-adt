import { FieldModel, Module, parseStruct, TypeKind } from "ts-file-parser"; // TODO: Use released version
import _ from "lodash";
import fs from "fs";
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

function getName(contextName: string): string {
    return contextName.replace(/Context$/, "");
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
                    type: "${getName(ctx.name)}";
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
                .map(e => (e.typeKind === TypeKind.BASIC ? e.typeName : null))
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
        const innerType = fieldModel.type.base;
        if (innerType.typeKind !== TypeKind.BASIC) {
            return null;
        } else if (innerType.typeName.endsWith("Context")) {
            return { type: "rule", prop, ruleName: innerType.typeName, isArray: true };
        } else {
            return null;
        }
    } else if (fieldModel.type.typeKind !== TypeKind.BASIC) {
        return null;
    } else if (fieldModel.type.typeName === "Token") {
        return { type: "token", prop };
    } else if (fieldModel.type.typeName.endsWith("Context")) {
        return { type: "rule", prop, ruleName: fieldModel.type.typeName, isArray: false };
    } else {
        return null;
    }
}

function main(args: string[]): void {
    const [parserPath, _mainContextName, adtTypesOutputPath] = args;
    const contents = fs.readFileSync(parserPath).toString();
    const tsModule = parseStruct(contents, {}, parserPath);
    const contexts = getContexts(tsModule);

    const baseDeclarations = `
        export type Token = { symbol: string; text: string };
    `;

    const parentContextNames = contexts.map(ctx => ctx.parent);

    const tsOutput = _(contexts)
        .groupBy(context => context.parent)
        .toPairs()
        .map(([parentContextName, childrenContexts]) => {
            return getTsDeclarations(
                parentContextName,
                childrenContexts.filter(ctx => !parentContextNames.includes(ctx.name))
            );
        })
        .concat([baseDeclarations])
        .join("\n\n");

    const tsFormatted = prettier.format(tsOutput, { semi: true, parser: "babel", tabWidth: 4 });
    fs.writeFileSync(adtTypesOutputPath, tsFormatted);
}

main(process.argv.slice(2));
