const bcrypt = require('bcrypt'); // import bcrypt
const jwt = require('jsonwebtoken'); // import jsonwebtoken
const User = require('../models/user'); // import the User model, which is exported from user.js

exports.signup = (req, res, next) => { // call the post method, which adds a route to the router object, to handle POST requests to the /api/auth/signup endpoint
  bcrypt.hash(req.body.password, 10) // call the hash method, which returns a promise, which resolves to a hash of the password
    .then(hash => { // call the then method, which adds a callback function to the promise, to handle the success case
      const user = new User({ // create a new User object, using the User model
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, // set the email property of the User object to the email property of the request body
        password: hash, // set the password property of the User object to the hash of the password
        username: req.body.username
      }); // end of const user = new User({ ... })
      user.save() // call the save method, which saves the User object to the database
        .then(() => res.status(201).json({ message: 'User added successfully!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    }) // end of .then(hash => { ... })
    .catch(error => res.status(500).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}; // end of exports.signup = (req, res, next) => { ... }

exports.login = (req, res, next) => { // call the post method, which adds a route to the router object, to handle POST requests to the /api/auth/login endpoint
  User.findOne({ email: req.body.email }) // call the findOne method, which returns a promise, which resolves to the User object with the specified email
    .then(user => { // call the then method, which adds a callback function to the promise, to handle the success case
      if (!user) { // if the user does not exist
        return res.status(401).json({ error: 'User not found!' }); // return a 401 Unauthorized error
      } // end of if (!user) { ... }
      bcrypt.compare(req.body.password, user.password) // call the compare method, which returns a promise, which resolves to a boolean indicating if the password matches the hash
        .then(valid => { // call the then method, which adds a callback function to the promise, to handle the success case
          if (!valid) { // if the password does not match the hash
            return res.status(401).json({ error: 'Incorrect password!' }); // return a 401 Unauthorized error
          } // end of if (!valid) { ... }
          const token = jwt.sign( // call the sign method, which returns a token
            { userId: user._id }, // set the userId property of the token to the _id property of the User object
            'RANDOM_TOKEN_SECRET', // set the secret key used to generate the token
            { expiresIn: '24h' } // set the expiration time of the token
          ); // end of const token = jwt.sign( ... )
          res.status(200).json({ // return a 200 OK status code and a JSON object
            userId: user._id, // set the userId property of the JSON object to the _id property of the User object
            token, // set the token property to the token generated by the sign method
            username: user.username
          }); // end of res.status(200).json({ ... })
        }) // end of .then(valid => { ... })
        .catch(error => res.status(500).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
    }) // end of .then(user => { ... })
    .catch(error => res.status(500).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}; // end of exports.login = (req, res, next) => { ... }
