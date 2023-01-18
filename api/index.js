let express = require('express');
let app = express();
const path = require("path");
let bodyParser = require('body-parser');
const cors = require('cors');
let mongoose = require('mongoose');
let multer = require('multer');
require('dotenv/config');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static("../build"));
const csvController  = require("./csvController");

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
			cb(null, './uploads')
	},
	filename: (req, file, cb) => {
			cb(null, file.originalname);
	},
});

const upload = multer({ storage: fileStorageEngine });

app.post('/upload', upload.single('file'), csvController.fileupload);

mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('Connected to database!')
});


app.listen('3000' || process.env.PORT, err => {
    if (err)
        throw err
    console.log('Server started!')
});