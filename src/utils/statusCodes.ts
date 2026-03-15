export const statusCode = {
  success: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  unprocessable: 422,
  tooManyRequests: 429,
  internalError: 500,
  badGateway: 502,
  serviceUnavailable: 503,
} as const;

export type StatusCodeKey = keyof typeof statusCode;
export type StatusCodeValue = (typeof statusCode)[StatusCodeKey];
