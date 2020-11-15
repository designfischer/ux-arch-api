import { Request, Response } from 'express'
import Project from '../models/Project'

const MAX_PROJECTS_PER_USER = 3

const ProjectController = {
    async createProject(req: Request, res: Response) {       
        const userId = req.userId
        const { title } = req.body        
        try {    
            const usersProjects = await Project.find({ owner: userId })
            if (usersProjects.length >= MAX_PROJECTS_PER_USER) return res.status(400).json({ 
                message: `Max limit of ${MAX_PROJECTS_PER_USER} projects reached.` 
            })                 
            const project = await Project.create({
                title: title,
                owner: userId
            })
            return res.status(201).json(project)
        } catch(err) {            
            return res.status(500).json(err)
        }
    },    
    async deleteProjectById(req: Request, res: Response) {
        const userId = req.userId
        const { project_id } = req.params
        try {
            const belongsToOwner = await Project.findById(project_id)            
            if (!belongsToOwner) return res.status(404).json({ message: 'Project not found' })
            if (String(belongsToOwner?.owner) !== userId) return res.status(403).json({ message: 'Operation not allowed' })
            
            const deletedProject = await Project.findByIdAndDelete(project_id)         
            return res.status(200).json({ message: 'Project deleted succesffully', deletedProject })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async getProjectById(req: Request, res: Response) {
        const { project_id } = req.params
        try {
            const project = await Project.findById(project_id).populate('owner')
            if (!project) return res.status(404).json({ message: 'Project not found' })
            return res.status(200).json(project)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async getProjects(req: Request, res: Response) {
        try {
            const projects = await Project.find().populate('owner')
            if (!projects) return res.status(404).json({ message: 'No projects found' })
            return res.status(200).json(projects)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async addCoauthor(req: Request, res: Response) {
        const projectOwnerId = req.userId
        const { project_id, user_id } = req.params
        try {
            const belongsToOwner = await Project.findById(project_id)            
            if (!belongsToOwner) return res.status(404).json({ message: 'Project not found' })            
            if (String(belongsToOwner?.owner) !== projectOwnerId) return res.status(403).json({ message: 'Operation not allowed' })

            let project = belongsToOwner
            if (project.coAuthors?.includes(user_id)) return res.status(400).json({ 
                message: 'User already is a coauthor of the project'
            })

            project.coAuthors?.push(user_id)
            await project.save()
            
            return res.status(200).json(project)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async removeCoauthor(req: Request, res: Response) {
        const projectOwnerId = req.userId
        const { project_id, user_id } = req.params
        try {
            const belongsToOwner = await Project.findById(project_id)            
            if (!belongsToOwner) return res.status(404).json({ message: 'Project not found' })            
            if (String(belongsToOwner?.owner) !== projectOwnerId) return res.status(403).json({ message: 'Operation not allowed' })
        
            let project = belongsToOwner
            if (!project.coAuthors?.includes(user_id)) return res.status(400).json({ 
                message: 'User is not a coauthor of the project'
            })
            // @ts-ignore -- typescript does not recognize mongooses's pull method
            project.coAuthors?.pull(user_id)
            await project.save()

            return res.status(200).json(project)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async addClient(req: Request, res: Response) {
        const projectOwnerId = req.userId
        const { project_id, user_id } = req.params
        try {
            const belongsToOwner = await Project.findById(project_id)            
            if (!belongsToOwner) return res.status(404).json({ 
                message: 'Project not found' 
            })            
            if (String(belongsToOwner?.owner) !== projectOwnerId) return res.status(403).json({ 
                message: 'Operation not allowed' 
            })

            let project = belongsToOwner
            if (project.clients?.includes(user_id)) return res.status(400).json({ 
                message: 'User already is a client of the project'
            })

            project.clients?.push(user_id)
            await project.save()

            return res.status(200).json(project)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async removeClient(req: Request, res: Response) {
        const projectOwnerId = req.userId
        const { project_id, user_id } = req.params
        try {
            const belongsToOwner = await Project.findById(project_id)            
            if (!belongsToOwner) return res.status(404).json({ message: 'Project not found' })            
            if (String(belongsToOwner?.owner) !== projectOwnerId) return res.status(403).json({ message: 'Operation not allowed' })
        
            let project = belongsToOwner
            if (!project.clients?.includes(user_id)) return res.status(400).json({ 
                message: 'User is not a client of the project'
            })
            // @ts-ignore -- typescript does not recognize mongooses's pull method
            project.clients?.pull(user_id)
            await project.save()

            return res.status(200).json(project)
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}

export default ProjectController