import multer from 'multer'
import path from 'path'

// Multer é uma biblioteca para lidar com uploads de arquivos
// Path é do proprio node, é uma forma de fazer caminhos relativos dentro da aplicação

/**
 * Configurações do Multer (upload de arquivos)
 */
export default {
    storage: multer.diskStorage({
        // Indica para onde irão os arquivos (Dentro da aplicação no caso)
        destination: path.join(__dirname, '..', '..', 'uploads'),   // __dirname é uma flag que indica o caminho relativo do diretorio do arquivo atual
        filename: (request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`

            callback(null, fileName)
        }
    })
}
