import { Router } from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import ProjectController from './controllers/Project/ProjectController'
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

routes.post('/projects/:project_id/client/:user_id/add')
routes.post('/projects/:project_id/client/:user_id/remove')

//add friend
//see all friends

//create reference - users and coauthors
//delete reference - users and coauthors

//evaluate reference - clients
//asses reference / users and coauthors

//create project = users and coauthors
//delete project - users and coauthors

//asses project = users and coauthors

export default routes