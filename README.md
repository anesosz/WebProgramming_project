# EPFBOOK

EPFBOOK is a simple web application built with Node.js and Express.js that allows users to perform basic CRUD (Create, Read, Update, Delete) operations on a collection of students.

## Installation

To run EPFBOOK locally on your machine, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:

   ```bash
   cd <epfbook>

3. Install dependencies using npm:

   ```bash
   npm install

4. To start the EPFBOOK application, run the following command:

   ```bash
   npm run dev

This command will start the server and launch the application. You can then access the application in your web browser at http://localhost:3000.

## Building and Running with Docker

To build and run EPFBOOK using Docker, follow these steps:

1. Make sure you have Docker installed on your machine.
   Open Docker


2. Go to the root directory of the project and build the Docker image using the provided Dockerfile:

   ```bash
   docker build -t epfbook-app .

3. Once the build is complete, you can run the Docker container:
   ```bash
   docker run -p 3000:3000 epfbook-app

This command will start the EPFBOOK application inside a Docker container, and you can access it in your web browser at http://localhost:3000.

## Rick and Morty Character

The character with ID 5 in the Rick and Morty API is **"Jerry Smith"**. 

To find this information, we made a request to the API endpoint `/api/character/5`, which returned details about the character with ID 5.