import express from 'express'
import path from "path"
import http from 'http'
import { fileURLToPath } from 'url'

const app = express()
const server = http.createServer(app)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticPath = path.join(__dirname, '..', '..', 'src', 'client', 'public')

app.use(express.static(staticPath))

app.get('/about', (req, res) => res.sendFile(path.join(staticPath, 'about.html')))

server.listen(80, () => console.log('SERVER IS LISTENING!'))

export {}