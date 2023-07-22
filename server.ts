import express from 'express'
import routes from './router/routes'

const app = express()

app.use(routes);

export default app;
