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
            if (this.contentList[i].element == null) continue;
            if (this.contentList[i].name === name) {
                this.activeContent = this.contentList[i];
                this.contentList[i].element.style.display = "block";
            } else {
                this.contentList[i].element.style.display = "none";
            }
        }
    }
}