import mongoose from "mongoose";
import Job from "../model/Jobs.js";
import { APPLICANT, RECRUITER } from "../constant/role.js";

// create jobs
export const createJobController = async (req, res, next) => {
  try {
    const { company, position } = req.body;
    // if (!company || !position) {
    //   res.status(400).send({
    //     msg: "plese provide required field",
    //   });
    // }
    req.body.created_by = req.user.userId;
    const job = await Job.create(req.body);
    res.send({ job });
  } catch (err) {
    next(err);
    // res.status(400).send(err);
  }
};

// get jobs
export const getJobController = async (req, res, next) => {
  try {
    const { status, workType, search, sort } = req.query;
    const queryObject = {
      created_by: req.user /*.userId*/,
    };
    if (status && status !== "all") {
      queryObject.status = status;
    }
    if (workType && workType !== "all") {
      queryObject.workType = workType;
    }

    let queryResult = Job.find();

    //sorting
    if (sort === "latest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "a-z") {
      queryResult = queryResult.sort("position");
    }
    // Add search functionality
    if (search) {
      const searchRegex = new RegExp(search, "i");
      queryResult = queryResult.or([
        { position: { $regex: searchRegex } },
        { company: { $regex: searchRegex } },
        // Add other fields you want to search here
      ]);
    }
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const skip = (page - 1) * limit;
    queryResult = queryResult.skip(skip).limit(limit);
    //jobs count
    const totalJobs = await Job.countDocuments();
    const numberOfPage = Math.ceil(totalJobs / limit);
    const jobs = await queryResult;

    // const jobs = await Job.find();
    res.send({
      totalJobs,
      jobsPerPage: jobs.length,
      numberOfPage,
      currentPage: page,
      jobs,
    });
  } catch (err) {
    res.status(400).send({
      msg: err.message,
    });
  }
};

// get single job
export const getSingleJobController = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.send(job);
  } catch (err) {
    // console.log(err);
    res.status(400).send(err);
  }
};
// get job by user
export const getJobByUser = async (req, res, next) => {
  try {
    const queryObject = {
      created_by: req.user.userId,
    };
    let queryResult = Job.find(queryObject);
    const jobs = await queryResult;
    res.send(jobs);
  } catch (err) {
    res.send(err);
  }
};

// update job
export const updateJobController = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const updateData = req.body;
    const job = await Job.findByIdAndUpdate(id, updateData, { new: true });
    if (!job) {
      return res.stauts(404).send({ msg: "job not found" });
    }
    res.send(job);
  } catch (err) {
    res.status(400).send({
      msg: err.message,
    });
  }
};

// delete job
export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    //find job on the basis of id
    const job = await Job.findByIdAndRemove({ _id: id });
    //validation
    if (!job) {
      res.status(400).send("no job found whit this id");
    }
    res.send({
      message: "Job is deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

//job stats and filter
export const jobStatsController = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $match: {
          created_by: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: `$company`,
          count: { $sum: 1 },
        },
      },
    ]);
    // default stats
    const defaultStats = {
      pending: stats.pending || 0,
      reject: stats.reject || 0,
      interview: stats.interview || 0,
    };
    // monthly yearly state
    let monthlyAppliction = await Job.aggregate([
      {
        $match: {
          created_by: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: `$createdAt` },
            month: { $month: `$createdAt` },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.send({
      totalJobs: stats.length,
      stats,
      defaultStats,
      monthlyAppliction,
    });
  } catch (err) {
    res.status(400).send(err);

  }
};

