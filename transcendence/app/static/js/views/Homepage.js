import AbstractClass from "./AbstractClass.js";

export default class extends AbstractClass {
    constructor(params) {
        super(params);
        this.setTitle("Homepage");
    }
    async getHtml() {
        return new Promise((resolve, reject) => {
            fetch("static/html/Homepage.html").
                then(response => response.text()).
                then(htmlContent => {
                    resolve(htmlContent);
                }).
                catch(error => {
                    console.log(error);
                    reject(error);
                })
        })
    }
}
