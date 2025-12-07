export class ApiError extends Error {
  code: string;
  status: number;
  data: any;
  
  constructor(message: string, code: string = "API_ERROR", status: number = 500, data: any = null) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
