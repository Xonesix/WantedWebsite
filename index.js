import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) =>
{
    const result = {
        id: Math.floor(Math.random() * 6 + 1)
    };
    res.render("index.ejs", { data: result });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});