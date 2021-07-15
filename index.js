const express = require("express")
var bodyParser = require('body-parser')
const getJobPosts = require("./getJobPosts");


const app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//serve public files in public folder
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.get("/jobs", async (req, res) => {
    const jobPosts = await getJobPosts();
    res.json(jobPosts);
})

app.post('/jobPost', urlencodedParser, async function (req, res) {
    const jobPosts = await getJobPosts(req.body.JKeyword, req.body.JLocation);
    res.json(jobPosts);
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});