// import express, { Application, Express, Router } from 'express'
import GoogleApiController from './../controller/google.drive.api'

export default function AppRoutes(app: any) {
    const route = app.Router()

    //************************* GD Apis ******************** */
    route.get('/gd-api/files', GoogleApiController.getAllFiles).get('/gd-api/file/:id', GoogleApiController.getOneFile)
    route.post('/gd-api/file-upload', GoogleApiController.fileUploadtoGDrive)
    route.put('/gd-api/update-file', GoogleApiController.updateFile)
    route.delete('/gd-api/delete-file/:id', GoogleApiController.deleteFiles)

    return route
}