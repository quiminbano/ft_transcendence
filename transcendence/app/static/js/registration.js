
	try {
		console.log(url);
		const result = await postRequest(url, data);
		const success = result.success === "true";
		if (success) {
			console.log("User successfully updated");
			navigateTo('/')
			//Handle user navigation after registration complete!!!!
		}
		else {
			console.log("Failed to update user");
			if (result.errors)
				console.log("result.error is true");
		}
	} catch (error) {
		console.log("Exception thrown from request");
	}
	hideLoadingSpinner();
}
