import express from 'express';

// initializing
const app = express();
const PORT = process.env.PORT || 3000;

// Test route
app.get('/', (req, res) => {
    res.send('Server Started!');
});

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error starting the server: ${err}`);
        return;
    }
    console.log(`Server is running on port ${PORT}`);
});
