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
		if (!response.ok) {
			throw data;
		} else {
			data.succeded = true;
			return data;
		}
	} catch (error) {
		error.succeded = false;
		return error;
	}
}

const putRequest = async (url, data) => {
	const csrftoken = getCookie('csrftoken');
	const config = {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url, config);
		const data = await response.json();
		if (!response.ok) {
			throw data;
		} else {
			data.succeded = true;
			return data;
		}
	} catch (error) {
		error.succeded = false;
		return error;
	}
}

const deleteRequest = async (url, body = {}) => {
	const csrftoken = getCookie('csrftoken');
	const config = {
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken
		},
		body: JSON.stringify(body)
	}
	try {
		const response = await fetch(url, config);
		const data = await response.json();
		if (!response.ok) {
			throw data;
		}
		data.succeded = true;
		return data;
	} catch (error) {
		error.succeded = false;
		return error;
	}
}

const getRequest = async (url, headers = {}) => {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: headers
		});
		const data = await response.json();
		if (!response.ok)
			throw data;
		return {data, succeded: true};
	} catch (error) {
		error.succeded = false;
		return error;
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

const navigateTo = async (url, headers = {}, data = {}) => {
	history.pushState(data, null, url);
	await window.handleLocation(headers);
}

const goBack = async () => {
	history.back();
	await handleLocation();
}

const saveGameInDatabase = async (id, data) => {
	showLoadingSpinner();
	const url = `/api/tournament/${id}/match`;
	try {
		const response = await postRequest(url, data);
		if (!response.succeded)
			throw response;
	} catch (error) {
		console.log(error);
	}
	hideLoadingSpinner();
}
