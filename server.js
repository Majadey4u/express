const express = require('express');
const app = express();
const PORT = 6000;

// Middleware to check if the request is within working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 for Sunday, 1 for Monday, and so on...
    const hourOfDay = now.getHours();

    // Check if it's a weekday and between 9 AM and 5 PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next();
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Apply middleware globally
app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
