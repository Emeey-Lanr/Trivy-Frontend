const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()

app.use(cors())

app.use(express.json())

const date = new Date()
const days = ["Sunday","Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday" ]


app.get("/api", async (req, res) => {
    try {
        res.status(200).json({
          slack_name: req.query.slack_name,
          current_day:  days[date.getDay()],
          utc_time: date.toISOString(),
          track: req.query.track,
          github_file_url:"https://github.com/username/repo/blob/main/file_name.ext",
          github_repo_url: "https://github.com/username/repo",
          status_code: 200,
        });
    } catch (error) {
        res.status(400).json({message:"an error occured", status:400})
    }
   
})


app.listen(process.env.PORT, () => {
    console.log("App has started")
})