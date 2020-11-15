import { Router } from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import ProjectController from './controllers/ProjectController'
import DesignController from './controllers/DesignController'
import { authorize } from './middleware/auth'
 
const routes = Router()

routes.get('/', (req, res) => res.send('API - UXArchV1'))

routes.get('/users', UserController.getUsers)
routes.get('/users/:user_email', UserController.getUserByEmail)
routes.delete('/users/:user_email', UserController.deleteUser)
routes.post('/users', UserController.createUser)

routes.post('/signin', SessionController.login)

routes.post('/projects', authorize, ProjectController.createProject)
routes.delete('/projects/:project_id', authorize, ProjectController.deleteProjectById)
routes.get('/projects/:project_id', ProjectController.getProjectById)
routes.get('/projects', ProjectController.getProjects)

routes.post('/projects/:project_id/coauthor/:user_id/add', authorize, ProjectController.addCoauthor)
routes.post('/projects/:project_id/coauthor/:user_id/remove', authorize, ProjectController.removeCoauthor)

routes.post('/projects/:project_id/client/:user_id/add', authorize, ProjectController.addClient)
routes.post('/projects/:project_id/client/:user_id/remove', authorize, ProjectController.removeClient)

routes.post('/projects/:project_id/designs', authorize, DesignController.createDesign)
routes.delete('/projects/:project_id/designs/:design_id', authorize, DesignController.removeDesign)

routes.get('/projects/:project_id/designs/references', DesignController.getAllReferences)
routes.get('/projects/:project_id/designs/proposals', DesignController.getAllProposals)

routes.get('/projects/designs/:design_id', DesignController.getDesignById)

//evaluate reference - clients
//asses reference / users and coauthors

//create project = users and coauthors
//delete project - users and coauthors

export default routes