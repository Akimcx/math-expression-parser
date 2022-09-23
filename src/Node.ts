"use strict";
export abstract class Node {
    abstract eval(): number;
    abstract print(): string;
}

export class BinaryExpression extends Node {

    private left: Node;
    private right: Node;
    private operator: string

    constructor(left: Node, right: Node, operator: string) {
        super();
        this.left = left
        this.right = right
        this.operator = operator
    }

    eval(): number {
        switch (this.operator) {
            case "+":
                return this.left.eval() + this.right.eval()
            case "-":
                return this.left.eval() - this.right.eval()
            case "*":
                return this.left.eval() * this.right.eval()
            case "/":
                return this.left.eval() / this.right.eval();
            default: return 0;
        }
    }

    print(): string {
        return `(${this.left.print()} ${this.operator} ${this.right.print()})`;
    }
}

export class Literal extends Node {

    private value: number;
    constructor(value: number) {
        super()
        this.value = value
    }

    eval(): number {
        return this.value;
    }

    print(): string {
        return `${this.eval()}`;
    }
}

export class UnaryExpression extends Node {

    private node: Node;
    constructor(node: Node) {
        super();
        this.node = node;
    }

    eval(): number {
        return -(this.node.eval());
    }

    print(): string {
        return `(-${this.node.print()})`;
    }
}
