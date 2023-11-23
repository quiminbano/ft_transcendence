
async function testAPI() {
	const res = await fetch("/api/hello");
	const res_json = await res.json();
	console.log(res_json);
}

function submitLogin(event) {
    event.preventDefault();  // Prevent the form from being submitted normally
    const url = event.target.action;  // Get the form action
    const formData = new FormData(event.target);  // Create a FormData object from the form
    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data here
		console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
