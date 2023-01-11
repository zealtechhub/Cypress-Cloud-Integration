const http = require("node:http");
require("dotenv").config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const server = http.createServer((req, res) => {
  console.log("called from server");
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  req.on("data", async (data) => {
    data = JSON.parse(data);
    try {
      const message = await client.messages.create({
        body: "Hi there",
        from: "+17262079795",
        to: "+2349017241037",
      });

      console.log({ message });
      res.end(JSON.stringify({ message, success: true }));
    } catch (error) {
      console.error(error);
      res.end(JSON.stringify({ success: false }));
    }
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on http://localhost:8000");
});
