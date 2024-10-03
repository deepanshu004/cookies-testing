const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  // Set a cookie named 'username' with value 'JohnDoe', expires in 1 day
  res.cookie('username', 'JohnDoe', { maxAge: 24 * 60 * 60 * 1000 }); // 1 day
  res.cookie('sessionId', 'abc123', { httpOnly: true, secure: false, sameSite: 'Lax' });
  res.send('Cookies have been set');
});

// Route to read cookies
app.get('/get-cookies', (req, res) => {
  const cookies = req.cookies; // Access cookies sent by the browser
  res.json(cookies);
});

// Route to delete a cookie
app.get('/delete-cookie', (req, res) => {
  res.clearCookie('username'); // Clear the 'username' cookie
  res.send('Cookie has been deleted');
});

// Route to display a simple homepage
app.get('/', (req, res) => {
  res.send(`
    <h1>Cookie Demo</h1>
    <ul>
      <li><a href="/set-cookie">Set Cookie</a></li>
      <li><a href="/get-cookies">Get Cookies</a></li>
      <li><a href="/delete-cookie">Delete Cookie</a></li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
