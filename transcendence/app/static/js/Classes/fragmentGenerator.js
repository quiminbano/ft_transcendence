class FragmentGenerator {
    constructor(url) {
        this.url = url;
    }
    #getTemplate = async () => {
        const response = await fetch(this.url);
        const html = await response.text();
        return html;
    }
    generateFragment = async () => {
        const parser = new DOMParser();
        const html = await this.#getTemplate(this.url);
        const doc = parser.parseFromString(html, "text/html");
        const content = doc.body.innerHTML;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        const fragment = document.createDocumentFragment();
        while (tempDiv.firstChild)
            fragment.appendChild(tempDiv.firstChild);
        this.fragment = fragment;
        return fragment;
    }
    appendFragment = (fragment, parent) => {
        parent.appendChild(fragment);
    }
}