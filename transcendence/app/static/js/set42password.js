const save42password = async (e) => {
	e.preventDefault();
	const url = "/api/getRestInfo";

	const form = new FormData(e.target);
	const password = form.get("password");
	console.log(password);
	try {
		const response = await postRequest(url, password);
		if (response.succeeded) {
			console.log(response);
		} else {
			throw response;
		}
	} catch(error) {
		console.log(error);
	}
}