import express from "express"; 
import bodyParser from "body-parser";
import moment from "moment";
import router from "./utils/routers";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import { createServer } from 'node:http';
import {Server} from "socket.io";
const app = express();
const PORT = 5500;

const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin: process.env.frontendURL
    },
    pingTimeout:5000,
    pingInterval: 10000
});
moment.locale('tr');
mongoose.connect(process.env.DatabaseURI || '').then(() => console.log('Database Connected')).catch((e) => console.error(e));
mongoose.set('strictPopulate', false);
app.set('trust proxy', true);
app.use(morgan('dev'))
app.use(cors({}));
app.use(bodyParser.urlencoded({ limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(router);

let activeUser = 0;

io.on('connection', (socket) => {
  activeUser++;
  console.log(`🟢 Bağlandı | Aktif kullanıcı: ${activeUser}`);

  socket.on('disconnect', () => {
    activeUser--;
    console.log(`🔴 Ayrıldı | Aktif kullanıcı: ${activeUser}`);
  });
});

app.get('/activeUser', (req, res) => res.json({count: activeUser}))

server.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});