class CircleChart {
    constructor(width, heigth) {
        this.width = width;
        this.heigth = heigth;
        this.preferReduceMotion = window.matchMedia("(preferes-reduced-motion: reduced)").matches;
        this.speed = 1000;
        this.delay = 300;
    }
    async #getTemplate() {
        const parser = new DOMParser();
        const url = "/getDoc/circleChart";
        try {
            const response = await fetch(url, {
				method: "GET",
				headers: {flag: true}
			});
            const html = await response.text();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.body.innerHTML;
            return content;
        } catch (error) {
            console.log(error);
        }
    }
    async createFragment() {
        this.fragment = document.createDocumentFragment();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = await this.#getTemplate();
        while (tempDiv.firstChild)
            this.fragment.appendChild(tempDiv.firstChild);
    }
    getFragment() { return this.fragment; }
    #observe() {
        this.observer = new IntersectionObserver(chart => {
            if (chart[0].isIntersecting) {
                this.#addAnimation(this.speed, this.delay);
            }
        }, {
            treshold: 0.8
        });
        this.observer.observe(this.object);
    }
    appendFragment(id) {
        if (!this.fragment) {
            return;
        }
        const element = document.getElementById(id);
        if (!element)
            return;
        element.appendChild(this.fragment);
        this.object = element.lastChild;
        this.object.setAttribute("width", this.width);
        this.object.setAttribute("height", this.heigth);
        this.#observe();
    }
    setPercent(percent) {
        this.percent = percent;
        if (this.fragment) {
            const text = this.fragment.querySelector("text");
            text.textContent = `${this.percent}%`
        }
    }
    #addAnimation(speed = 1000, delay = 0) {
        if (!this.fragment) return;
        const circle = this.object.querySelector("circle");
        circle.animate([
            {
                strokeDashoffset: 100
            },
            {
                strokeDashoffset: (100 - (this.percent ? this.percent : 0))
            }
        ], {
            duration: this.preferReduceMotion ? 0 : speed,
            easing: "cubic-bezier(0.57, -0.04, 0.41, 1.13)",
            fill: "forwards",
        });
        const text = this.object.querySelector("text");
        text.animate([
            {
                opacity: 0,
                transform: "translateY(20%)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ], {
            delay: this.preferReduceMotion ? 0 : delay,
            duration: this.preferReduceMotion ? 0 : 300,
            easing: "cubic-bezier(0.57, -0.04, 0.41, 1.13)",
            fill: "forwards",
        })
    }
    setSpeed(speed) { this.speed = speed; }
    setDelay(delay) { this.speed = delay; }
    setTextColor(color) {
        const text = this.fragment.querySelector("text");
        text.style.fill = color;
    }
}
