"use strict";
import Lexer from "./Lexer.js"

abstract class Node {
    abstract eval(): number
    abstract print(): string
}

class AddNode extends Node {
    
    private left:Node;
    private right: Node;

     constructor(left: Node, right: Node) {
        super()
        this.left = left,
        this.right = right
    }

    eval(): number {
        return this.left.eval() + this.right.eval()
    }

    print(): string {
        return `(${this.left.print()} + ${this.right.print()})`
    }
}

class SubstractNode extends Node {
    
    private left: Node
    private right: Node

     constructor(left: Node, right: Node) {
        super()
        this.left = left,
        this.right = right
    }

    eval(): number {
        return this.left.eval() - this.right.eval()
    }

    print(): string {
        return `(${this.left.print()} - ${this.right.print()})`
    }
}

class MultiplyNode extends Node {
    
    private left: Node
    private right: Node

    constructor(left: Node, right: Node) {
        super()
        this.left = left,
        this.right = right
    }

    eval(): number {
        return this.left.eval() * this.right.eval()
    }

    print(): string {
        return `(${this.left.print()} * ${this.right.print()})`
    }

}

class DivideNode extends Node {
    
    private left: Node
    private right: Node
     constructor(left: Node, right: Node) {
        super()
        this.left = left,
        this.right = right
    }

    eval(): number {
        return this.left.eval() / this.right.eval()
    }

    print(): string {
        return `(${this.left.print()} / ${this.right.print()})`
    }

}

class IntegerNode extends Node {
        
    private value: number
     constructor(value: number) {
        super()
        this.value = value
    }

    eval(): number {
        return this.value
    }

    print(): string {
        return `${this.eval()}`
    }
}

class FloatNode extends Node {

    private value: number
     constructor(value: number) {
        super()
        this.value = value
    }

    eval(): number {
        return this.value
    }

    print(): string {
        return `${this.eval()}`
    }
}


class NegateNode extends Node {

    private node: Node
    constructor(node:  Node) {
        super()
        this.node = node
    }

    eval(): number {
        return -(this.node.eval())
    }

    print(): string {
        return `(-${this.node.print()})`
    }
}

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

    constructor(str: string) {
        this.lexer = new Lexer(str)
    }

    /**
     * @returns Node
     */
    parse() {
        return this.parseExpression()
    }

    /**
     * Expression ::= ["-"] <Term> {"+"|"-" <Term>}
     */
    parseExpression() {
        let a: Node;
        if(this.lexer.peek()?.value === "-") {
            this.lexer.next()
            a = new NegateNode(this.parseTerm())
        } else {
            a = this.parseTerm()
        }

        while(true) {
            const peekable = this.lexer.peek();
            // We reach the end of our input
            if(!peekable) return a;

            if(peekable.value === "+"){
                this.lexer.next()
                let b = this.parseTerm()
                a = new AddNode(a, b)
            } else if (peekable.value === "-"){
                this.lexer.next()
                let b = this.parseTerm()
                a = new SubstractNode(a, b)
            } else {
                return a
            }
        }
    }

    /**
     * Term ::= <Factor> {"*"|"/" <Factor>}
     */
    parseTerm() {
        let a: Node = this.parseFactor()

        while(true) {
            const peekable = this.lexer.peek();
            // We reach the end of our input
            if(!peekable) return a;

            if(peekable.value === "*"){
                this.lexer.next()
                let b = this.parseFactor()
                a = new MultiplyNode(a, b)
            } else if (peekable.value === "/"){
                this.lexer.next()
                let b = this.parseFactor()
                a = new DivideNode(a, b)
            } else {
                return a
            }
        }
    }

    /**
     * Factor ::= <Integer> | <Float> | "("<Expression>")"
     */
    parseFactor(): IntegerNode | FloatNode {
        const token = this.lexer.next()
        if(!token) throw new SyntaxError("Token is undefined " + token)
        if(token.type === "Integer") {
            return new IntegerNode(parseInt(token.value))
        }

        if(token.type === "Float") {
            return new FloatNode(parseFloat(token.value))
        }

        if(token.type === "Open_Paren") {
            // TODO Handle Parenthesis
        } 
        throw new SyntaxError(`Unexpected token: ${JSON.stringify(token)}`)
    }
}