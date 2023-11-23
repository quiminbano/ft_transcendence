
async function testAPI() {
	const res = await fetch("/api/hello");
	const res_json = await res.json();
	console.log(res_json);
}

function submitLogin(event) {
    event.preventDefault();
    const url = event.target.action;
    const formData = new FormData(event.target);
    const errorMessageParagraph = document.getElementById("loginErrorMessage");
    errorMessageParagraph.style.display = "none";
    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const success = data.success === "success";
        if (success === false) {
            errorMessageParagraph.innerHTML = data.message;
            errorMessageParagraph.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
