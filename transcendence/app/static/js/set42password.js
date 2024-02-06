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
		console.log(response);
		if (response.succeded) {
			await navigateTo("/");
		} else {
			throw response;
		}
	} catch(error) {
		console.log(error);
	}
}

const cancel42password = async (e) => {
	e.preventDefault();
	const url = "/api/getRestInfo";

	try {
		const response = await deleteRequest(url);
		if (response.succeded) {
			console.log(response);
			await navigateTo("/")
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
		await navigateTo("/")
	}
}
