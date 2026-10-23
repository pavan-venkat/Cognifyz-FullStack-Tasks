const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Temporary in-memory storage (data resets when server restarts)
const messages = [];
const registrations = [];
const students = [];
let nextStudentId = 1;

app.get("/", (req, res) => {
  res.render("home");
});

// TASK 1: Basic form submission and server-side rendered response
app.get("/task1", (req, res) => {
  res.render("task1", { result: null });
});

app.post("/task1", (req, res) => {
  const name = String(req.body.name || "").trim();
  const message = String(req.body.message || "").trim();

  if (!name || !message) {
    return res.status(400).render("task1", {
      result: { type: "error", text: "Please fill in both fields." }
    });
  }

  messages.push({ name, message, createdAt: new Date().toLocaleString() });
  res.render("task1", {
    result: { type: "success", text: `Thank you, ${name}! Your message was received by the server.` }
  });
});

// TASK 2: Client + server validation and temporary storage
app.get("/task2", (req, res) => {
  res.render("task2", { result: null });
});

app.post("/task2", (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const age = Number(req.body.age);
  const password = String(req.body.password || "");

  const errors = [];
  if (name.length < 2) errors.push("Name must contain at least 2 characters.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");
  if (!Number.isInteger(age) || age < 18 || age > 100) errors.push("Age must be between 18 and 100.");
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.push("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
  }

  if (errors.length) {
    return res.status(400).render("task2", {
      result: { type: "error", text: errors.join(" ") }
    });
  }

  registrations.push({ name, email, age, createdAt: new Date().toLocaleString() });
  res.render("task2", {
    result: { type: "success", text: `Registration validated and stored temporarily for ${name}.` }
  });
});

// TASK 3: Responsive design page
app.get("/task3", (req, res) => res.render("task3"));

// TASK 4: Dynamic password validation and DOM updates
app.get("/task4", (req, res) => res.render("task4"));

// TASK 5: REST API CRUD
app.get("/task5", (req, res) => res.render("task5"));

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find(item => item.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found." });
  res.json(student);
});

app.post("/api/students", (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const phone = String(req.body.phone || "").trim();

  if (name.length < 2) return res.status(400).json({ error: "Name must contain at least 2 characters." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
  if (!/^\d{10}$/.test(phone)) return res.status(400).json({ error: "Phone number must contain exactly 10 digits." });
  if (students.some(item => item.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: "A student with this email already exists." });
  }

  const student = { id: nextStudentId++, name, email, phone };
  students.push(student);
  res.status(201).json({ message: "Student created successfully.", student });
});

app.put("/api/students/:id", (req, res) => {
  const student = students.find(item => item.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found." });

  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const phone = String(req.body.phone || "").trim();

  if (name.length < 2) return res.status(400).json({ error: "Name must contain at least 2 characters." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
  if (!/^\d{10}$/.test(phone)) return res.status(400).json({ error: "Phone number must contain exactly 10 digits." });
  if (students.some(item => item.id !== student.id && item.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: "Another student already uses this email." });
  }

  Object.assign(student, { name, email, phone });
  res.json({ message: "Student updated successfully.", student });
});

app.delete("/api/students/:id", (req, res) => {
  const index = students.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Student not found." });
  students.splice(index, 1);
  res.json({ message: "Student deleted successfully." });
});

app.listen(PORT, () => {
  console.log(`Cognifyz Tasks 1-5 server is running at http://localhost:${PORT}`);
});
