export class MdlSlide {
    constructor(public id: string, public caption: string, public image: string, public state: string = 'inactive') {

    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }
}