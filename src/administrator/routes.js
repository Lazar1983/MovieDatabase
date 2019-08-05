import { Router } from 'express';
import actions from './actions';

const { list, createAdmin, login, createMovie, createActor } = actions;

const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.post('/sign-up', createAdmin);
adminRouter.post('/login', login);
adminRouter.post('/createMovie', createMovie);
adminRouter.post('/createActor', createActor);

export default adminRouter;