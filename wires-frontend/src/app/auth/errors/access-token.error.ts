type ErrorName = 'NONEXISTENT_ACCESS_TOKEN';

export class AccessTokenError extends Error {
  public constructor(public override name: ErrorName) {
    super();
  }
}
