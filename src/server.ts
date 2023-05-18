import  express,{ Router } from 'express'
import cors from 'cors';
require('dotenv').config()
import AppRoutes from './routes/routes.index'
const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use(AppRoutes(express))

app.listen(5151, () => {
    console.log('PORT listenng on http://localhost:5151')
})