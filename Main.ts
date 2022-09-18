import Parser from "./Parser.js"
import * as readline from "readline"
import Lexer from "./Lexer.js"
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
})
const parser = new Parser()
rl.prompt()
rl.on("line", expr => {
    const ast = parser.parse(expr)
    console.log(`${ast.print()} = ${ast.eval()}`);
    rl.prompt()
})

// const expr = "8!"
// const lexer = new Lexer(expr)
// while(lexer.peek().type !== "NONE") {
//     console.log(lexer.next());
// }
// const expr = "(1 * (3)) )))) + (-2))"

// const lexer = new Lexer(expr)
// while(lexer.peek().type !== "NONE") {
//     console.log(lexer.next());
// }

// console.log(ast, ast.print(), ast.eval())