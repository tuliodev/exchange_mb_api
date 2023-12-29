export class AmountLessToZeroError extends Error {
  constructor() {
    super(`its not possible to deposite negative values `);
    this.name = 'AmountLessToZeroError';
  }
}
