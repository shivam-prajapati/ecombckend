const express = require("express");
const app = express();
const PORT = 5001;

app.get("/", (req, res) => {
  console.log("inside the first get");
  res.send({ hi: "this is JSON" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
