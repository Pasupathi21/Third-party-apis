// import express, { Application, Express, Router } from 'express'
import GoogleApiController from './../controller/google.drive.api'

export default function AppRoutes(app: any) {
    console.log('AppRoutes')
    const route = app.Router()

    route.post('/file-upload', GoogleApiController.filrUploadtoGDrive)

    return route
}