const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.query(`
        INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
        [username, hashedPassword, role], 
        (err) => {
            if (err) throw err;
            res.sendStatus(201);
        }
    );
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query(`
        SELECT * FROM users WHERE username = ?`,
        [username], 
        (err, results) => {
            if (err) throw err;
            if (results.length && bcrypt.compareSync(password, results[0].password)) {
                const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.sendStatus(401);
            }
        }
    );
};
