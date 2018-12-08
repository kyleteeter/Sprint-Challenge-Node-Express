const express = require('express');
const actionModel = require('../data/helpers/actionModel')

const router = express.Router();

router.get('/', (req, res) => {
    actionModel.get()
        .then(actions => res.json(actions))
        .catch(err =>
            res.status(500)
            .json({error: "The action coould not be retrieved."}))
})

router.get('/:id', (req, res) => {
    const {id} = req.params

    actionModel.get(id)
        .then((action) => {
            if (action) {
                res.json(action);
            }else {
                res.status(400)
                .json({message: `The action with ID of ${id} does not exist.`})
            }
            res.json(action)
        })
        .catch(err =>
            res.status(500)
            .json({error: "The action info could not be retrieved."})
        )
})

router.post('/', (req, res) => {
    const action = req.body;

    if (action.project_id && action.description && action.notes) {
        actionModel.insert(action).then(actionID => {
            actionModel.get(actionID.id).then(action => {
                res.status(201).json(action);
            })
        }) .catch(err => {
            res.status(500)
            .json({error: `Error occured when saving ${action} to the database`})
        })
    } else {
        res.status(400).json({error: "Please provide project ID and description."})
    }
})

module.exports = router;