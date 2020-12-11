class UI{
    render(parent, tagName, classNames = null, innerHtml = null){
        const element = document.createElement(tagName);
        if(classNames && typeof classNames === "string"){
            element.classList.add(...classNames.split(" "));
        }
        if(innerHtml){
            element.innerHtml = innerHTML;
        }
        parent.prepend(element);
        return element;
    }
}

//example

class div extends UI{
    constructor(){
        super()
    }
    renderElement(){
        this.render(document.querySelector('.black'), 'div', "red swallowed");
    }
}

const d = new div();

d.renderElement();