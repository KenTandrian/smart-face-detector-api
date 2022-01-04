const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            console.log(user);
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Not found');
            }
            
        })
        .catch(err => res.status(400).json('Error getting user'));
    
    // database.users.forEach(user => {
    //     if(user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // });
    // if (!found) {
    //     res.status(404).json('no such user');
    // }
}

module.exports = {
    handleProfileGet
}