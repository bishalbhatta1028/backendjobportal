import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getJobByUser,
  getJobController,
  getSingleJobController,
  jobStatsController,
  //getSingleJobController,
  updateJobController,
} from "../controller/jobsController.js";

const router = express.Router();
/**
 /**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         company:
 *           type: string
 *           description: The name of the company offering the job.
 *         position:
 *           type: string
 *           description: The job position/title.
 *         location:
 *           type: string
 *           description: The location of the job.
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - reject
 *             - interview
 *           description: The status of the job (pending, reject, interview).
 *         workType:
 *           type: string
 *           enum:
 *             - full time
 *             - part time
 *             - contract
 *           description: The type of work (full time, part time, contract).
 */

/**
 * @swagger
 * /api/job/create-job:
 *   post:
 *     summary: Create a new job posting.
 *     tags:
 *       - Jobs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       '200':
 *         description: Job created successfully.
 *       '400':
 *         description: Invalid request data.
 *       '500':
 *         description: Internal server error.
 * /api/job/get-job:
 *   get:
 *     summary: Get a job by ID
 *     tags:
 *       - Jobs
 *     responses:
 *       '200':
 *         description: Job retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       '404':
 *         description: Job not found
 *
 * /api/job/update-job/{id}:
 *   put:
 *     summary: Update a job by ID
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       '200':
 *         description: Job updated successfully
 *       '400':
 *         description: Bad request, missing or invalid data
 *       '404':
 *         description: Job not found
 *
 * /api/job-delete/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to delete
 *     responses:
 *       '204':
 *         description: Job deleted successfully
 *       '404':
 *         description: Job not found
 *
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

//create jobs
router.post("/create-job", userAuth, createJobController);
// get jobs
router.get("/get-job/", getJobController);

//get jobs by user
router.get("/get-job/:id", userAuth, getJobByUser);

router.get("/get-singlejob/:id", /*userAuth,*/ getSingleJobController);
// update job
router.patch("/update-job/:id", userAuth, updateJobController);

//delete job
router.delete("/delete-job/:id", userAuth, deleteJobController);

// // job stats adn filter get
router.get("/job-stats", userAuth, jobStatsController);
export default router;
