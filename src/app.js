import express from 'express';
import cors from 'cors';
import focusRoutes from './routes/focusRoutes.js';

const app = express();

// --- Middlewares ---

const allowedOrigins = [
  'http://localhost:5500',         // Frontend rodando localmente com Live Server (se usar)
  'http://127.0.0.1:5500',        // Outra variação local
  'https://Thauan0.github.io'     // <<< SEU FRONTEND NO GITHUB PAGES (CONFIRME USERNAME)
  // Adicione a URL do Render do frontend se fizer deploy lá também
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (ex: Postman) OU se a origem está na lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`Origem não permitida por CORS: ${origin}`); // Loga a origem bloqueada
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // para compatibilidade
}));

// Middleware para parsear JSON
app.use(express.json());

// --- Rotas ---
app.get('/', (req, res) => {
    res.status(200).send('<h1>FocusFlow API</h1><p>Bem-vindo! Use as rotas /api/*</p>');
});

app.use('/api', focusRoutes);

// --- Middlewares de Erro ---
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(404).json({ message: 'Endpoint da API não encontrado.' });
    } else {
        // Para rotas não-API, podemos simplesmente não fazer nada ou passar para o próximo
        // Se não houver mais nada, o Express envia um 404 padrão "Cannot GET /whatever"
         next(); // Ou res.status(404).send('Página não encontrada'); se quiser customizar
    }
});

app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err.stack || err);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

export default app;