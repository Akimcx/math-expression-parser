const Token = [
    {"type": "Float", "rule": /^\d{1,}\.\d{1,}/},
    {"type":"Integer", "rule": /^\d{1,}/},
    {"type":"Higher_Operator", "rule": /^[*/]/},
    {"type":"Lower_Operator", "rule": /^[+-]/},
]

export default class Lexer {

  private expr: string
  private cursor: number

  constructor(str: string) {
    this.cursor = 0;
    this.expr = str;
  }

  tokenize() {
    let match = null
    while (this.cursor < this.expr.length) {
      for(let token of Token) {
        match = token.rule.exec(this.expr.slice(this.cursor))
        if(match) {
            // console.log(`[${this.expr.slice(this.cursor)}]`, match, token.rule);
            this.cursor += match[0].length
            return {
                "type": token.type,
                "value": match[0]
            }
        }
    }
    if(!match) throw new SyntaxError(`Unexpected token [${this.expr}]`)
    }
  }

  peek() {
    let match
    for(let token of Token) {
        match = token.rule.exec(this.expr.slice(this.cursor))
        if(match) {
            return {
                "type": token.type,
                "value": match[0]
            }
        }
    }
    return null
  }

  /**
   *
   * @returns
   */
  next() {
    return this.tokenize();
  }
}