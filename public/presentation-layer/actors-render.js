import { ActorsPageLogic } from "../business-layer/actors-logic.js";

export function Renderer() {
    this.pageData = null;
    this.pageLogic = new ActorsPageLogic();
    this.mainContainer = document.getElementById("mainContainer");
    
    this.renderAll = function() {

        const getActors = async () => {
            const actor = a.value;
            this.pageData = await this.pageLogic.getDataForActorsPage(actor);
        }

        const a = document.createElement('input');
        a.placeholder = 'Enter Actor Name';
        a.id = 'e';
        mainContainer.appendChild(a);

        const btn = document.createElement('button');
        btn.placeholder = 'submit'
        btn.id = 'btn';
        btn.innerHTML = "Search";
        btn.addEventListener('click', getActors);
        mainContainer.appendChild(btn);

    }


    this.renderAll();

}