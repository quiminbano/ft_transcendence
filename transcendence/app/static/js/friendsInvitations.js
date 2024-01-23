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
