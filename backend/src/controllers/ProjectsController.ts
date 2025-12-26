import { Hono } from 'hono'

const projectRoute = new Hono()

projectRoute.get('/', (c) => {
  return c.text("test")
})

//TODO Creer un project et le stocké en db (mariadb ? sqlite ?)
export default projectRoute
