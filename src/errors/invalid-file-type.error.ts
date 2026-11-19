export class InvalidFileTypeError extends Error {
  constructor(message = "Unsupported file type") {
    super(message);
    this.name = "InvalidFileTypeError";
  }
}