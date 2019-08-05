import { Router } from 'express';
import actions from './actions';

const { 
  list, 
  createAdmin, 
  login, 
  createMovie, 
  createActor, 
  createDirector, 
  createSerie, 
  createStudio, 
  createGenre 
} = actions;

const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.post('/sign-up', createAdmin);
adminRouter.post('/login', login);
adminRouter.post('/admin/:id/movies/', createMovie);
adminRouter.post('/admin/:id/actors/', createActor);
adminRouter.post('/admin/:id/director/', createDirector);
adminRouter.post('/admin/:id/serie/', createSerie);
adminRouter.post('/admin/:id/studio/', createStudio);
adminRouter.post('/admin/:id/genre/', createGenre);


export default adminRouter;