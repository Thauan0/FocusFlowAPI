// src/server.js (VERSÃO FINAL E CORRETA)

// A importação do 'app' também precisa do caminho relativo './'.
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor FocusFlow API rodando na porta ${PORT}`);
}).on('error', (err) => {
    console.error('!!! ERRO ao iniciar o servidor:', err);
    process.exit(1);
});