import { Validation } from '../../presentation/protocols';
import { AmountLessToZeroError } from '../../presentation/errors';

export class RequiredFieldPositive implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (input[this.fieldName] < 0) {
      return new AmountLessToZeroError();
    }
  }
}
