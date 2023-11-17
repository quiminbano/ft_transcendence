import AbstractClass from "./AbstractClass.js";

export default class extends AbstractClass {
    constructor() {
        super();
        this.setTitle("Homepage");
    }
    async getHtml() {
        return `
            <h1>This is the HomePage</h1>
        `
    }
}
