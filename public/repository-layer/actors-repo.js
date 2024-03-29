import { Actors } from "../entities/actors.js";

export function ActorsRepository() {

    this.getActorsInfo = async function(actorName) {
        try {
            const response =  await fetch(`http://localhost:3060/actorsByName?name=${actorName}`);
            const data = await response.json();
            console.log("Response from getActorsInfo API", data);
            return new Actors(data.body[0]);
        } catch(error) {
            return error;
        }
    }

    this.getActorsByMovie = async function(actorName) {
        try {
            const response = await fetch(`http://localhost:3060/actorsByMovies?name=${actorName}`);
            const data = await response.json();
            console.log("Response from Get actors by Movie ", data);
            return new Movie(data.body[0]);
        } catch (error) {
            return error;
        }
    }

}