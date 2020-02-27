export default class validator {
  static REQUIRED = 'REQUIRED';
  static MAX_LENGTH = 'MAX_LENGTH';

  static validate(value, flag, validatorValue) {
    if (flag === this.REQUIRED) {
      return value.trim().length > 0;
    }
    if (flag === this.MAX_LENGTH) {
      return value.trim().length > validatorValue;
    }
  }
}
