import { Actors } from "../entities/actors.js";

export function ActorsRepository() {

    this.getActorsInfo = async function(actorName) {
        try {
            const response =  await fetch(`http://localhost:3000/actors/${actorName}`);
            const data = await response.json();
            console.log("Response from getActorsInfo API", data);
            return new Actors(data.actors);
        } catch(error) {
            return error;
        }
    }

}