import Parser from "../src/Parser";

test("parse should return a node with the value 90", () => {
  const parser = new Parser();
  const node = parser.parse("90")
  expect(node.print()).toBe("90")
})

test("parse should return a multiplication", () => {
  const parser = new Parser();
  const node = parser.parse("(9(0))")
  expect(node.print()).toBe("(9 * 0)")
})

test("parse should return a -8", () => {
  const parser = new Parser();
  const node = parser.parse("-8")
  expect(node.eval()).toBe(-8)
})
