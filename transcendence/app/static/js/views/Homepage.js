import AbstractClass from "./AbstractClass.js";

export default class extends AbstractClass {
    constructor(params) {
        super(params);
        this.setTitle("Homepage");
    }
    async getHtml() {
        return new Promise((resolve, reject) => {
            fetch("static/html/homepage.html").
                then(response => response.text()).
                then(htmlContent => {
					console.log(htmlContent);
                    resolve(htmlContent);
                }).
                catch(error => {
                    console.log(error);
                    reject(error);
                })
        })
		/*return `
			<h1>This is the homepage made from a html template string</h1>
		`*/
    }
}
