const loadDashboard = () => {
	const saveButton = document.querySelector("#saveUploadedPictureButton");
	saveButton.style.display = "none";
	const dragArea = document.querySelector(".dropArea");
	const pElement = dragArea.querySelector("p");
	const fileInput = dragArea.querySelector("input");
	dragArea.addEventListener("click", () => {
		fileInput.click();
		fileInput.onchange = (e) => {
			upload(e.target.files[0]);
		}
	})
	dragArea.addEventListener("dragover", (e) => {
		e.preventDefault();
		dragArea.classList.add("hover")
	})
	dragArea.addEventListener("dragleave", () => {
		dragArea.classList.remove("hover");
	})
	dragArea.addEventListener("drop", async (e) => {
		e.preventDefault();
		const image = e.dataTransfer.files[0];
		const type = image.type;
		if (type == "image/png" || type == "images/jpeg")
			return uploadImage(image)
		else {
			pElement.innerHTML = "Invalid file format";
			dragArea.setAttribute("class", "dropArea invalid");
			return false;
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
			pElement.textContent = "Error: something happened";
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
		saveButton.addEventListener("click", async () => {
			showLoadingSpinner();
			await savePicture(file);
			hideLoadingSpinner();
			saveButton.style.display = "none";
		})
	}

	const savePicture = async (file) => {
		const fd = new FormData();
		pElement.textContent = "Uploading...";
		fd.append("file", file);
		const response = await putRequest("/api/media", fd);
		if (response.succeeded) {
			pElement.textContent = "Completed";
			console.log("Image uploaded successfully");
			dragArea.setAttribute("class", "dropArea");
		} else {
			pElement.textContent = "Upload failed. Please try again";
			dragArea.setAttribute("class", "dropArea invalid");
			console.log("Filed to upload image");
		}
	}
	loadMenus();
}

/****************** Modal Dashboard **********************/
const togglePictureModal = () => {
	const modalContainer = document.querySelector(".ModalContainer");
	modalContainer.classList.toggle("show");
	if (!modalContainer.classList.contains("show")) {
		const dragArea = document.querySelector(".dropArea");
		const img = dragArea.querySelector("#previewUploadedImage");
		img.style.display = "none";
	}
}


