import express from "express";

const app = express();
const port = 3000;


app.get("/", (req, res) => res.send("Hello World! Node Web App!"));
process.on('uncaughtException', function (e) {
    console.log(e);
});

app.listen(port, () => console.log(`jknnodeweb1 app listening on port ${port}!`));