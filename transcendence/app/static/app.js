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
		if (!response.ok) {
			throw new Error("failed to add new user");
		} else {
			const data = await response.json();
			data.succeded = true;
			return data;
		}
	} catch (error) {
		const info = {
			succeded: false,
			message: error.message
		}
		return info;
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
		if (!response.ok) {
			throw new Error("failed to add new user")
		} else {
			const data = await response.json();
			data.succeded = true;
			return data;
		}
	} catch (error) {
		const info = {
			succeded: false,
			message: error.message
		}
		return info;
	}
}

const deleteRequest = async (url) => {
	const csrftoken = getCookie('csrftoken');
	const config = {
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken
		},
	}
	try {
		const response = await fetch(url, config);
		if (!response.ok) {
			throw new Error("Failed to delete tournament");
		}
		const data = await response.json();
		data.succeded = true;
		return data;
	} catch (error) {
		console.log(error);
		return ({succeded: false, error: error.message})
	}
}

const getRequest = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok)
			throw new Error("Failed to fetch data");
		const data = await response.json();
		data.succeded = true;
		return data;
	} catch (error) {
		const data = {
			succeded: false,
			error: error.message
		}
		return data;
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

const navigateTo = async (url, data = {}) => {
	history.pushState(data, null, url);
	await window.handleLocation();
}

const goBack = async () => {
	history.back();
	await handleLocation();
}


const fakeUsers = [
	{ name: 'John Smith', src: 'https://placekitten.com/200/300?image=1' },
	{ name: 'Emily Johnson', src: 'https://placekitten.com/200/300?image=2' },
	{ name: 'William Brown', src: 'https://placekitten.com/200/300?image=3' },
	{ name: 'Sophia Miller', src: 'https://placekitten.com/200/300?image=4' },
	{ name: 'James Wilson', src: 'https://placekitten.com/200/300?image=5' },
	{ name: 'Olivia Moore', src: 'https://placekitten.com/200/300?image=6' },
	{ name: 'Daniel Davis', src: 'https://placekitten.com/200/300?image=7' },
	{ name: 'Ava Taylor', src: 'https://placekitten.com/200/300?image=8' },
	{ name: 'Michael Jackson', src: 'https://placekitten.com/200/300?image=9' },
	{ name: 'Emma White', src: 'https://placekitten.com/200/300?image=10' },
	{ name: 'Christopher Johnson', src: 'https://placekitten.com/200/300?image=11' },
	{ name: 'Isabella Martin', src: 'https://placekitten.com/200/300?image=12' },
	{ name: 'Matthew Harris', src: 'https://placekitten.com/200/300?image=13' },
	{ name: 'Amelia Brown', src: 'https://placekitten.com/200/300?image=14' },
	{ name: 'David Robinson', src: 'https://placekitten.com/200/300?image=15' },
	{ name: 'Sophie Davis', src: 'https://placekitten.com/200/300?image=16' },
	{ name: 'Andrew Miller', src: 'https://placekitten.com/200/300?image=17' },
	{ name: 'Ella Anderson', src: 'https://placekitten.com/200/300?image=18' },
	{ name: 'Joshua Taylor', src: 'https://placekitten.com/200/300?image=19' },
	{ name: 'Mia Wilson', src: 'https://placekitten.com/200/300?image=20' },
];

const fakeFriends = ["Andre", "Carlos", "Hans", "Joao", "Lucas"]