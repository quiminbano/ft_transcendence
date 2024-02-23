let settingsModal;
const loadSignup = () => {
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
		errorMessageParagraph.innerText = result.message;
		errorMessageParagraph.style.display = "block";
	} else {
		navigateTo("/");
	}
	hideLoadingSpinner();
}

// Signup!!!

const handleError = (element, error) => {
	if (error) {
		element.innerText = error;
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
			navigateTo("/");
		}
	} catch (error) {
		// console.log(error);
	}
}

const handleChangeProfile = async (event) => {
	event.preventDefault();
	const url = event.target.action;
	const formData = new FormData(event.target);

	const username = formData.get('username');
	const firstname = formData.get('firstName');
	const lastname = formData.get('lastName');
	const password = formData.get("password1");
	const confirmPassword = formData.get("password2");
	const email = formData.get("email");
	const language = formData.get("language");
	const password3 = formData.get("password3");

	data = {
		username,
		firstName: firstname,
		lastName: lastname,
		password1: password,
		password2: confirmPassword,
		language,
		password3,
		email
	}
	showLoadingSpinner();
	const response = await putRequest(url, data);
	if (response.succeded)
		navigateTo("/");
	else {
		handleUpdateErrors(response.errors);
	}
	hideLoadingSpinner();
}

const handleUpdateErrors = (errors) => {
	if (!errors) return;
	const errorPassword3Field = document.getElementById("invalidPassword3");
	if (errors["password2"])
		handleError(errorPassword3Field, errors["password2"]);
	else if (errors["password3"])
		handleError(errorPassword3Field, errors["password3"]);
	else if (errors["validation"])
		handleError(errorPassword3Field, errors["validation"]);
}

const openSettingsModal = () => {
	const usernameField = document.getElementById("id_username");

	try {
		isUsernameValid(usernameField.value);
		const password3 = document.getElementById("id_password3");
		const errorFields = document.querySelectorAll(".signupErrorMessage");
		errorFields.forEach(field => field.style.display = "none");
		settingsModal.open();
		password3.focus();
		password3.value = "";

	} catch (error) {
		const usernameErrorField = document.getElementById("invalidUpdateUsername");
		handleError(usernameErrorField, error.message);
		return;
	}
}
const isUsernameValid = (username) => {
	if (username.length <= 0) {
		throw new Error("Username field is required");
	}
	const MIN_USERNAME_LENGTH = 5;
	if (username.length < MIN_USERNAME_LENGTH)
		throw new Error("Username must be at least 5 characters");
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

const loginWith42 = async () => {
	const url = "/api/login42";
	try {
		const response = await getRequest(url);
		if (response.succeded) {
			console.log("Successfully logged with 42")
		} else {
			throw response;
		}
	} catch (error) {
		// console.log(error);
	}
}
