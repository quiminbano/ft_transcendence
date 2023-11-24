
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

const postRequest = async (url, data) => {
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
	const loadingSpinner = document.getElementById("loadingSpinnerContainer");
	loadingSpinner.style.display = "flex";

	const username = formData.get('username');
	const password = formData.get("password");
	const data = { username, password }

	const result = await postRequest(url, data)
	console.log(result)
	const success = result.success === "true";
	console.log(success);
	if (success === false) {
		errorMessageParagraph.innerHTML = result.message;
		errorMessageParagraph.style.display = "block";
	} else {
		console.log("Login success")
		history.pushState(null, null, "/");
		window.handleLocation();
	}
	loadingSpinner.style.display = "none";
}


const navigateTo = (url) => {
	history.back();
	window.handleLocation();
}

// Registration!!!

const submitSignup = async event => {
	event.preventDefault();
	const url = event.target.action;
	const formData = new FormData(event.target);

	const username = formData.get('username');
	const email = formData.get("email");
	const password = formData.get("password1");
	const confirmPassword = formData.get("password2");

	data = {
		username,
		email,
		password1: password,
		password2: confirmPassword
	}
	console.log(data);

	console.log("New user should be created here");
	const result = await postRequest(url, data);
	console.log(result);

}
