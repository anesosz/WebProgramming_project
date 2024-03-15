const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");

//1 Define endpoint for /
app.get('/', (req, res) => {
	res.send("Hello World, welcome to my EPFBook application!")
});

//2 Define endpoint for /student
app.get("/students", (req, res) => {
	// Sending the array of student information
	res.send([
		{ name: "MOHAMOUD Anes", school: "EPF" },
		{ name: "Me", school: "Victor Hugo"},
		{ name: "Interstelar", school: "Jean Perrin" },
	]);
});


//3 Define endpoint for /student-csv
app.get("/students-csv", (req, res) => {
	// Read the CSV file
	fs.readFile("./students.csv", "utf8", (err, data) => {
	  res.send(data);
	});
});

//4 This is an advanced version that parses the CSV content
app.get("/students-csv-parsed", (req, res) => {
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
app.post("/students/create", (req, res) => {
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

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
});
