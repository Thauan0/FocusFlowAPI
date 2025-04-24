// src/server.js
// import 'dotenv/config'; // Descomente se for usar variáveis de ambiente .env
import app from './app.js';

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
        // Mensagens essenciais de inicialização
        console.log(`🚀 Servidor FocusFlow API rodando na porta ${PORT}`);
        console.log(`🔗 Acesse: http://localhost:${PORT}`);
    }).on('error', (err) => { // Listener para erros no listen
        console.error('!!! ERRO ao iniciar o servidor:', err); // Manter log de erro de inicialização
        process.exit(1); // Sair se não conseguir iniciar
    });
} catch (error) {
    console.error("!!! ERRO CATASTRÓFICO no bloco try/catch:", error); // Manter log de erro catastrófico
    process.exit(1); // Sair em caso de erro grave
}