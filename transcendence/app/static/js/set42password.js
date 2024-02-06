const set42password = async (e) => {
	e.preventDefault();
	const url = "/api/getRestInfo";

	const form = new FormData(e.target);
	const body = {
		password1: form.get("password1"),
		password2: form.get("password2")
	}
	console.log(body);
	try {
		const response = await postRequest(url, body);
		if (response.succeeded) {
			console.log(response);
		} else {
			throw response;
		}
	} catch(error) {
		console.log(error);
	}
}

const cancel42password = async (e) => {
	e.preventDefault();
	const url = "";

	try {
		const response = await deleteRequest(url);
		if (response.succeeded) {
			console.log(response);
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
	}
}
