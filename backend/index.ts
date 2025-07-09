import express from "express"; 
import bodyParser from "body-parser";
import moment from "moment";
import router from "./utils/routers";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
const app = express();
const PORT = 5500;

moment.locale('tr');
// TODO url sistemine geç 
mongoose.connect(process.env.DatabaseURI || '').then(() => console.log('Database Connected')).catch((e) => console.error(e));
mongoose.set('strictPopulate', false);
app.set('trust proxy', true);
app.use(morgan('dev'))
app.use(cors({}));
app.use(bodyParser.urlencoded({ limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(router);


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});