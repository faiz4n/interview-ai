const mongoose = require("mongoose");
const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");
/**
 * @name generateInterviewReportController
 * @description Controller to generate interview report based on user resume, self description and job description
 * @access Private
 */
async function generateInterviewReportController(req, res) {
  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  console.log(interviewReport);

  return res
    .status(201)
    .json({ msg: "Interview report generated successfully", interviewReport });
}

/**
 * @name getInterviewReportByIdController
 * @description Controller to get interview report by interview id
 * @access Private
 */
async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: new mongoose.Types.ObjectId(interviewId),
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({ msg: "Interview report not found" });
  }

  return res
    .status(200)
    .json({ msg: "Interview report fetched successfully", interviewReport });
}

/**
 * @name getAllInterviewReportsController
 * @description Controller to get all interview reports of the user
 * @access Private
 */
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel
    .find({
      user: req.user.id,
    })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  return res
    .status(200)
    .json({ msg: "Interview reports fetched successfully", interviewReports });
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
};
