const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("connected to mongodb...."))
  .catch((err) => console.log("Error while connecting mongodb", err));

// schema -> model
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: String,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

const subjectSchema = new mongoose.Schema({
  name: String,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

// create teacher
async function createTeacher(name, gender) {
  const teacher = new Teacher({
    name,
    gender,
  });

  const newTeacher = await teacher.save();
  console.log(newTeacher);
}

// createTeacher("Ramanujam", "male");

// create subject
async function createSubject(name, teacherId) {
  const subject = new Subject({
    name,
    teacherId,
  });

  const newSubject = await subject.save();
  console.log(newSubject);
}

// createSubject("Math", "644bee8b255ea13b55063bbd");

// get subjects
async function getSubjects() {
  const subjects = await Subject.find()
    .populate("teacherId", "name -_id")
    // .populate("class", "studentCount") // for reference
    .select("name");
  console.log(subjects);
}

getSubjects();
