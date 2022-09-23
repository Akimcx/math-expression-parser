"use strict";
import Lexer from "./Lexer"
import { Node, UnaryExpression, BinaryExpression, Literal } from "./Node";

export default class Parser {

    /**
     * Parser Grammar
     * Expression ::= ["-"] <Term> {"+"|"-" <Term>}
     * Term ::= <Factor> {"*"|"/" <Factor>}
     * Factor ::= <Integer> | <Float> | "("<Expression>")"
     * Float ::= Integer . Integer
     * Integer ::= Digit {Digit}
     * Digit ::= 1|2|3|4|5|6|7|8|9|0
     */

    private lexer: Lexer

    constructor() {
        this.lexer = new Lexer("")
    }
    
    parse(str: string) {
        this.lexer = new Lexer(str)
        const a = this.parseExpression()
        if(this.lexer.peek().type !== "NONE")
            throw new SyntaxError(`Error: Expected end of input but found ${JSON.stringify(this.lexer.peek())}`)
        return a
    }

    /**
     * Expression ::= ["-"] <Term> {"+"|"-" <Term>}
     */
    private parseExpression() {
        let a: Node;
        if(this.lexer.peek().value === "-") {
            this.lexer.next()
            a = new UnaryExpression(this.parseTerm())
        } else {
            a = this.parseTerm()
        }

        while(true) {
            const peekable = this.lexer.peek();
            // We reach the end of our input
            if(peekable.type === "NONE") return a;

            if(peekable.value === "+"){
                this.lexer.next()
                let b = this.parseTerm()
                a = new BinaryExpression(a, b, "+")
            } else if (peekable.value === "-"){
                this.lexer.next()
                let b = this.parseTerm()
                a = new BinaryExpression(a, b, "-")
            } else {
                return a
            }
        }
    }

    /**
     * Term ::= <Factor> {"*"|"/" <Factor>} | {"("<Expression>")"}
     */
    private parseTerm() {
        let a: Node = this.parseFactor()

        while(this.lexer.peek().type !== "NONE") {
            const peekable = this.lexer.peek();
            if(peekable.value === "*" || peekable.value === "("){
                let b: Node
                if(peekable.value === "(") {
                    b = this.parseFactor()
                } else {
                    this.lexer.next()
                    b = this.parseFactor()
                }
                a = new BinaryExpression(a, b,"*")
            } else if (peekable.value === "/"){
                this.lexer.next()
                let b = this.parseFactor()
                a = new BinaryExpression(a, b, "/")
            } else {
                return a
            }
        }
        return a
    }

    /**
     * Factor ::= <Integer> | <Float> | "("<Expression>")"
     */
    private parseFactor() {
        let token = this.lexer.next()
        if(!token) throw new SyntaxError("Token is undefined " + JSON.stringify(token))

        if(token.type === "Integer") {
            return new Literal(parseInt(token.value))
        }
        if(token.type === "Float") {
            return new Literal(parseFloat(token.value))
        }        
        if(token.type === "Open_Paren") {
            const expr = this.parseExpression()
            if(this.lexer.peek().type === "Close_Paren") {
                this.lexer.next()
                return expr
            }
            throw new SyntaxError("Token ')' expected instead got: " + JSON.stringify(token))
        }
        throw new SyntaxError(`Unexpected token: ${JSON.stringify(token)}`)
    }
}