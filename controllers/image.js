const Clarifai = require('clarifai');
const res = require('express/lib/response');

// console.log('Clarifai', Clarifai);
const app = new Clarifai.App({
    apiKey: '66feb1d09b85417cbd5ddaca5d558e47'
  });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Unable to work with API"));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json("Unable to get entries"));

    // let found = false;
    // database.users.forEach(user => {
    //     if(user.id === id) {
    //         found = true;
    //         user.entries++;
    //         res.json(user.entries);
    //     }
    // });
    // if (!found) {
    //     res.status(404).json('no such user');
    // }
}

module.exports = {
    handleImage,
    handleApiCall
}