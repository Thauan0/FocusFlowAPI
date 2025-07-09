import express from 'express';
import cors from 'cors';
import focusRoutes from './routes/focusRoutes.js'; 

const app = express();

const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'https://thauan0.github.io',
  'https://focusflow-next-ubpe.vercel.app',
  'https://focusflow-next-1e57-ixlwlj225-thauan0s-projects.vercel.app' // <- Adicionado domínio atual da Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') // <- Permite qualquer subdomínio da Vercel (opcional, seguro para projetos próprios)
    ) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}));

app.use(express.json());

// --- Rotas ---
app.get('/', (req, res) => {
    res.status(200).send('<h1>Focus API</h1><p>Bem-vindo! Use as rotas /api/*</p>');
});
app.use('/api', focusRoutes);

// --- Middlewares de Erro ---
app.use('/api', (req, res, next) => {
    res.status(404).json({ message: 'Endpoint da API não encontrado.' });
});
app.use((req, res, next) => {
    res.status(404).send('<h1>404 - Rota não encontrada</h1>');
});
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err.stack || err);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

export default app;
