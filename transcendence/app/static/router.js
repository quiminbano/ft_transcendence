window.route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "404",
    "/admin": "admin",
    "/": "",
    "/login": "login",
	"/signup": "signup",
	"/settings": "settings",
	"/pong": "pong"
};

const parser = new DOMParser();
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    try {
        const response = await fetch(path);
        if (!response.ok) {
			window.history.pushState(null, null, "/");
			handleLocation();
            //throw new Error(`Failed to fetch route. Status: ${response.status}`);
        }
        const html = await response.text();
        if (document.body) {
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            document.body.innerHTML = bodyContent;
        }
       // document.getElementById("page-content").innerHTML = html;
    } catch (error) {
        console.log(error);
        //Maybe we should send something to front end here!!!
    }
};

window.onpopstate = handleLocation;
handleLocation();

window.handleLocation = handleLocation;
