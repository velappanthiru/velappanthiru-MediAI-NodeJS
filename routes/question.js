const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const { createQuestions, getExam, getActiveExams } = require("../controllers/questionController");

router.route("/generate-questions").post(authenticateToken, authorizeRole(1), createQuestions);
router.route('/question/:id').get(authenticateToken, getExam);
router.route('/exams').get(authenticateToken, getActiveExams);


module.exports = router;
