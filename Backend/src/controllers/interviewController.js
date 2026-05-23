const mongoose = require("mongoose");
const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
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

module.exports = { generateInterviewReportController };
