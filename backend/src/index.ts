import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import projectRoute from '../src/routes/ProjectRoute'
import taskRoute from '../src/routes/TaskRoute'

const app = new Hono()

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
