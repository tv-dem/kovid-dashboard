export class Connector {
    constructor(url, token) {
        this.URL = url;
        this.token = token;
    }

    getLink(params) {
        //...
        let link = '';
        return link;        
    }

    getData(params) {
        const link = this.getLink(params);
        // async await fetch 
    }
}