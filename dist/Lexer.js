"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token = [
    { "type": "SKIP", "rule": /^\s+/ },
    { "type": "Float", "rule": /^\d{1,}\.\d{1,}/ },
    { "type": "Integer", "rule": /^\d{1,}/ },
    { "type": "Higher_Operator", "rule": /^[*/]/ },
    { "type": "Lower_Operator", "rule": /^[+-]/ },
];
class Lexer {
    constructor(str) {
        this.cursor = 0;
        this.expr = str;
    }
    tokenize() {
        let match = null;
        for (let token of Token) {
            match = token.rule.exec(this.expr.slice(this.cursor));
            if (match) {
                this.cursor += match[0].length;
                if (token.type !== "SKIP") {
                    return {
                        "type": token.type,
                        "value": match[0]
                    };
                }
            }
        }
        if (!match)
            throw new SyntaxError(`Unexpected token [${this.expr}]`);
    }
    peek() {
        let prevCursor = this.cursor;
        let match;
        for (let token of Token) {
            match = token.rule.exec(this.expr.slice(prevCursor));
            if (match) {
                if (token.type === "SKIP") {
                    prevCursor += match[0].length;
                    continue;
                }
                return {
                    "type": token.type,
                    "value": match[0]
                };
            }
        }
        return null;
    }
    /**
     *
     * @returns
     */
    next() {
        return this.tokenize();
    }
}
exports.default = Lexer;
