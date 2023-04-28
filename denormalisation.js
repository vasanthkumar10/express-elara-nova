const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("connected to mongodb...."))
  .catch((err) => console.log("Error while connecting mongodb", err));

const teacherSchema = new mongoose.Schema({
  name: String,
  gender: String,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

const subjectSchema = new mongoose.Schema({
  name: String,
  teacher: teacherSchema,
});

const Subject = mongoose.model("Subject", subjectSchema);

// create Subject
async function createSubject(name, teacher) {
  const subject = new Subject({
    name,
    teacher,
  });

  const newSubject = await subject.save();
  console.log(newSubject);
}

const vasanthTeacher = new Teacher({
  name: "vasanth",
  gender: "male",
});

// createSubject("Mechanical", vasanthTeacher);

// getSubjects
async function getSubjects() {
  const subjects = await Subject.find();
  console.log(subjects);
}

// getSubjects();

// update subject
async function updateSubject(newName, id) {
  const subject = await Subject.findById(id);
  subject.name = newName;
  await subject.save();
}

// updateSubject("Mech engineering", "644bf3f7152ccb15388a4466");
