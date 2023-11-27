window.route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "404",
    "/admin": "admin",
    "/": "main",
    "/login": "login",
	"/signup": "signup",
	"/dashboard": "dashboard"
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    try {
        const response = await fetch(`/_${route}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch route. Status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById("page-content").innerHTML = html;
    } catch (error) {
        console.log(error);
        //Maybe we should send something to front end here!!!
    }
};

window.onpopstate = handleLocation;
handleLocation();

window.handleLocation = handleLocation;
