const express = require('express');
const projectModel = require('../data/helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
    projectModel.get()
        .then(projects => res.json(projects))
        .catch(err =>
            res.status(500)
            .json({error: "The action coould not be retrieved."}))
})

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


module.exports = router;