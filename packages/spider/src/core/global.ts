import { UnifyResponse } from './exception/unify-response'

class InitGlobal {
  constructor() {
    global.UnifyResponse = new UnifyResponse()
    global.SUCCESS_CODE = 0
  }
}

export default InitGlobal
