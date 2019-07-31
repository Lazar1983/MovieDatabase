import { Router } from 'express';
import actions from './actions';

const { list } = actions;
 
const moviesRouter = Router();

moviesRouter.get('/movies', list);

export default moviesRouter;