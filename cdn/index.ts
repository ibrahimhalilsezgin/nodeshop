import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from "cors"
import "dotenv/config"
const app = express();
const PORT = 9404;
app.use(express.json({ limit: '100mb' })); // büyük dosyalar için
app.use(cors({
}))
const UPLOAD_DIR = path.resolve('uploads');

// Klasör yoksa oluştur
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);



app.post('/upload', (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== "Server PAPYABVPsUZMnAXSxUwVcbjZyTynKEZeMKwGGPACqbxpFnCHkxSzKhArNWzAQuUm") {
    return res.status(403).send({ error: 'Unauthorized' });
  }

  const { id, image, file } = req.body;

  if (!id || (!image && !file)) {
    return res.status(400).send({ error: 'Missing id or file/image (base64)' });
  }

  const responses: Record<string, string> = {}; // Kaydedilen dosyaların URL’lerini burada tutacağız

  function saveBase64(base64: string, type: 'image' | 'file') {
    const match = base64.match(/^data:(.+);base64,(.+)$/);
    if (!match) return null;

    const mimeType = match[1];
    const base64Data = match[2];

    const extMap = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'application/zip': 'zip',
      'application/pdf': 'pdf',
      'video/mp4': 'mp4',
    };
    const ext = extMap[mimeType] || 'bin';
    const filename = `${id}-${type}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    try {
      fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
      responses[type] = `${process.env.domain}/uploads/${filename}`;
    } catch (err) {
      console.error(`Error saving ${type}:`, err);
    }
  }

  if (image) saveBase64(image, 'image');
  if (file) saveBase64(file, 'file');

  if (Object.keys(responses).length === 0) {
    return res.status(500).send({ error: 'Hiçbir dosya kaydedilemedi' });
  }

  res.status(200).send(responses);
});

app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(UPLOAD_DIR, filename);
  const ext = path.extname(filename).toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  if (!imageExtensions.includes(ext)) {
    return res.status(400).send({ error: 'Desteklenmeyen dosya türü' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ error: 'Resim bulunamadı' });
  }

  res.sendFile(filePath);
});


app.get('/download/:id.zip', (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== "Server PAPYABVPsUZMnAXSxUwVcbjZyTynKEZeMKwGGPACqbxpFnCHkxSzKhArNWzAQuUm") return res.status(403).send({ error: 'Unauthorized' });

  const { id } = req.params;
  const filePath = path.join(UPLOAD_DIR, `${id}.zip`);
  if (!fs.existsSync(filePath)) return res.status(404).send({ error: 'Dosya bulunamadı' });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${id}.zip"`);

  fs.createReadStream(filePath).pipe(res);
});



app.listen(PORT, () => {
  console.log('Server running on http://localhost:'+PORT);
});
