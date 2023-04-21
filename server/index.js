const express  =  require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');

const Connection = require('./database/db.js');
const todoRoutes = require('./routes/todoRouter.js');
const userRouter = require("./routes/userRouter.js")

const app = express();


app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', todoRoutes);
app.use('/', userRouter);

const PORT = 8000;

Connection();

app.listen(PORT, () => console.log(`Your server is running successfully on PORT ${PORT}`));