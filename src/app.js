import express from "express";
import * as awaitasync from "./awaitasync"
import * as spider from "./spider"
const app = express();
const port = 3000;


app.get("/", (req, res) => res.send("Hello World! Node Web App!"));
process.on('uncaughtException', function (e) {
    console.log(e);
});

//awaitasync.doIt();



app.listen(port, () => console.log(`jknnodeweb1 app listening on port ${port}!`));