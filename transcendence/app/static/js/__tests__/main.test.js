const pathToRegex = require("../app");

test("regex test", () => {
    const url = "http://localhost:3000/3";
    const expected = 3;
    expect(pathToRegex(url)).toBe(expected);
})

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});