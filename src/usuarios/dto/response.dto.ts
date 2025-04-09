export class ResponseDto<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T | null;
  
    constructor(params: {
      success: boolean;
      statusCode: number;
      message: string;
      data?: T | null;
    }) {
      this.success = params.success;
      this.statusCode = params.statusCode;
      this.message = params.message;
      this.data = params.data ?? null;
    }
  }
  