const express = require('express');
const connectDatabase = require('./config/db');
const dotenv = require('dotenv');
const categoriesRoutes = require('./routes/categories.routes');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

connectDatabase();
app.use(express.json());
app.use('/categories', categoriesRoutes);

app.get('/', (req, res) => {
    return res.json({
        message: 'App is running properly',
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
