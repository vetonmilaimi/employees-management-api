import * as http from 'http'
import { Express } from 'express'

class Server {
  private server: http.Server
  private port: string | number

  constructor({ app, port, onListening }: { app?: Express; port: string; onListening?: () => void }) {
    this.server = app ? http.createServer(app) : http.createServer()
    this.port = port
    this.server.listen(this.normalizePort(port))
    this.server.on('listening', () => {
      this.onListening()
      typeof onListening === 'function' && onListening()
    })
    this.server.on('error', this.onError)
  }
  private onListening = () => {
    const addr = this.server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
    console.log('listening on ' + bind)
  }
  private onError = (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
      throw error
    }
    const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }
  private normalizePort = (val: string) => {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
      return val
    }
    if (port >= 0) {
      return port
    }
    return false
  }
}

export default Server
