class ContentDisplayManager {
    constructor(content) {
        this.contentList = [];
        this.contentList.push(content);
        this.activeContent = this.contentList[0];
        this.setActive(this.activeContent.name);
    }
    addContent(name, element) {
        const content = {
            name: name,
            element: element
        }
        this.contentList.push(content);
        element.style.display = "none";
    }
    setActive(name) {
        for (let i = 0; i < this.contentList.length; i++) {
            if (this.contentList[i].name === name) {
                console.log("Editing active element");
                this.activeContent = this.contentList[i];
                this.contentList[i].element.style.display = "block";
            } else {
                console.log("Editing non active element");
                this.contentList[i].element.style.display = "none";
            }
        }
    }
}