const express = require("express");
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "football",
})
.then(() => {
    console.log("Connected to database");
})
.catch((e) => {
    console.log(e);
});

// Define a schema for your data
const messageSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Create a model from the schema
const Message = mongoose.model('Message', messageSchema);

// Example route to save data to the database
app.get('/add-message', async (req, res) => {
    try {
        // Create a new message instance
        const newMessage = new Message({
            name: 'John Doe',
            email: 'john@example.com'
        });
        // Save the message to the database
        await newMessage.save();
        res.send('Message saved successfully');
    } catch (error) {
        res.status(500).send('Error saving message: ' + error.message);
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
