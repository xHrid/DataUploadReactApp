const fs = require("fs");
require('dotenv/config');
const { MongoClient,ObjectId } = require("mongodb");
const csv = require("csv-parser")
const client = new MongoClient(process.env.MONGO_URI);
const model = client.db("model");
const collection = model.collection("properties");

const rows = []
async function updateProperty(id,sequenceNumber){
	let res = await collection.updateOne({ _id : ObjectId(id)}, {
		$set : { "sequenceNumber" : sequenceNumber}
	});
}

async function test(filename)
{ 

    fs.createReadStream(`./uploads/${filename}`).pipe(csv()).on("data",async function (row) {
        rows.push(row)
    }).on("end", async function () {
        for (let i= 0; i < rows.length ; i++) {
            await updateProperty(rows[i]._id, rows[i].sequenceNo);
        }
        process.exit()
    }).on("error", (error) => console.error(error))
}

exports.fileupload = function(req, res){
	test(req.file.filename);
	res.json({ "success"  :"data updated"})
}