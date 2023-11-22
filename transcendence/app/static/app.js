async function testAPI() {
    const res = await fetch("/api/hello");
    const res_json = await res.json();
    console.log(res_json);
}

const submitLogin = e => {
    e.preventDefault();
    console.log("Submiting login");
}

//console.log("We be java scripting");
//testAPI();
