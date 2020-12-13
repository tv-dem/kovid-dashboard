import { UI } from '../UI/UI';

class Map extends UI {
    constructor() {
        super();
        this.data = null;
    }

    init(data) {
        this.data = data;

        this.render();
    }

    updateData(data) {
        this.data = data;
    }

    render() {

        this.renderElement()

    }
}