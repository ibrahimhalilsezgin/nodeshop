import express from 'express';
import fs from 'fs';
import path from 'path';
import { Database } from "./utils/Database";

const db = new Database("./database.json");
const app = express();
const PORT = 9404;

const UPLOAD_DIR = './uploads';
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

app.use(express.json({ limit: '25mb' })); 

app.post('/upload', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== "Server PAPYABVPsUZMnAXSxUwVcbjZyTynKEZeMKwGGPACqbxpFnCHkxSzKhArNWzAQuUm") {
    return res.status(403).send({ error: 'Unauthorized' });
  }

  const { id, image } = req.body;

  if (!id || !image) {
    return res.status(400).send({ error: 'Missing id or image (base64)' });
  }

  const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

  const imagePath = path.join(UPLOAD_DIR, `${id}.png`);

  fs.writeFile(imagePath, base64Data, { encoding: 'base64' }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Failed to save image' });
    }

    db.set(id, image); 

    res.status(200).send({ url: `https://cdn.ibo.rocks/uploads/${id}.png` });
  });
});

app.use('/uploads', express.static(UPLOAD_DIR));


// TODO delete işlemlerini yaz 
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
