import express from 'express';


const app = express();
app.use(express.json());
const PORT = 3000;


app.get('/api/users/currentuser', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => console.log(`APP is running on port ${PORT}`));