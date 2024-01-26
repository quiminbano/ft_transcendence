let invitationsModal;

const createInvitationsModal = () => {
	invitationsModal = new Modal(document.getElementById("invitationsModal"));
}

const getFriendsInvitations = async () => {
	const url = "";
	try {
		const response  = await getRequest(url);
		if (response.succeded) {
			return response.data;
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

const inviteToBeFriend = async (username) => {
	const url = `/api/friendRequest/${username}`
	try {
		const response = await postRequest(url, "");
		if (response.succeded) {
			toggleButtons("waitingFriendBtn");
			getRequest(window.location.pathname);
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
	}
}

const createNotificationElement = (amount) => {
	const div = document.createElement("div");
	div.textContent = `You have ${amount} friend request${amount > 1 ? "s" : ""} pending`;
	div.setAttribute("class", "friendNotificationBox");
	const parentDiv = document.getElementById("friendsDropdown");
	div.addEventListener("click", openInvitationsModal);
	parentDiv.appendChild(div);
}

const openInvitationsModal = () => {
	invitationsModal.open();
}

const closeInvitationsModal = () => {
	invitationsModal.close();
}

const toggleButtons = (buttonToActivate) => {
	const buttons = [];
	buttons.push(document.getElementById("addFriendBtn"));
	buttons.push(document.getElementById("waitingFriendBtn"));
	buttons.push(document.getElementById("removeFriendBtn"));
	buttons.forEach(button => {
		if (button.id === buttonToActivate) {
			button.classList.add("active");
			button.classList.remove("nonActive");
		}
        else {
			button.classList.add("nonActive");
			button.classList.remove("active");
        }
	})
}
