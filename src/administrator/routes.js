import { Router } from 'express';
import actions from './actions';
import actionsMovies from '../movies/actions';

const { list, create } = actions;
const { createMovie } = actionsMovies;
 
const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.post('/admin', create);
adminRouter.post('/admin/:id/movies', createMovie);



export default adminRouter;