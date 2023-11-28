
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

const showLoadingSpinner = () => {
	const loadingSpinner = document.getElementById("loadingSpinnerContainer");
	loadingSpinner.style.display = "flex";
}

const hideLoadingSpinner = () => {
	const loadingSpinner = document.getElementById("loadingSpinnerContainer");
	loadingSpinner.style.display = "none";
}

const submitLogin = async event => {
    event.preventDefault();
    const url = event.target.action;
    const formData = new FormData(event.target);
    const errorMessageParagraph = document.getElementById("loginErrorMessage");
	errorMessageParagraph.style.display = "none";
	showLoadingSpinner();

	const username = formData.get('username');
	const password = formData.get("password");
	const data = { username, password }

	const result = await postRequest(url, data)
	const success = result.success === "true";
	if (success === false) {
		errorMessageParagraph.innerHTML = result.message;
		errorMessageParagraph.style.display = "block";
	} else {
		navigateTo("/dashboard");
	}
	hideLoadingSpinner();
}


const navigateTo = (url) => {
	history.pushState(null, null, url);
	window.handleLocation();
}

// Registration!!!

const handleError = (element, error) => {
	if (error) {
		element.innerHTML = error;
		element.style.display = "block";
	} else {
		element.value = "";
		element.style.display = "none"
	}
}

const handleErrors = (errors) => {
	const username = document.getElementById("signupUsernameError");
	const email = document.getElementById("signupEmailError");
	const password1 = document.getElementById("signupPassword1Error");
	const password2 = document.getElementById("signupPassword2Error");

	handleError(username, errors["username"]);
	handleError(email, errors["email"]);
	handleError(password1, errors["password1"]);
	handleError(password2, errors["password2"]);
}

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
	showLoadingSpinner();

	const result = await postRequest(url, data);
	const success = result.success === "true";
	if (success) {
		console.log("User created successfully");
		//Handle user navigation after registration complete!!!!
	}
	else {
		console.log("Failed to create user");
		if (result.errors)
			handleErrors(result.errors);
	}
	hideLoadingSpinner();
}

const logoutUser = async() => {
	try {
		const response = await fetch("/logout");
		if (response.ok) {
			console.log("Logout succeeded");
			navigateTo("/");
		} else {
			console.log("Failed to logout")
		}
	} catch (error) {
		console.log(error);
	}
}

//Menu Logic
let isExpanded = false;
const expandSideMenu = () => {
	console.log("Expand menu function called");
	const sideMenu = document.getElementById("sideMenuContainer");
	if (sideMenu.classList.contains("sideMenuNotExpanded"))
		sideMenu.classList.remove("sideMenuExpanded");
	sideMenu.classList.add("sideMenuExpanded");
}

