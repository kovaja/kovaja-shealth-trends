export class AppError extends Error {
  public isAppError: boolean;

  constructor(message: string) {
    super(message);

    this.isAppError = true;
  }
}