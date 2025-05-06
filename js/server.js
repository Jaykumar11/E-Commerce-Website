const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Endpoint to handle registration
app.post('/register', (req, res) => {
    const user = req.body;

    // Read existing users
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading data.');
        }

        const users = data ? JSON.parse(data) : [];
        users.push(user);

        // Save updated users to file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving data.');
            }
            res.status(200).send('User registered successfully.');
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
