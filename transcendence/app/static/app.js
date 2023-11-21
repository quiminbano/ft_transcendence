async function testAPI() {
    const res = await fetch("/api/hello");
    const res_json = await res.json();
    console.log(res_json);
}

// const button = document.getElementById("normalLoginButton");
// function test() {
// 	console.log("called");
// }
// button.addEventListener("key", test);
function login() {
	console.log("login called. going to change the localtion href");
	window.location.href = "/login";
}

console.log("We be java scripting");
testAPI();
