
// Install the Node ScrapingBee library
// npm install scrapingbee
require("dotenv").config()
const { APIKEY_SCRAPPINGBEE, ACCOUNTSID_TWILIO, AUTHTOKEN_TWILIO } = process.env
const client = require('twilio')(ACCOUNTSID_TWILIO, AUTHTOKEN_TWILIO);
const scrapingbee = require('scrapingbee');

async function get(url, params) {
  try {
    let client = new scrapingbee.ScrapingBeeClient(APIKEY_SCRAPPINGBEE);
    let response = await client.get({
      url,
      params
    })
    let decoder = new TextDecoder();

    let text = decoder.decode(response.data);
    console.log(text);
    let result = JSON.parse(text).all_links.filter(el => {
      if (el.title && el.anchor && el.time && el.img && el.href) {
        return el
      }
    })
    return result
  } catch (error) {
    console.log(error);
  }
}


get("https://www.volunteerworld.com/en/filter?f%5BcC%5D=360", {
  "extract_rules": {
    "all_links": {
      "selector": "paper-card",
      "type": "list",
      "output": {
        "anchor": {
          "selector": "a",
          "output": "@title"
        },
        "title": {
          "selector": "a",
          "output": "@title"
        },
        "time": "div.requirement-value",
        "img": {
          "selector": "div > a > img",
          "output": "@src"
        },
        "href": {
          "selector": "a",
          "output": "@href"
        }
      }
    }
  }
}).then(data => {
  console.log(data);
})


class Controller {
  static scraping(req, res) {
    let request = require("./sourceScrapping.json").map(el => get(el.link, el.params))
    Promise.all(request)
      .then(data => {
        let result = [].concat(...data)
        console.log(result)
        console.log(result.length)
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Internal server error"
        })

      })
  }
  static sms() {


    client.messages
      .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+6281294638809',
        to: '+6281238888246'
      })
      .then(message => console.log(message.sid));
  }
}

// Controller.sms()


module.exports = Controller