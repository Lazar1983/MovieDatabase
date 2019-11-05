import { ActorsRepository } from "../repository-layer/actors-repo.js";

export function ActorsPageLogic() {

    this.actorsRepo = new ActorsRepository();

    this.getDataForActorsPage = async function(actorName) {
        const actorData = await this.actorsRepo.getActorsInfo(actorName);
        const actorByMovie = await this.actorsRepo.getActorsByMovie(actorName);
     
        const pageData = {
            actorsInfo: actorData,
            actorsMovie: actorByMovie
        };

        return pageData;
    }


}