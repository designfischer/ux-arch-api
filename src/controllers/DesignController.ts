import { Request, Response } from 'express'
import Design from '../models/Design'
import Project from '../models/Project'

const MIN_REFERENCES = 5
const MAX_REFERENCES = 10

const DesignController = {
    async createDesign(req: Request, res: Response) {

        const projectOwnerId = req.userId
        const { project_id } = req.params
        const bodyData: IDesignBody = req.body

        try {
            const hasProject = await Project.findById(project_id)            
            if (!hasProject) return res.status(404).json({ message: 'Project not found' })

            const belongsToOwner = validate.ownership(hasProject.owner, projectOwnerId)
            if (!belongsToOwner) return res.status(403).json({message: 'Operation not allowed'})

            if (bodyData.category === 'reference') {
                const references = await DesignRepository.findAllReferencesByProjectId(project_id)

                const maxRefsReached = validate.maxReferencesReached(references.length, MAX_REFERENCES)
                if (maxRefsReached) return res.status(400).json({ message: 'Max references reached' })                               
            }

            if (bodyData.category === 'proposal') {
                const references = await DesignRepository.findAllReferencesByProjectId(project_id)

                const minRefsReached = validate.minReferencesReached(references.length, MIN_REFERENCES)
                if (!minRefsReached) return res.status(400).json({ message: 'Not enough references' })                
            }

            const design = await Design.create({ ...bodyData, project: project_id })
            await design.populate('project').execPopulate()

            return res.status(201).json(design)

        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async removeDesign(req: Request, res: Response) {

        const projectOwnerId = req.userId
        const { project_id, design_id } = req.params

        try {
            const hasProject = await Project.findById(project_id)            
            if (!hasProject) return res.status(404).json({ message: 'Project not found' })

            const belongsToOwner = validate.ownership(hasProject.owner, projectOwnerId)
            if (!belongsToOwner) return res.status(403).json({message: 'Operation not allowed'})

            const deletedDesign = await Design.findByIdAndRemove(design_id)
            if (!deletedDesign) return res.status(404).json({ message: 'Design not found' })

            return res.status(200).json({ message: 'OK', deletedDesign })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async getDesignById(req: Request, res: Response) {
        try {} catch(err) {
            return res.status(500).json(err)
        }
    },
    async getAllReferences(req: Request, res: Response) {
        try {} catch(err) {
            return res.status(500).json(err)
        }
    },
    async getAllProposals(req: Request, res: Response) {
        try {} catch(err) {
            return res.status(500).json(err)
        }
    }
}

export default DesignController

const validate = {
    ownership(queryProjectId: any, bodyRequestProjectId: string): boolean {
        const queryId = String(queryProjectId)
        const bodyId = bodyRequestProjectId
        if (queryId !== bodyId) return false
        return true
    },
    maxReferencesReached(projectReferencesLength: number, maxReferences: number): boolean {
        if (projectReferencesLength >= maxReferences) return true
        return false
    },
    minReferencesReached(projectReferencesLength: number, minReferences: number): boolean {
        if (projectReferencesLength < minReferences) return false
        return true
    }
}

const DesignRepository = {
    async findAllReferencesByProjectId(projectId: string) {
        const references = await Design.find({ project: projectId }).where({ category: 'reference' })
        return references
    }
}