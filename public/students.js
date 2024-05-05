
document.addEventListener("DOMContentLoaded", function (event) {
    // Select the test button
    const testButton = document.querySelector('#test');
  
    // Add event listener for click event
    testButton.addEventListener('click', function() {
      // Alert when clicked
      alert("CLICKED!");
    });
  
    // Add a link to /students/create
    const createLink = document.createElement('a');
    createLink.setAttribute('href', '/students/create');
    createLink.textContent = 'Create Student';
    document.body.appendChild(createLink); // Append the link to the body, adjust as needed
  });
  