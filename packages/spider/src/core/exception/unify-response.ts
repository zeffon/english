import {
  CreateSuccess,
  DeleteSuccess,
  ForbiddenException,
  GetSuccess,
  NotFoundException,
  ParameterException,
  ServerErrorException,
  UnAuthenticatedException,
  UpdateSuccess
} from './http-exception'

/**
 * Unify Response
 */
export class UnifyResponse {
  /**
   * Get success
   * @param code errorCode
   * @param message tip message
   */
  getSuccess({ code = global.SUCCESS_CODE, message = '' }): void {
    throw new GetSuccess(code, message)
  }

  /**
   * Create Success
   * @param code errorCode
   * @param message tip message
   */
  createSuccess({ code = global.SUCCESS_CODE, message = '' }): void {
    throw new CreateSuccess(code, message)
  }

  /**
   * Update Success
   * @param code errorCode
   * @param message tip message
   */
  updateSuccess({ code = global.SUCCESS_CODE, message = '' }): void {
    throw new UpdateSuccess(code, message)
  }

  /**
   * 删除成功
   * @param code errorCode
   * @param message tip message
   */
  deleteSuccess({ code = global.SUCCESS_CODE, message = '' }): void {
    throw new DeleteSuccess(code, message)
  }

  /**
   * Parameter Exception
   * @param codeOrMessage errorCode | error message
   */
  parameterException(codeOrMessage: number | string): void {
    throw new ParameterException(codeOrMessage)
  }

  /**
   * Un Authenticated Exception
   * @param code errorCode
   */
  unAuthenticatedException(code: number): void {
    throw new UnAuthenticatedException(code)
  }

  /**
   * Forbidden Exception
   * @param code errorCode
   */
  forbiddenException(code: number): void {
    throw new ForbiddenException(code)
  }

  /**
   * Not Found Exception
   * @param code errorCode
   */
  notFoundException(code: number): void {
    throw new NotFoundException(code)
  }

  /**
   * server Error
   * @param codeOrMessage errorCode | error message
   */
  serverErrorException(codeOrMessage: number | string): void {
    throw new ServerErrorException(codeOrMessage)
  }
}
