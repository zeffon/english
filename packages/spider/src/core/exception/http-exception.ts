/**
 * Custom HTTP Exception
 */
export class HttpException extends Error {
  code: number | string
  status: number
  constructor(code: number | string) {
    super()
    this.code = code
    this.status = 500
  }
}

export class ParameterException extends HttpException {
  constructor(code: number | string) {
    super(code)
    this.code = code
    this.status = 400
  }
}

export class UnAuthenticatedException extends HttpException {
  constructor(code: number) {
    super(code)
    this.code = code
    this.status = 401
  }
}

export class ForbiddenException extends HttpException {
  constructor(code: number) {
    super(code)
    this.code = code
    this.status = 403
  }
}

export class NotFoundException extends HttpException {
  constructor(code: number) {
    super(code)
    this.code = code
    this.status = 404
  }
}

export class ServerErrorException extends HttpException {
  constructor(code: number | string) {
    super(code)
    this.code = code
    this.status = 500
  }
}

export class Success extends HttpException {
  constructor(code: number, message: string) {
    super(code)
    this.code = code
    this.status = 200
    this.message = message
  }
}

export class GetSuccess extends Success {
  constructor(code: number, message: string) {
    super(code, message)
    this.code = code
    this.status = 200
    this.message = message
  }
}

export class CreateSuccess extends Success {
  constructor(code: number, message: string) {
    super(code, message)
    this.code = code
    this.status = 201
    this.message = message
  }
}

export class UpdateSuccess extends Success {
  constructor(code: number, message: string) {
    super(code, message)
    this.code = code
    this.status = 200
    this.message = message
  }
}

export class DeleteSuccess extends Success {
  constructor(code: number, message: string) {
    super(code, message)
    this.code = code
    this.status = 200
    this.message = message
  }
}
