import Lexer from "./Lexer.js"
import Parser from "./Parser.js"
// const expr = "90+333-1+292-1+101"
// const expr = "1*2"
const expr = "1.0/3.0+1.0*3.0-9.0+4.0*3.0*45.1-19/2"

// const parser = new Parser(expr)
// const ast = parser.parse()
// console.log(JSON.stringify(ast,null,2));

const lexer = new Lexer(expr)
// console.log(lexer.peek());
// lexer.next()
// console.log(lexer.peek());
// lexer.next()
// console.log(lexer.peek());

const parser = new Parser(expr)
const ast = parser.parse()
console.log(ast.print(),"=",ast.eval());
// console.log(ast, ast.print(), ast.eval())