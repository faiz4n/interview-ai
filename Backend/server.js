require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 3000;
const connectToDB = require("./src/config/database");

connectToDB();

const server = app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
