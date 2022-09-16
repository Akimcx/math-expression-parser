"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_js_1 = __importDefault(require("./Parser.js"));
// const expr = "90+333-1+292-1+101"
// const expr = "1*2"
const expr = "1.0/3.0+1.0*3.0-9.0+4.0*3.0*45.1-19/2";
const parser = new Parser_js_1.default(expr);
const ast = parser.parse();
console.log(ast.print(), "=", ast.eval());
// console.log(ast, ast.print(), ast.eval())
