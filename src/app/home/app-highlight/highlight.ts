
export class Highlight {
    title: string;
    desc: string;
    image: string;
    link: string;
    routerLink: string;

    constructor(title: string, desc: string, image: string, routerLink: string = null, link: string = null) {

        this.title = title;
        this.desc = desc;
        this.image = image;
        this.link = link;
        this.routerLink = routerLink;

    }
}

