import { Response, Request } from 'express'

class GoogleApis {
    constructor() {
        //
    }

    async testFunction(req: Request, res: Response) {
        console.log('testFunction')
        res.send({
            message: 'Success'
        })
    } 

}

export default new GoogleApis()