const generator = new FragmentGenerator("/getDoc/searchItem");

const loadDashboard = () => {
	const searchButton = document.getElementById("searchButton");
	const search = document.getElementById("search");
	const saveButton = document.querySelector("#saveUploadedPictureButton");
	saveButton.style.display = "none";

	searchButton.addEventListener("click", () => {
		if (search.classList.contains("search")) {
			search.classList.remove("search");
			search.classList.add("searchExpanded");
			search.focus();
			search.setAttribute("placeholder", "Search for friends");
		} else if (search.classList.contains("searchExpanded")) {
			search.classList.remove("searchExpanded");
			search.classList.add("search");
		}
	})
	makeChart();
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
				console.log(e.loaded);
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
}

const debounce = (func, delay = 300) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay);
	}
}

const onSearch = (event) => {
	const input = event.target.value;

	//PROPERLY MAKE A GET REQUEST TO GET THE MATCH USERS!!!!
	const matches = fakeUsers.filter(user => user.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
	const menu = document.getElementById("dropdownMenu");
	if (input.length > 0) {
		showDropdown(menu);
		const parentDiv = document.getElementById("dropdownMenu");
		displayDropdownElements(matches, parentDiv);
	}
	else
		hideDropdown(menu);
}
const onInput = debounce(onSearch);

const hideDropdown = (element) => {
	if (!element)
		return;
	const inputField = document.getElementById("search");
	inputField.style.borderBottomLeftRadius = "30px";
	inputField.style.borderBottomRightRadius = "30px";
	element.classList.remove("dropdownExpanded");
	element.classList.add("dropdownCollapsed");
}
const showDropdown = (element) => {
	if (!element)
		return;
	element.classList.remove("dropdownCollapsed");
	element.classList.add("dropdownExpanded");
	const inputField = document.getElementById("search");
	inputField.style.borderBottomLeftRadius = "0px";
	inputField.style.borderBottomRightRadius = "0px";
}

const displayDropdownElements = (matches = [], parentDiv) => {
	console.log(matches)
	while (parentDiv.firstChild) {
	  parentDiv.removeChild(parentDiv.firstChild);
	}
	if (matches.length === 0) {
		const noMatches = document.createElement("div");
		noMatches.textContent = "No Matches";
		noMatches.setAttribute("class", "searchItemName");
		parentDiv.appendChild(noMatches);
	} else {
		matches.forEach(match => searchMatchItem(match.src || "/static/images/profileIcon.png", match.name || match, parentDiv));
	}
}

const searchMatchItem = async (src, name, parentDiv) => {
	const fragment = await generator.generateFragment();
	const picture = fragment.querySelector("#searchItemPicture");
	if (picture) {
		picture.setAttribute("src", src);
		picture.removeAttribute("id");
	}
	const itemName = fragment.querySelector("#searchItemName");
	if (itemName) {
		itemName.textContent = name;
		itemName.removeAttribute("id");
	}
	generator.appendFragment(fragment, parentDiv);
}

const onClickFriendsButton = () => {
	//GET THE REAL FRIENDS!!!!
	const friends = fakeFriends; //CHANGE THIS TO REAL FRIENDS!!!!!
	const friendsDropdown = document.getElementById("friendsDropdown");
	if (friendsDropdown.classList.contains("friendsDropdownCollapsed")) {
		friendsDropdown.classList.remove("friendsDropdownCollapsed");
		friendsDropdown.classList.add("friendsDropdownExpanded");
		const parentDiv = document.getElementById("friendsDropdown");
		displayDropdownElements(friends, parentDiv);
	} else if (friendsDropdown.classList.contains("friendsDropdownExpanded")) {
		friendsDropdown.classList.remove("friendsDropdownExpanded");
		friendsDropdown.classList.add("friendsDropdownCollapsed");
	}
}



/****************** Modal Dashboard **********************/
const togglePictureModal = () => {
	console.log("Open modal called");
	const modalContainer = document.querySelector(".ModalContainer");
	modalContainer.classList.toggle("show");
}


