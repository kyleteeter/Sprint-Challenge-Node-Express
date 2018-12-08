const express = require('express');
const projectModel = require('../data/helpers/projectModel')

const router = express.Router();

// Get
router.get('/', (req, res) => {
    projectModel.get()
        .then(projects => res.json(projects))
        .catch(err =>
            res.status(500)
            .json({error: "The action coould not be retrieved."}))
})

// Get ID
router.get('/:id', (req, res) => {
    const {id} = req.params
    projectModel.get()
        .then((project) => {
            if (project) {
                res.json(project)
            } else {
                res.status(400)
                .json({message: `The project with ID of ${id} does not exist.`})
            }
            res.json(project)
        })
        .catch(err => 
            res.status(500)
            .json({error: "The project info could not be found."}))

})

// Post
router.post('/', (req, res) => {
    const project = req.body;

    if (project.name && project.description) {
        projectModel.insert(project).then(projectID => {
            projectModel.get(projectID.id).then(project => {
                res.status(201).json(project);
            })
        }) .catch(err => {
            res.status(500)
            .json({error: `Error occured when saving ${project} to the database`})
        })
    } else {
        res.status(400).json({error: "Please provide name and description."})
    }
})

// Delete 
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    projectModel.remove(id).then(count => {
        if (count) {
            res.json({message: "Successfully Delete Action"})
        } else {
            res.status(404) 
            .json({message: `The action with the id of ${id} does not exist.`})
        }
    })
    .catch(err => {
        res.status(500)
        .json({error: "The action could not be removed."})
    })
})

// Update
router.put('/:id', (req, res) => {
    const project = req.body
    const {id} = req.params

    if (project){
        projectModel.update(id, project)
        .then(count => {
            if (count) {
                projectModel.get(id).then(project => {
                    res.json(project)
                })
            }else {
                res.status(400).json({error: `The project ${id} doesn't exist.`})
            }
        })
        .catch(err => {
            res.status(500)
            .json({error: "The project could not be modified."})
        })
    }else {
        res.status(400).json({error: "Please provide new info."})
    }
})


module.exports = router;