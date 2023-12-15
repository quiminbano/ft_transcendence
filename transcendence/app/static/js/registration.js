let settingsModal;
const loadSignup = () => {
	console.log("Loading signup");
	populateCoallitionSrc();
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
		navigateTo("/");
	}
	hideLoadingSpinner();
}

// Signup!!!

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
	const coallition = formData.get("coallition");
	const password = formData.get("password1");
	const confirmPassword = formData.get("password2");

	data = {
		username,
		email,
		coallition,
		password1: password,
		password2: confirmPassword
	}
	showLoadingSpinner();

	const result = await postRequest(url, data);
	const success = result.success === "true";
	if (success) {
		console.log("User created successfully");
		navigateTo("login");
	}
	else {
		if (result.errors)
			handleErrors(result.errors);
	}
	hideLoadingSpinner();
}

//Logout Process

const logoutUser = async () => {
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

const handleChangeProfile = async (event) => {
	console.log("Coming here!!")
	event.preventDefault();
	const url = event.target.action;
	const formData = new FormData(event.target);

	const username = formData.get('username');
	const firstname = formData.get('firstName');
	const lastname = formData.get('lastName');
	const password = formData.get("password1");
	const confirmPassword = formData.get("password2");
	const email = formData.get("email");
	const password3 = formData.get("password3");

	data = {
		username,
		firstName: firstname,
		lastName: lastname,
		password1: password,
		password2: confirmPassword,
		password3,
		email
	}
	showLoadingSpinner();
	const response = await putRequest(url, data);
	if (response.succeded)
		navigateTo("/");
	else {
		console.log(response);
		const errorField = document.getElementById("invalidPassword3");
		handleError(errorField, response.errors.password3);
	}
	hideLoadingSpinner();
}

const openSettingsModal = () => {
	settingsModal.open();
}
const closeSettingsModal = () => {
	settingsModal.close();
}

const loadSettings = () => {
	settingsModal = new Modal(document.getElementById("settingsModalContainer"));
}

const populateCoallitionSrc = () => {
	const options = document.querySelectorAll(".coallitionOption");
	options.forEach(option => {
		const image = option.querySelector("img");
		const input = option.querySelector("input");
		image.setAttribute("src", `/static/images/${input.value}Symbol.svg`);
	});
}
