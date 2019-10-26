import { ActorsPageLogic } from "../business-layer/actors-logic.js";

export function Renderer() {
    this.pageData = null;
    this.mainContainer = document.getElementById("mainContainer");

    this.pageLogic = new ActorsPageLogic();
    
    this.renderAll = function() {
        
        console.log(this.pageData);

        const u = document.createElement('input');
        u.placeholder = 'username';
        u.id = 'e';
        mainContainer.appendChild(u);

        const btn = document.createElement('button');
        btn.placeholder = 'submit'
        btn.id = 'btn';
        btn.addEventListener('click', this.pageLogic);
        mainContainer.appendChild(btn);

    }


    this.init = async function(actorName) {
        this.pageData = await this.pageLogic.getDataForActorsPage(actorName);
        // this.mainContainer.innerHTML = "";
        this.renderAll();
    }


}