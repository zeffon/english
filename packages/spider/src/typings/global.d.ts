/* eslint-disable no-var */
import type { UnifyResponse } from '../core/exception/unify-response'

declare global {
  var UnifyResponse: UnifyResponse
  var SUCCESS_CODE: number
}

export {}
