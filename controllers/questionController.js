const catchAsync = require('../middleware/catchAsync');
const { sequelize, Exam, Question, Option } = require('../models');
const { Op } = require('sequelize');

const createQuestions = catchAsync(async (req, res, next) => {
  console.log("📥 Incoming Request Body:", req.body);

  const t = await sequelize.transaction();

  try {
    const { exam_name, book_name, date, duration, total_questions, marks_per_question, total_marks, questions } = req.body;

    // Create Exam record
    const exam = await Exam.create(
      {
        exam_name,
        book_name,
        date,
        duration,
        total_questions,
        marks_per_question,
        total_marks,
      },
      { transaction: t }
    );

    // Loop through each question
    for (const questionData of questions) {

      // Create Question
      const questionRecord = await Question.create(
        {
          exam_id: exam.id,
          question_text: questionData?.question,
          ai_option: questionData?.explanation || null,
        },
        { transaction: t }
      );

      // Create Options for the Question
      for (const optionData of questionData?.options) {
        await Option.create(
          {
            text: optionData.text,
            is_correct: optionData.correct,
            question_id: questionRecord.id,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    res.status(201).json({ message: '✅ Exam and Questions created successfully', exam });
  } catch (error) {
    await t.rollback();
    console.error("❌ Error while creating exam:", error);
    res.status(500).json({ error: error.message });
  }
});

const getExam = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findOne({
      where: { id },
      include: [
        {
          model: Question,
          as: 'questions', // alias used in Exam.hasMany
          include: [
            {
              model: Option,
              as: 'options', // alias used in Question.hasMany
            },
          ],
        },
      ],
    });

    if (!exam) {
      return res.status(404).json({
        status: 'error',
        message: 'Exam not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: '✅ Exam retrieved successfully',
      data: exam,
    });
  } catch (error) {
    console.error("❌ Error in getExam:", error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching the exam',
      error: error.message,
    });
  }
});



const getActiveExams = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    const activeExams = await Exam.findAll({
      where: {
        date: {
          [Op.gte]: today, // exams today or in the future
        },
      },
      order: [['date', 'ASC']],
    });

    res.status(200).json({ exams: activeExams });
  } catch (error) {
    console.error("❌ Error fetching active exams:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createQuestions,
  getExam,
  getActiveExams
};
