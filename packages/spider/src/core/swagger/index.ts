import path from 'path'
import { SwaggerRouter } from 'koa-swagger-decorator'
import CONFIG from '~/config'

const topRouter = new SwaggerRouter({ prefix: CONFIG.PREFIX })

/** This is v1 routers */
const v1 = new SwaggerRouter()
const v1Prefix = '/v1'
if (CONFIG.ENV !== 'prod') {
  v1.swagger({
    prefix: `${CONFIG.PREFIX}${v1Prefix}`,
    title: 'V1 API DOC',
    description: 'This is v1 api doc.',
    version: '0.1.0',
    swaggerHtmlEndpoint: '/doc.html',
    swaggerJsonEndpoint: '/json.html',
    swaggerOptions: {
      securityDefinitions: {
        api_key: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
  })
}

// point to v1 apis directory
// eslint-disable-next-line no-restricted-globals
v1.mapDir(path.resolve(__dirname, `../../app/api/v1/`))

/** This is v2 routers */
// ...

topRouter.use(v1Prefix, v1.routes())
export default topRouter
