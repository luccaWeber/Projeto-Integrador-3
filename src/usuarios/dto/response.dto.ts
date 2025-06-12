import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
    @ApiProperty({
      description: 'Indica se a operação foi bem-sucedida',
      example: true,
      type: Boolean,
    })
    success: boolean;
  
    @ApiProperty({
      description: 'Código de status HTTP',
      example: 200,
      type: Number,
    })
    statusCode: number;
  
    @ApiProperty({
      description: 'Mensagem descritiva da operação',
      example: 'Operação realizada com sucesso',
      type: String,
    })
    message: string;
  
    @ApiProperty({
      description: 'Dados retornados pela operação',
      nullable: true,
    })
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
  