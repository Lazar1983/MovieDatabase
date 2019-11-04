import { ActorsRepository } from "../repository-layer/actors-repo.js";

export function ActorsPageLogic() {

    this.actorsRepo = new ActorsRepository();

    this.getDataForActorsPage = async function(actorName) {
        const actorData = await this.actorsRepo.getActorsInfo(actorName);
     
        const pageData = {
            actorsInfo: actorData
        };

        return pageData;
    }

    this.getActorsPerMovies = async function (actorName) {
        const actorByMovie = await this.actorsRepo.getActorsByMovie(actorName);

        const pageData = {
            actorsInfo: actorByMovie
        }

        return pageData;
    }

}