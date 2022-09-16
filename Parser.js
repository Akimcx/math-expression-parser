"use strict";
import Lexer from "./Lexer.js"

class Node {
    eval(){}
    print(){}
}

class AddNode extends Node {
    
    /**
     * 
     * @param {Node} left 
     * @param {Node} right 
     */
     constructor(left, right) {
        super()
        this.left = left,
        this.right = right
    }

    eval() {
        return this.left.eval() + this.right.eval()
    }

    print() {
        return `(${this.left.print()} + ${this.right.print()})`
    }
}

class SubstractNode extends Node {
    
    /**
     * 
     * @param {Node} left 
     * @param {Node} right 
     */
     constructor(left, right) {
        super()
        this.left = left,
        this.right = right
    }

    eval() {
        return this.left.eval() - this.right.eval()
    }

    print() {
        return `(${this.left.print()} - ${this.right.print()})`
    }
}

class MultiplyNode extends Node {
    
    /**
     * 
     * @param {Node} left 
     * @param {Node} right 
     */
    constructor(left, right) {
        super()
        this.left = left,
        this.right = right
    }

    eval() {
        return this.left.eval() * this.right.eval()
    }

    print() {
        return `(${this.left.print()} * ${this.right.print()})`
    }

}

class DivideNode extends Node {
    
    /**
     * 
     * @param {IntegerNode | FloatNode} left 
     * @param {IntegerNode | FloatNode} right 
     */
     constructor(left, right) {
        super()
        this.left = left,
        this.right = right
    }

    eval() {
        return this.left.eval() / this.right.eval()
    }

    print() {
        return `(${this.left.print()} / ${this.right.print()})`
    }

}

class IntegerNode extends Node {
        
    /**
     * 
     * @param {Number} value 
     */
     constructor(value) {
        super()
        this.value = value
    }

    eval() {
        return this.value
    }

    print() {
        return `${this.eval()}`
    }
}

class FloatNode extends Node {
        
    /**
     * 
     * @param {Number} value 
     */
     constructor(value) {
        super()
        this.value = value
    }

    eval() {
        return this.value
    }

    print() {
        return `${this.eval()}`
    }
}


class NegateNode extends Node {

    /**
     * 
     * @param {Node} node 
     */
    constructor(node) {
        super()
        this.node = node
    }

    eval() {
        return -(this.node.eval())
    }

    print() {
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


    /**
     * @param {String} str 
     */
    constructor(str) {
        this.lexer = new Lexer(str)
        this.expr = str
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
        let a = this.parseTerm()

        while(true) {
            // We reach the end of our input
            if(!this.lexer.peek()) return a;

            if(this.lexer.peek().value === "+"){
                this.lexer.next()
                let b = this.parseTerm()
                a = new AddNode(a, b)
            } else if (this.lexer.peek().value === "-"){
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
        let a = this.parseFactor()

        while(true) {
            // We reach the end of our input
            if(!this.lexer.peek()) return a;

            if(this.lexer.peek().value === "*"){
                this.lexer.next()
                let b = this.parseFactor()
                a = new MultiplyNode(a, b)
            } else if (this.lexer.peek().value === "/"){
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
    parseFactor() {
        const token = this.lexer.next()
        if(token.type === "Integer") {
            return new IntegerNode(parseInt(token.value))
        }

        if(token.type === "Float") {
            return new FloatNode(parseFloat(token.value))
        }

        if(token.type === "Open_Paren") {
            // TODO Handle Parenthesis
        } 
        throw new SyntaxError(`Unexpected token: ${JSON.stringify(this.token)}`)
    }
}