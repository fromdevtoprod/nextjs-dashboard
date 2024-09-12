import { ZodError } from 'zod';

export class InputParseError extends Error {
  public fieldErrors: { [key: string]: string[] | undefined } = {};

  constructor(message: string, error: ZodError) {
    super(message, error);
    this.fieldErrors = error.flatten().fieldErrors;
  }
}
