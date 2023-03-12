import express, { Application } from 'express'
import cors from 'cors'
import indexRouter from './index'
import clienteRouter from './routes/clientes'
import entrenadorRouter from './routes/entrenadores'
import usuarioRouter from './routes/usuarios'

const allowedOrigins = ['192.168.0.123:3000', 'https://titaniumgym.azurewebsites.net']
const options: cors.CorsOptions = {
  origin: allowedOrigins
}

export class App {
  private readonly app: Application

  constructor (private readonly port: number | string) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  settings (): void {
    this.app.set('port', this.port)
  }

  middlewares (): void {
    this.app.use(express.json())
    this.app.use(cors(options))
  }

  routes (): void {
    this.app.use(indexRouter)
    this.app.use('/api-ux-gestion-de-personas/servicio-de-clientes/v1/clientes', clienteRouter)
    this.app.use('/api-ux-gestion-de-personas/servicio-de-entrenadores/v1/entrenadores', entrenadorRouter)
    this.app.use('/api-ux-gestion-de-personas/servicio-de-usuarios/v1/usuarios', usuarioRouter)
  }

  async listen (): Promise<void> {
    await this.app.listen(this.port)
    console.log(`¡Servidor conectado al puerto ${this.port}!`)
  }
}
