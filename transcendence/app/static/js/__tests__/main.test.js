

test("regex test", () => {
	const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    const url = "http://localhost:8000/3";
    const expected = 3;
    expect(pathToRegex(url)).toBe(expected);
})

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});
