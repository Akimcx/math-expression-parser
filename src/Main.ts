import * as readline from "readline"
import Parser from "./Parser"
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
})
const parser = new Parser()
rl.prompt()
rl.on("line", expr => {
    if(expr === "q") {
        rl.close()
        return;
    }
    const ast = parser.parse(expr)    
    console.log(`${ast.print()} = ${ast.eval()}`);
    rl.prompt()
})

const t:number = 90.8