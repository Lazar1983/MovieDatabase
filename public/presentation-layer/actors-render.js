import { ActorsPageLogic } from "../business-layer/actors-logic.js";

export function Renderer() {
    this.pageData = null;
    this.pageLogic = new ActorsPageLogic();
    console.log(this.pageLogic);
    this.mainContainer = document.getElementById("mainContainer");
    
    this.renderAll = function() {

        const getActors = async () => {
            const actor = a.value;
            this.pageData = await this.pageLogic.getDataForActorsPage(actor);
            return this.pageData;
        }

        const actorByMovies = async () => {
            const actorByMovie = u.value;
            this.pageData = await this.pageLogic.getDataForActorsPage(actorByMovie);
        }

        const get = document.createElement('button');
        get.innerHTML = "get";
        get.addEventListener('click', async () => {
            const getActor = await getActors();
            console.log(getActor);
            const p = document.createElement('p');
            p.innerHTML = getActor.actorsInfo.first_name;
            mainContainer.appendChild(p);
        });
        mainContainer.appendChild(get);



        const u = document.createElement('input');
        u.placeholder = 'Get actor by movie';
        u.id = "ui";
        mainContainer.appendChild(u);

        const seacrh = document.createElement('button');
        seacrh.placeholder = 'submit'
        seacrh.id = 'seacrh';
        seacrh.innerHTML = "Search";
        seacrh.addEventListener('click', actorByMovies);
        mainContainer.appendChild(seacrh);



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