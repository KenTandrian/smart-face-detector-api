const handleRegister = (db, bcrypt) => (req, res) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
        // use return so that below will not be executed
    }
    const hash = bcrypt.hashSync(password);

    // Use transaction to make sure that both queries are done.
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json('Unable to register'));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    // database.users.push({
    //     id: '125',
    //     name: name,
    //     email: email,
    //     entries: 0,
    //     joined: new Date()
    // });
    //res.json(database.users[database.users.length-1]); // always remember to respond
};

module.exports = {
    handleRegister: handleRegister
}