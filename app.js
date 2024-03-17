const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");

// TP2

//1 Define endpoint for /api
app.get("/api", (req, res) => {
	res.send("Hello World, welcome to my EPFBook application!")
});

//2 Define endpoint for /api/student
app.get("/api/students", (req, res) => {
	// Sending the array of student information
	res.send([
		{ name: "MOHAMOUD Anes", school: "EPF" },
		{ name: "Me", school: "Victor Hugo"},
		{ name: "Interstelar", school: "Jean Perrin" },
	]);
});


//3 Define endpoint for /api/student-csv
app.get("/api/students-csv", (req, res) => {
	// Read the CSV file
	fs.readFile("./students.csv", "utf8", (err, data) => {
	  res.send(data);
	});
});

//4 This is an advanced version that parses the CSV content
app.get("/api/students-csv-parsed", (req, res) => {
	const rowSeparator = "\n";
	const cellSeparator = ",";
	// Read the CSV file
	fs.readFile("./students.csv", "utf8", (err, data) => {
	 const rows = data.split(rowSeparator);
	 // Isolating the first header row
	 const [headerRow, ...contentRows] = rows;
	 const header = headerRow.split(cellSeparator);

		const students = contentRows.map((row) => {
			const cells = row.split(cellSeparator);
			const student = {
				[header[0]]: cells[0],
				[header[1]]: cells[1],
	  		};
	 		return student;
	 	});
	 	res.send(students)	        
	});
});


app.use(express.json());
app.post("/api/students/create", (req, res) => {
	console.log(req.body);
	const csvLine = `\n${req.body.name},${req.body.school}`;
	console.log(csvLine);
	const stream = fs.writeFile(
		"./student.csv",
		csvLine,
		{ flag: "a" },
		(err) => {
			res.send("ok");
		}
	);
});


//TP3

const path = require("path")

// Define endpoint for the home page
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname,"./views/home.html"))
});

app.set('views', './views'); 
app.set('view engine', 'ejs');

// Define endpoint for /students
app.get("/students", (req, res) => {
	// Read the CSV file
	fs.readFile("./students.csv", "utf8", (err, data) => {
		res.render("students", { data });
	});
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
});
