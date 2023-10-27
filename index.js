import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
// const API_URL = "https://ws-public.interpol.int/notices/v1/red?ageMax=120&ageMin=18&page=1&resultPerPage=5";

async function API_URL(pageNum, personNum)
{
    const API_URL = `https://ws-public.interpol.int/notices/v1/red?ageMax=120&ageMin=18&page=${pageNum}&resultPerPage=20`
    const result = await axios.get(API_URL);
    const firstNotice = result.data._embedded.notices[personNum];
    // console.log(firstNotice);
    return firstNotice;
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/", async (req, res) =>
{
    try
    {
        const randomPage = Math.floor(Math.random() * 5 + 1);
        const randomPerson = Math.floor(Math.random() * 20 + 1);
        const result = await API_URL(randomPage, randomPerson);
        // console.log(result);
        res.render("index.ejs", {data: result});
    } catch (error){
        console.log(error);
    }
    const result = {
        id: Math.floor(Math.random() * 6 + 1)
    };
    res.render("index.ejs", { data: result });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});