import Lexer from "../src/Lexer";

test("peek method should return none", () => {
  const lexer = new Lexer("90");
  lexer.next()
  expect(lexer.peek().type).toBe("NONE")
})
