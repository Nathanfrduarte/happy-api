import express from 'express'
import 'express-async-errors'
import './database/connection'
import routes from './routes'
import path from 'path'
import cors from 'cors'
import ErrorHandler from './exceptions/ExceptionHandler'

const app = express()   // Instância do módulo express
// Aceita somente as chamadas dessa origem em produção
app.use(cors({
    origin: 'https://find-happy.netlify.app/'
}))
// app.use(cors())         // Permite a chamada de outras instancias diferentes da porta 3333 (Desta API)
app.use(express.json()) // Utilização de Json pelo express
app.use(routes)         // Utilização do arquivos de rotas
// Criação do caminho para visualização de imagens estáticas pelo express
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(ErrorHandler)   // Tratamento de excessões

// Define a porta 8080 onde será executada nossa aplicação local ou a porta do Heroku caso hospedado
const porta = process.env.PORT || 3333;
// Start the server
app.listen(porta)       // Utilização da porta

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
