
async function testAPI() {
	const res = await fetch("/api/hello");
	const res_json = await res.json();
	console.log(res_json);
}

function submitLogin() {
	console.log("Submiting login");
	history.pushState(null, null, "/");
	handleLocation();
}

