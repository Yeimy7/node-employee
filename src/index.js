import app from './app.js';
import * as config from './config/config.js'
import conectarDB from './config/db.js'

// Conectar a la base de datos
const conexion = async () => {
  try {
      await conectarDB.authenticate()
      console.log('DB conectada');

  } catch (error) {
      console.error(error)
      process.exit(1) //Detener la app

  }
}
conexion();

// Arrancar la app
app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})