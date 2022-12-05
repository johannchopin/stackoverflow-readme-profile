import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import * as fs from 'fs'
import * as path from 'path'
import yaml from 'js-yaml'

const PATH_TO_OPENAPI_SCHEMA = path.resolve(__dirname, './openedApiSchema.yml')
const openAPI = fs.readFileSync(PATH_TO_OPENAPI_SCHEMA, 'utf-8')

const apiDocumentationRouter = Router()

apiDocumentationRouter.use('/', swaggerUi.serve)
apiDocumentationRouter.get('/', swaggerUi.setup(yaml.load(openAPI) as any))

export { apiDocumentationRouter }
