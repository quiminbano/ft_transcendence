window.route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const loaders = [
	{ path: "/", function: loadDashboard },
	{ path: "/signup", function: loadSignup },
	{ path: "/settings", function: loadSettings },
	{ path: "/pong", function: loadPong },
	{ path: "/pong/tournament", function: loadTournamentCreation },
	{ path: "/pong/tournament/*", function: loadTournamentLobby },
	{ path: "/pong/single", function: loadSingle },
	{ path: "/pong/single/1v1", function: loadOneVOne },
	{ path: "/pong/single/2v2", function: load2v2Page },
	{ path: "/users/*", function: loadUsersPage },
]

const load = (path) => {
	const match = loaders.find(l => {
		if (l.path.includes("*")) {
			const basePath = l.path.replace("*", "");
			const pathSplit = path.split("/");
			const basePathSplit = basePath.split("/");
			if (path.startsWith(basePath) && pathSplit.length === basePathSplit.length)
				return true;
			else
				return false;
		} else {
			return l.path === path;
		}
	});
	if (match)
		match.function();
}

const parser = new DOMParser();
const handleLocation = async (headers = {}) => {
	const path = window.location.pathname;
	try {
		showLoadingSpinner();
		const response = await fetch(path, {
			method: "GET",
			headers: headers
		});
		if (!response.ok) {
			window.history.pushState(null, null, "/");
			handleLocation();
		}
		const html = await response.text();
		if (document.body) {
			const doc = parser.parseFromString(html, 'text/html');
			const bodyContent = doc.body.innerHTML;
			document.body.innerHTML = bodyContent;
		}
		load(path);
		hideLoadingSpinner();
	} catch (error) {
		//Maybe we should send something to front end here!!!
	}
};

window.onpopstate = handleLocation;
handleLocation();

window.handleLocation = handleLocation;

window.addEventListener("beforeunload", async (e) => {
	try {
		await getRequest("/api/exit", {"triggerWindow": true});
	} catch (error) {
		// console.log(error);
	}
	e.returnValue = '';
	returnValue = undefined;
})
