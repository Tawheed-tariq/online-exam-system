const db = require('../config/db');

exports.createExam = (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const { name, questions } = req.body;
    db.query('INSERT INTO exams (name, questions, created_by) VALUES (?, ?, ?)', [name, JSON.stringify(questions), req.user.id], (err) => {
        if (err) throw err;
        res.sendStatus(201);
    });
};

exports.getExams = (req, res) => {
    db.query('SELECT * FROM exams', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};
