export interface ErrorResponseDto {
  path: string;
  timestamp: string;
  statusCode: number;
  error: string;
  message: string[];
}