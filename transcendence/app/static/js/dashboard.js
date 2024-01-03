const files = [];
const loadDashboard = () => {
	const saveButton = document.querySelector("#saveUploadedPictureButton");
	saveButton.style.display = "none";
	saveButton.addEventListener("click", async () => {
		showLoadingSpinner();
		await savePicture(files[0]);
		hideLoadingSpinner();
		saveButton.style.display = "none";
	})
	const dragArea = document.querySelector(".dropArea");
	const fileInput = dragArea.querySelector("input[name='avatarImage']");
	dragArea.addEventListener("click", () => {
		fileInput.click();
	})
	fileInput.onchange = (e) => {
		clearFiles();
		const image = e.target.files[0];
		files.push(image);
		if (!isValidImage(files[0])) {
			setDragAreaInvalid("Invalid file format");
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
			setDragAreaInvalid("Invalid file format");
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
			setDragAreaInvalid("Error: something happened");
			throw new Error("Couldn't read the file");
		}
		pElement.innerHTML = "Added " + image.name;
		upload(image);
	}
	const upload = async (file) => {
		const url = URL.createObjectURL(file);
		const img = dragArea.querySelector("#previewUploadedImage");
		img.style.display = "flex";
		img.setAttribute("src", url);
		saveButton.style.display  = "flex";
	}
	loadMenus();
}

const savePicture = async (file) => {
	const dragArea = document.querySelector(".dropArea");
	const pElement = dragArea.querySelector("p");
	const fd = new FormData();
	pElement.textContent = "Uploading...";
	fd.append("avatarImage", file);

	try {
		const config = {
			method: "POST",
			headers: {
				"X-CSRFToken": getCookie('csrftoken'),
			},
			body: fd
		}
		const response = await fetch("/api/user", config);
		if (response.ok) {
			const data = await response.json();
			const profilePicture = document.getElementById("dashboardUserProfilePic");
			const sideMenuPic = document.getElementById("sideMenuProfilePic");
			const url = data.source;
			profilePicture.setAttribute("src", url);
			sideMenuPic.setAttribute("src", url);
			pElement.textContent = "Completed";
			dragArea.setAttribute("class", "dropArea");
		} else {
			throw new Error("Failed to upload image");
		}
	} catch (error) {
		setDragAreaInvalid("Upload failed. Please try again");
	}
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
	pElement.textContent = "Drop the image here or click to upload it";
}

const setDragAreaInvalid = (message) => {
	const dragArea = document.querySelector(".dropArea");
	const pElement = dragArea.querySelector("p");
	pElement.innerHTML = message;
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

