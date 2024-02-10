const set42password = async (e) => {
	e.preventDefault();
	const url = "/api/getRestInfo";

	const form = new FormData(e.target);
	const body = {
		password1: form.get("password1"),
		password2: form.get("password2")
	}
	try {
		const response = await postRequest(url, body);
		if (response.succeded) {
			await navigateTo(response.destination);
		} else {
			throw response;
		}
	} catch(error) {
		const errorMessage42password = document.getElementById("errorMessage42password");
		if (errorMessage42password) {
			errorMessage42password.style.display = "block";
			errorMessage42password.innerText = error.errors['password2'];
		}
	}
}

const cancel42password = async (e) => {
	e.preventDefault();
	const url = "/api/getRestInfo";

	try {
		const response = await deleteRequest(url);
		if (response.succeded) {
			await navigateTo("/")
		} else {
			throw response;
		}
	} catch (error) {
		await navigateTo("/404")
	}
}
