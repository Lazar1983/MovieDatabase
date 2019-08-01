import { Router } from 'express';
import actions from './actions';

const { list, createMovie } = actions;
 
const moviesRouter = Router();

moviesRouter.get('/movies', list);
moviesRouter.post('/movies', createMovie);

export default moviesRouter;