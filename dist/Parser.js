"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lexer_js_1 = __importDefault(require("./Lexer.js"));
class Node {
}
class AddNode extends Node {
    constructor(left, right) {
        super();
        this.left = left,
            this.right = right;
    }
    eval() {
        return this.left.eval() + this.right.eval();
    }
    print() {
        return `(${this.left.print()} + ${this.right.print()})`;
    }
}
class SubstractNode extends Node {
    constructor(left, right) {
        super();
        this.left = left,
            this.right = right;
    }
    eval() {
        return this.left.eval() - this.right.eval();
    }
    print() {
        return `(${this.left.print()} - ${this.right.print()})`;
    }
}
class MultiplyNode extends Node {
    constructor(left, right) {
        super();
        this.left = left,
            this.right = right;
    }
    eval() {
        return this.left.eval() * this.right.eval();
    }
    print() {
        return `(${this.left.print()} * ${this.right.print()})`;
    }
}
class DivideNode extends Node {
    constructor(left, right) {
        super();
        this.left = left,
            this.right = right;
    }
    eval() {
        return this.left.eval() / this.right.eval();
    }
    print() {
        return `(${this.left.print()} / ${this.right.print()})`;
    }
}
class IntegerNode extends Node {
    constructor(value) {
        super();
        this.value = value;
    }
    eval() {
        return this.value;
    }
    print() {
        return `${this.eval()}`;
    }
}
class FloatNode extends Node {
    constructor(value) {
        super();
        this.value = value;
    }
    eval() {
        return this.value;
    }
    print() {
        return `${this.eval()}`;
    }
}
class NegateNode extends Node {
    constructor(node) {
        super();
        this.node = node;
    }
    eval() {
        return -(this.node.eval());
    }
    print() {
        return `(-${this.node.print()})`;
    }
}
class Parser {
    constructor(str) {
        this.lexer = new Lexer_js_1.default(str);
    }
    /**
     * @returns Node
     */
    parse() {
        return this.parseExpression();
    }
    /**
     * Expression ::= ["-"] <Term> {"+"|"-" <Term>}
     */
    parseExpression() {
        var _a;
        let a;
        if (((_a = this.lexer.peek()) === null || _a === void 0 ? void 0 : _a.value) === "-") {
            this.lexer.next();
            a = new NegateNode(this.parseTerm());
        }
        else {
            a = this.parseTerm();
        }
        while (true) {
            const peekable = this.lexer.peek();
            // We reach the end of our input
            if (!peekable)
                return a;
            if (peekable.value === "+") {
                this.lexer.next();
                let b = this.parseTerm();
                a = new AddNode(a, b);
            }
            else if (peekable.value === "-") {
                this.lexer.next();
                let b = this.parseTerm();
                a = new SubstractNode(a, b);
            }
            else {
                return a;
            }
        }
    }
    /**
     * Term ::= <Factor> {"*"|"/" <Factor>}
     */
    parseTerm() {
        let a = this.parseFactor();
        while (true) {
            const peekable = this.lexer.peek();
            // We reach the end of our input
            if (!peekable)
                return a;
            if (peekable.value === "*") {
                this.lexer.next();
                let b = this.parseFactor();
                a = new MultiplyNode(a, b);
            }
            else if (peekable.value === "/") {
                this.lexer.next();
                let b = this.parseFactor();
                a = new DivideNode(a, b);
            }
            else {
                return a;
            }
        }
    }
    /**
     * Factor ::= <Integer> | <Float> | "("<Expression>")"
     */
    parseFactor() {
        const token = this.lexer.next();
        if (!token)
            throw new SyntaxError("Token is undefined " + token);
        if (token.type === "Integer") {
            return new IntegerNode(parseInt(token.value));
        }
        if (token.type === "Float") {
            return new FloatNode(parseFloat(token.value));
        }
        if (token.type === "Open_Paren") {
            // TODO Handle Parenthesis
        }
        throw new SyntaxError(`Unexpected token: ${JSON.stringify(token)}`);
    }
}
exports.default = Parser;
