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

//1 Define endpoint for the home page
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname,"./views/home.html"))
});

app.set('views', './views'); 
app.set('view engine', 'ejs');

// Define a function to read students from CSV file
function getStudentsFromCsvfile(callback) {
    fs.readFile("./students.csv", "utf8", (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        // Split CSV data into rows
        const rows = data.trim().split('\n');

        // Parse each row into a student object, skipping the header row
        const students = rows.slice(1).map(row => {
            const [name, school] = row.split(','); // Split each row into name and school
            return { name: name.trim(), school: school.trim() }; // Trim whitespace from name and school
        });

        callback(null, students);
    });
};



//2 Define endpoint for /students
app.get("/students", (req, res) => {
	// Read the CSV file
	getStudentsFromCsvfile((err, students) => {
		if (err) {
			console.error(err);
			res.send("ERROR");
		}
		res.render("students", { students });
		});
});

// Middleware to parse urlencoded form data
app.use(express.urlencoded({ extended: true }));


//3 Define GET endpoint to render create-student view
app.get("/students/create", (req, res) => {
    // Check if a query parameter 'created' is present
    const created = req.query.created === '1';

    res.render("create-student", { created });
});



//4 Define POST endpoint to handle form submission and redirect to the form
app.post("/students/create", (req, res) => {
    const name = req.body.name;
    const school = req.body.school;

    // Call the function to write student data to the CSV file
    writeToCsv(name, school, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            // Redirect to the GET endpoint for displaying the form
            res.redirect("/students/create?created=1");
        }
    });
});

// Reuse code from /api/students/create in the /api/students/create endpoint
app.post("/api/students/create", (req, res) => {
    const name = req.body.name;
    const school = req.body.school;

    // Call the function to write student data to the CSV file
    writeToCsv(name, school, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("ok");
        }
    });
});

// Define a function to write student data to the CSV file
function writeToCsv(name, school, callback) {
    const csvLine = `\n${name},${school}`;
    fs.writeFile(
        "./students.csv",
        csvLine,
        { flag: "a" },
        (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        }
    );
}

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});
