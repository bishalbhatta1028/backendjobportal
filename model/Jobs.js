import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true],
      minlength: 5,
    },
    position: {
      type: String,
      required: [true],
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    Type: {
      type: String,
      enum: ["full-time", "part-time", "intership", "contract"],
      default: "full-time",
    },
    Location: {
      type: String,
      required: [true, "Work location is required"],
      default: "Kathmandu",
    },
    jobDescription: {
      type: String,
      default: "job description here",
    },
    jobRequirement: {
      type: String,
      default: "job requirement here",
    },
    qualification: {
      type: String,
      default: "Bachelor",
    },
    experience: {
      type: String,
      default: " Minimum 2 years in related field",
    },
    salary: {
      type: String,
      default: "Negotiable",
    },
    vacancy: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
