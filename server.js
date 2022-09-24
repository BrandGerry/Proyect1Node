const dotenv = require('dotenv')
const { app } = require('./app')
//BD
const { db } = require('./utils/database.util')
//DOTENV
dotenv.config({ path: './config.env' })
//MODELS
const { initModels } = require('./models/initModels')

const startServer = async () => {
    try {
        //AUTENTICAR
        await db.authenticate()

        //MODELO DE RELACIONES
        initModels()

        //SYNCRONIZAR CON LA BASE DE DATOS
        await db.sync()
        //Escuchar servidor
        const PORT = 4000

        app.listen(PORT, () => {
            console.log('Express Runing')
        })

    } catch (error) {
        console.log(error)

    }
}

startServer();

