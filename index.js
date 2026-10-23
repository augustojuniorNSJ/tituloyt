import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// Extrai o ID do vídeo
function extrairId(link) {
  const match = link.match(/(?:v=|youtu\.be\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

app.post("/titulo", async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({ error: "Envie um link do YouTube" });
    }

    const videoId = extrairId(link);
    if (!videoId) {
      return res.status(400).json({ error: "Link inválido, não consegui extrair ID" });
    }

    // Busca o HTML do YouTube
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const html = await axios.get(url).then(r => r.data);

    // Extrai o <title>
    const matchTitle = html.match(/<title>(.*?)<\/title>/);

    if (!matchTitle) {
      return res.status(500).json({ error: "Não consegui encontrar o título" });
    }

    const titulo = matchTitle[1].replace(" - YouTube", "").trim();

    return res.json({ titulo, videoId });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.toString() });
  }
});

// Porta para Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
