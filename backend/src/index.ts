import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import projectRoute from '../src/routes/ProjectRoute'
import taskRoute from '../src/routes/TaskRoute'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)


app.get('/', (c) => {
  return c.text('Hello Hono!')
})
// Route pour gerer les projects (a voir comment je la fait)
app.route('/project', projectRoute)
app.route('/task', taskRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
