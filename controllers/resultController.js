const db = require('../config/db');

exports.submitResult = (req, res) => {
    if (req.user.role !== 'student') return res.sendStatus(403);
    const { exam_id, score } = req.body;
    db.query('INSERT INTO results (user_id, exam_id, score) VALUES (?, ?, ?)', [req.user.id, exam_id, score], (err) => {
        if (err) throw err;
        res.sendStatus(201);
    });
};

exports.getResults = (req, res) => {
    db.query('SELECT * FROM results WHERE user_id = ?', [req.user.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};
