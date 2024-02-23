const files = [];
let allGamesModal;
const loadDashboard = () => {
	loadStats();
	createInvitationsModal();
	allGamesModal = new Modal(document.getElementById("allLastGamesModal"));
	if (allGamesModal)
		allGamesModal.close();
	const saveButton = document.querySelector("#saveUploadedPictureButton");
	if (saveButton) {
		saveButton.style.display = "none";
		saveButton.addEventListener("click", async () => {
			showLoadingSpinner();
			await savePicture(files[0]);
			hideLoadingSpinner();
			saveButton.style.display = "none";
		})
	}

	const dragArea = document.querySelector(".dropArea");
	if (dragArea) {
		const fileInput = dragArea.querySelector("input[name='avatar_image']");
		dragArea.addEventListener("click", () => {
			fileInput.click();
		})
		fileInput.onchange = (e) => {
			clearFiles();
			const image = e.target.files[0];
			files.push(image);
			if (!isValidImage(files[0])) {
				setDragAreaInvalid(getTranslation(pictureDictionary.invalidformatFile));
				return;
			} else {
				return uploadImage(files[0])
			}
		}
		dragArea.addEventListener("dragover", (e) => {
			e.preventDefault();
			dragArea.classList.add("hover")
		})
		dragArea.addEventListener("dragleave", () => {
			dragArea.classList.remove("hover");
		})
		dragArea.addEventListener("drop", async (e) => {
			e.preventDefault();
			clearFiles();
			const image = e.dataTransfer.files[0];
			files.push(image);
			if (!isValidImage(files[0])) {
				setDragAreaInvalid(getTranslation(pictureDictionary.invalidformatFile));
			} else {
				return uploadImage(files[0]);
			}
		})
		const uploadImage = (image) => {
			dragArea.setAttribute("class", "dropArea valid");
			const pElement = dragArea.querySelector("p");

			const isFile = 	new Promise((resolve) => {
				const fr = new FileReader();
				fr.onprogress = (e) => {
					if (e.loaded > 50) {
						fr.abort();
						resolve(true);
					}
				}
				fr.onload = () => {resolve(true);}
				fr.onerror = () => {resolve(false);}
				fr.readAsArrayBuffer(image);
			})
			if (!isFile) {
				setDragAreaInvalid(getTranslation(pictureDictionary.somethingHappened));
				throw new Error(getTranslation(pictureDictionary.cantReadFile));
			}
			pElement.innerText = getTranslation(pictureDictionary.added) + image.name;
			upload(image);
		}
		const upload = async (file) => {
			const url = URL.createObjectURL(file);
			const img = dragArea.querySelector("#previewUploadedImage");
			img.style.display = "flex";
			img.setAttribute("src", url);
			saveButton.style.display  = "flex";
		}
	}
	loadMenus();
}

const savePicture = async (file) => {
	const dragArea = document.querySelector(".dropArea");
	const pElement = dragArea.querySelector("p");
	const fd = new FormData();
	pElement.textContent = getTranslation(pictureDictionary.uploading);
	fd.append("avatar_image", file);

	try {
		const config = {
			method: "POST",
			headers: {
				"X-CSRFToken": getCookie('csrftoken'),
			},
			body: fd
		}
		const response = await fetch("/api/userProfilePicture", config);
		if (response.ok) {
			const data = await response.json();
			const profilePicture = document.getElementById("dashboardUserProfilePic");
			const sideMenuPic = document.getElementById("sideMenuProfilePic");
			const url = data.source;
			profilePicture.setAttribute("src", url);
			sideMenuPic.setAttribute("src", url);
			pElement.textContent = getTranslation(pictureDictionary.completed);
			dragArea.setAttribute("class", "dropArea");
		} else {
			throw new Error(getTranslation(pictureDictionary.failedToUpload));
		}
	} catch (error) {
		setDragAreaInvalid(getTranslation(pictureDictionary.uploadFail));
	}
}

const getTranslation = (texts) => {
	let message;
	try {
		const language = JSON.parse(document.getElementById('language').textContent);
		switch(language) {
			case "fin":
				message = texts["fin"];
				break;
			case "swe":
				message = texts["swe"];
				break;
			default:
				message = texts['eng'];
		}
	} catch(error) {
		message = texts["eng"];
	}
	return message;
}

const clearFiles = () => {
	while(files.length > 0)
		files.pop();
}
/****************** Modal Dashboard **********************/
const togglePictureModal = () => {
	const modalContainer = document.querySelector(".ModalContainer");
	toggleModal();
	if (!modalContainer.classList.contains("show")) {
		resetDragArea();
	}
}

const toggleModal = () => {
	const modalContainer = document.querySelector(".ModalContainer");
	modalContainer.classList.toggle("show");
}

const resetDragArea = () => {
	const dragArea = document.querySelector(".dropArea");
	const img = dragArea.querySelector("#previewUploadedImage");
	const pElement = dragArea.querySelector("p");
	const saveButton = document.querySelector("#saveUploadedPictureButton");
	dragArea.setAttribute("class", "dropArea");
	saveButton.style.display = "none";
	img.style.display = "none";
	pElement.textContent = getTranslation(pictureDictionary.resetDragText);
}

const setDragAreaInvalid = (message) => {
	const dragArea = document.querySelector(".dropArea");
	const pElement = dragArea.querySelector("p");
	pElement.innerText = message;
	dragArea.setAttribute("class", "dropArea invalid");
}

const isValidImage = (file) => {
	const image = file;
	if (!image) {
		return false;
	}
	const type = image.type;
	if (type == "image/png" || type == "image/jpeg")
		return true;
	return false;
}

const openAllGamesModal = () => {
	allGamesModal.open();
}

const closeAllGamesModal = () => {
	allGamesModal.close();
}


const loadLanguagesDropdown = () => {

}

const openLanguageDropdown = () => {
	const languageDropdownMenu = document.getElementById("languageDropdown-menu");
	if (!languageDropdownMenu)
		return;
	languageDropdownMenu.classList.toggle("dropdownActive");
}

const pictureDictionary = {
	invalidformatFile: {
		eng: "Invalid file format",
		fin: "Virheellinen tiedostomuoto",
		swe: "Ogiltigt filformat"
	},
	somethingHappened: {
		eng: "Error: something happened",
		fin: "Virhe: jotain meni pieleen",
		swe: "Fel: något hände"
	},
	added: {
		eng: "Added ",
		fin: "Lisätty ",
		swe: "Tillagd "
	},
	uploading: {
		eng: "Uploading...",
		fin: "Ladataan...",
		swe: "Laddar..."
	},
	completed: {
		eng: "Completed",
		fin: "Valmis",
		swe: "Färdig"
	},
	cantReadFile: {
		eng: "Couldn't read the file",
		fin: "Ei voitu lukea tiedostoa",
		swe: "Kunde inte läsa filen"
	},
	failedToUpload: {
		eng: "Failed to upload image",
		fin: "Lataus epäonnistui",
		swe: "Uppladdningen misslyckades"
	},
	uploadFail: {
		eng: "Upload failed. Please try again",
		fin: "Lataus epäonnistui. Yritä uudelleen",
		swe: "Uppladdningen misslyckades. Försök igen"
	},
	resetDragText: {
		eng: "Drop the image here or click to upload it",
		fin: "Pudota kuva tähän tai napsauta ladataksesi sen",
		swe: "Släpp bilden här eller klicka för att ladda upp den"
	}
}
