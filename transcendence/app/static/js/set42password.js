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
		console.log(error);
		cancel42password(e);
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
		await navigateTo("/404")
	}
}
