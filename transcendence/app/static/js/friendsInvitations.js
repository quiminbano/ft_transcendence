let invitationsModal;
const currentInvitations = [];
const createInvitationsModal = () => {
	invitationsModal = new Modal(document.getElementById("invitationsModal"));
}

const getFriendsInvitations = async () => {
	const url = "api/friendRequest?friendName=None";
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
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
	}
}

const removeFromFriend = async (username) => {
	const url = `/api/friend/${username}`;
	try {
		const response = await deleteRequest(url);
		if (response.succeded) {
			toggleButtons("addFriendBtn");
		} else {
			throw response;
		}
	} catch (error) {
		toggleButtons("addFriendBtn");
	}
}

const updateNotification = async () => {
	const invitations = await getFriendsInvitations();
	invitations.forEach(invitation => {
		if (!currentInvitations.find(i => i.username === invitation.username)) {
			currentInvitations.push(invitation);
		}
	});
	createNotificationElement(currentInvitations.length);
}

const createNotificationElement = (amount) => {
	if (amount === 0) return;
	const div = document.createElement("div");
	div.textContent = `You have ${amount} friend request${amount > 1 ? "s" : ""} pending`;
	div.setAttribute("class", "friendNotificationBox");
	const parentDiv = document.getElementById("friendsDropdown");
	div.addEventListener("click", openInvitationsModal);
	parentDiv.appendChild(div);
}

const openInvitationsModal = async () => {
	invitationsModal.open();
	displayInvitations(currentInvitations);
}

const closeInvitationsModal = () => {
	const parentDiv = document.getElementById("invitationsArea");
	while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
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

const displayInvitations = async (invitations = []) => {
	const generator = new FragmentGenerator("/getDoc/invitationItem");
	const parentDiv = document.getElementById("invitationsArea");
	while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
	for (const invite of invitations) {
		const fragment = await generator.generateFragment();
		await createInvitationItem(fragment, invite);
		generator.appendFragment(fragment, parentDiv);
	}
}

const createInvitationItem = async (fragment, invite) => {
	const item = fragment.getElementById("invitationItem");
	item.setAttribute("id", `inviteFrom${invite.username}`);
	const nameText = fragment.getElementById("invitedByUsername");
	nameText.innerText = invite.username;
	nameText.removeAttribute("id");
	const avatarPicture = fragment.getElementById("invitationUserPicture");
	avatarPicture.setAttribute("src", invite.avatarImage);
	avatarPicture.removeAttribute("id");
	const acceptButton = fragment.getElementById("acceptInvitation");
	acceptButton.addEventListener("click", () => {
		acceptInvite(invite.username);
	});
	acceptButton.removeAttribute("id");
	const rejectButton = fragment.getElementById("rejectInvitation");
	rejectButton.addEventListener("click", () => {
		rejectInvitation(invite.username);
	});
	rejectButton.removeAttribute("id");
}

const acceptInvite = async (username) => {
	const url = `/api/friend/${username}`;
	showLoadingSpinner();
	try {
		const response = await postRequest(url, "");
		if (response.succeded) {
			removeItem(username);
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
	}
	hideLoadingSpinner();
}

const rejectInvitation = async (username) => {
	const url = `/api/friendRequest/${username}`;
	showLoadingSpinner();
	try {
		const response = await deleteRequest(url, "");
		if (response.succeded) {
			removeItem(username);
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
	}
	hideLoadingSpinner();
}

const removeItem = (username) => {
	const indexToRemove = currentInvitations.indexOf(invitation => invitation === username);
	currentInvitations.splice(indexToRemove, 1);
	const parentNode = document.getElementById("invitationsArea");
	const nodeToRemove = document.getElementById(`inviteFrom${username}`);
	if (parentNode && nodeToRemove)
		parentNode.removeChild(nodeToRemove);
}
