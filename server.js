require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const connectDb = require("./config/db");
const AccountRou = require("./routes/AccountsRou");
const PostsRou = require("./routes/PostsRou");
const DonationRou = require("./routes/DonationRou");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 6000;
const app = express();
const server = require("http").createServer(app);
const { initSocket } = require("./socket");

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// route
app.use("/sachub/api", AccountRou);
app.use("/sachub/api/posts", PostsRou);
app.use("/sachub/api/donation", DonationRou);
app.use('/sachub/api/donation/webhook', express.raw({ type: 'application/json' }));

initSocket(server);
// mongoDB
connectDb();


//  server setup
server.listen(port, () => {
  console.log(`server running on ${port}`);
});
