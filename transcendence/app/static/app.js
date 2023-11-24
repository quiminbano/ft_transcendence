
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const postLogin = async (url, data) => {
	const csrftoken = getCookie('csrftoken');
	const config = {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url, config);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return ({ "success":false, "message": "Something happened. try again", "status":400})
	}
}

const submitLogin = async event => {
    event.preventDefault();
    const url = event.target.action;
    const formData = new FormData(event.target);
    const errorMessageParagraph = document.getElementById("loginErrorMessage");
    errorMessageParagraph.style.display = "none";

	const username = formData.get('username');
	const password = formData.get("password");
	const data = { username, password }

	const result = await postLogin(url, data)
	const success = result.success === "success";
	if (success === false) {
		errorMessageParagraph.innerHTML = result.message;
		errorMessageParagraph.style.display = "block";
	} else {
		console.log("Login success")
	}
}

const submitSignup = e => {
	e.preventDefault();
	console.log("New user should be created here");
}
