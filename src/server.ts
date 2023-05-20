import  express,{ Router } from 'express'
import cors from 'cors';
import 'dotenv/config'
import AppRoutes from './routes/routes.index'
import fileupload from 'express-fileupload'

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

//File uploaded middleware for express
app.use(fileupload({
    uploadTimeout: 0,
    useTempFiles: true,
    tempFileDir: `${__dirname}/../temp`

}))

app.use(AppRoutes(express))

app.listen(5151, () => {
    console.log('PORT listenng on http://localhost:5151')
})