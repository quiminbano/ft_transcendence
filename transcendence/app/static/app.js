async function testAPI() {
    const res = await fetch("/api/hello");
    const res_json = await res.json();
    console.log(res_json);
}

const button = document.getElementById("button");
console.log(button);
button.addEventListener("click", () => {
	console.log("button clicked")
	location.href = "/scores"
})

console.log("We be java scripting");
testAPI();
