const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const cors = require('cors');

const app = express();

app.use(cors());

connectDB();

app.use(bodyParser.json());

app.use('/usuarios', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API inicializada na porta - ${PORT}`);
});
