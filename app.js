const express = require("express")
const Controller = require("./scrapperController")
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/scraping", Controller)

app.listen(port, () => {
  console.log("is running");
})