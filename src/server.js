"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("./database/connection");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const ExceptionHandler_1 = __importDefault(require("./exceptions/ExceptionHandler"));
const app = express_1.default(); // Instância do módulo express
app.use(cors_1.default()); // Permite a chamada de outras instancias diferentes da porta 3333 (Desta API)
// app.options('*', cors())
app.use(express_1.default.json()); // Utilização de Json pelo express
app.use(routes_1.default); // Utilização do arquivos de rotas
// Criação do caminho para visualização de imagens estáticas pelo express
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.use(ExceptionHandler_1.default); // Tratamento de excessões
// Define a porta 3333 onde será executada nossa aplicação local ou a porta do Heroku caso hospedado
const porta = process.env.PORT || 3333;
// Start the server
app.listen(porta, () => {
    console.log(`Server started on port ${porta}`);
}); // Utilização da porta
// // Aceita somente as chamadas dessa origem em produção
// app.use(cors({
//     origin: 'https://find-happy.netlify.app/'
// }))
// Params:
// Query Params: /users?search=wayne    (Parâmetros de busca na url)
// Route Params: /users/1               (Identificar um recurso já existente, PUT/DELETE)
// Body Params: No corpo da requisição  (Informações compostas, mais dados, um form por exemplo)
// 3 formas de lidar com Banco de Dados no backend:
// Driver Nativo, Query Builder, ORM (Object Relational Mapping)
// 1 - Driver Nativo: Não oferece nenhum tipo de abstração, SQL puro
// 2 - Query Builder: SQL com javascript (Sintaxe mais amigável, pouca abstração)
// 3 - ORM: Maior nível de abstração, instâncias das tabelas do banco são representadas em classes (Relaciona objetos com as classes)
