const express = require('express');
const cors = require('cors');
const route = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit : "5mb",
    extended : true
}))
app.use(cookieParser())
app.use(cors());

route(app)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});