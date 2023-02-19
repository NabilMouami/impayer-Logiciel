const express = require('express');

const cors = require("cors");


require('./database/dbConnect')();
const app = express();

app.use(express.json());
app.use(cors("*"));
//Routes

const clientRoute = require("./routes/clientRoute");
app.use("/client", clientRoute.router);

const saisieRoute = require("./routes/saisieRoute");
app.use("/saisie", saisieRoute.router);

const joinRoute = require("./routes/joinRoute");
app.use("/join", joinRoute.router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});