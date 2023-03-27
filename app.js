const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const email = req.body.mail;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/6a36776439";
  const options = {
    method: "POST",
    auth: "pavan:aa68097e2f80c095d85984a9732256f0-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(3000 || process.env.PORT, function () {
  console.log("server is running at port 3000");
});

//API KEY
//aa68097e2f80c095d85984a9732256f0-us21

//Audience ID
//6a36776439
