import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorMessageCode, httpStatusMessage } from 'src/constants';
const config = new ConfigService();
const stage: string = config.get('STAGE') || null;

export const ValidationExceptionFactory = (errors: ValidationError[]): void => {
  const getErrorMessage = (errs: ValidationError[]): object => {
    const errorMessage = {};
    errs.forEach((e) => {
      if (e.constraints) {
        errorMessage[e.property] = Object.values(e.constraints).map((v) => v);
      } else if (e.children && e.children.length) {
        errorMessage[e.property] = { ...getErrorMessage(e.children) };
      }
    });

    return errorMessage;
  };

  const errorMessages = getErrorMessage(errors);

  const exceptionResponse = {
    message: ErrorMessageCode.VALIDATE_ERROR,
    error: httpStatusMessage[400],
  };

  if (Object.keys(errorMessages).length && stage === 'development')
    exceptionResponse['validateMessage'] = errorMessages;

  throw new HttpException(exceptionResponse, HttpStatus.BAD_REQUEST);
};
