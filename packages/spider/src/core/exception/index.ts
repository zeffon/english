import type Koa from 'koa'
import CODE from './exception-code'
import { HttpException } from './http-exception'

const UNDEDINED_ERROR_TIP = 'undefined errorCode'

/**
 * Global exception catch
 */
export default async function catchError(
  ctx: Koa.Context,
  next: any,
): Promise<void> {
  try {
    await next()
  } catch (error: any) {
    const isHttpException = error instanceof HttpException
    const request = `${ctx.method} ${ctx.path}`

    if (isHttpException) {
      const message = getMessage(error)
      const code = getCode(error)
      ctx.status = error.status
      const data = {
        code,
        message,
        request,
      }
      ctx.body = data
    } else if (error.status !== 500) {
      const data = {
        code: 10001,
        message: error.message || CODE.get(10001),
        request,
      }
      ctx.body = data
      ctx.status = error.status || 500
    } else {
      const data = {
        code: 9999,
        message: CODE.get(9999),
        request,
      }
      ctx.body = data
      ctx.status = error.status || 500
    }
  }
}

/**
 * Get custom exception message
 * @param error
 * @returns message
 */
function getMessage(error: any): string {
  const message =
    typeof error.code === 'number'
      ? error.message || CODE.get(error.code) || UNDEDINED_ERROR_TIP
      : error.code
  return message
}

/**
 * Get custom error code
 * @param error
 * @returns code
 */
function getCode(error: any): number {
  const code = typeof error.code === 'number' ? error.code : 10000
  return code
}
