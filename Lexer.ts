const Token = [
  {"type": "SKIP", "rule": /^\s+/},
  {"type": "Float", "rule": /^\d{1,}\.\d{1,}/},
  {"type":"Integer", "rule": /^\d{1,}/},
  {"type":"Higher_Operator", "rule": /^[*/]/},
  {"type":"Lower_Operator", "rule": /^[+-]/},
  {"type":"Open_Paren", "rule": /^\(/},
  {"type":"Close_Paren", "rule": /^\)/},
  {"type":"Unknown_Token", "rule": /^./},
]

export default class Lexer {

  private expr: string
  private cursor: number

  constructor(str: string) {
    this.cursor = 0;
    this.expr = str;
  }

  private tokenize() {
    let match = null
      for(let token of Token) {
        match = token.rule.exec(this.expr.slice(this.cursor))
        if(match) {
          this.cursor += match[0].length
          if(token.type !== "SKIP") {
            return {
                "type": token.type,
                "value": match[0]
            }
          }
        }
    }
    if(!match) throw new SyntaxError(`Unexpected character [${this.expr.slice(this.cursor)}]`)
  }

  peek() {
    let prevCursor = this.cursor
    let match
    for(let token of Token) {
        match = token.rule.exec(this.expr.slice(prevCursor))
        if(match) {
          if(token.type === "SKIP")  {
            prevCursor += match[0].length
            continue
          }
            return {
                "type": token.type,
                "value": match[0]
            }
        }
    }
    return {"type": "NONE", "value": ""}
  }

  /**
   *
   * @returns
   */
  next() {
    return this.tokenize();
  }
}
