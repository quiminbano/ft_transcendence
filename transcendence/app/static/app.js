async function testAPI() {
    const res = await fetch("/api/hello");
    const res_json = await res.json();
    console.log(res_json);
}

console.log("We be java scripting");
testAPI();
