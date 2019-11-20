import { Router } from 'express';
import actions from './actions';

const { list } = actions;
 
const genresRouter = Router();

genresRouter.get('/genres', list);


export default genresRouter;