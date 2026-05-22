require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT;
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
