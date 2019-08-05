import { Router } from 'express';
import actions from './actions';

const { list, get } = actions;
 
const actorRouter = Router();

actorRouter.get('/actors', list);
actorRouter.get('/actors/:first_name', get);

export default actorRouter;