window.route = (event) => {
	console.log("route called");
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
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("page-content").innerHTML = html;
};

window.onpopstate = handleLocation;
handleLocation();
