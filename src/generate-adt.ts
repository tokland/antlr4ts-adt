import { parseStruct, TypeKind } from "ts-file-parser";
import prettier from "prettier";
import _ from "lodash";
import fs from "fs";

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
    return field.type === "rule" ? field.ruleName.replace(/Context$/, "") + (field.isArray ? "[]" : "") : "Token";
}

function getPropFromString(s: string): string {
    return s.replace(/^_/, "");
}

function getTsDeclarations(contextParentName: string, childrenContexts: Context[]): string {
    return [
        contextParentName !== "ParserRuleContext"
            ? `export type ${getName(contextParentName)} = ${childrenContexts.map(c => getName(c.name)).join(" | ")}`
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

const baseDeclarations = `
    export type Token = { symbol: string; text: string };
`;

const [parserPath, mainContextName, adtTypesOutputPath] = process.argv.slice(2);
const decls = fs.readFileSync(parserPath).toString();
const json = parseStruct(decls, {}, parserPath);

const contexts: Contexts = _.compact(
    json.classes.map((class_): Context | null => {
        const name = class_.name;
        const parentContextName = _(class_.extends)
            .map(e => (e.typeKind === TypeKind.BASIC ? e.typeName : null))
            .first();

        if (
            !parentContextName ||
            parentContextName === "Parser" ||
            false
            //(parentContextName === "ParserRuleContext" && name !== mainContextName)
        )
            return null;

        const fields = _(class_.fields)
            .map((fieldModel): Field | null => {
                const prop = getPropFromString(fieldModel.name);

                if (!fieldModel.type) {
                    return null;
                } else if (fieldModel.type.typeKind === TypeKind.ARRAY) {
                    const type2 = fieldModel.type.base;
                    if (type2.typeKind !== TypeKind.BASIC) {
                        return null;
                    } else if (type2.typeName.endsWith("Context")) {
                        const ruleName = type2.typeName;
                        return { type: "rule", prop, ruleName, isArray: true };
                    } else {
                        return null;
                    }
                } else if (fieldModel.type.typeKind !== TypeKind.BASIC) {
                    return null;
                } else if (fieldModel.type.typeName === "Token") {
                    return { type: "token", prop };
                } else if (fieldModel.type.typeName.endsWith("Context")) {
                    const ruleName = fieldModel.type.typeName;
                    return { type: "rule", prop, ruleName, isArray: false };
                } else {
                    return null;
                }
            })
            .compact()
            .value();

        return { name, parent: parentContextName, fields };
    })
);

// contexts.forEach(context => console.error(context));

const parents = contexts.map(ctx => ctx.parent);

const tsOutput = _(contexts)
    .groupBy(context => context.parent)
    .toPairs()
    .map(([contextParentName, childrenContexts]) => {
        return getTsDeclarations(
            contextParentName,
            childrenContexts.filter(ctx => !parents.includes(ctx.name))
        );
    })
    .concat([baseDeclarations])
    .join("\n\n");

const tsFormatted = prettier.format(tsOutput, { semi: true, parser: "babel" });
fs.writeFileSync(adtTypesOutputPath, tsFormatted);
