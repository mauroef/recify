export default class validator {
  static REQUIRED = 'REQUIRED';
  static MIN_LENGTH = 'MIN_LENGTH';
  static MAX_LENGTH = 'MAX_LENGTH';

  static validate(value, flag, validatorValue) {
    switch (flag) {
      case this.REQUIRED: {
        return value.trim().length > 0;
      }
      case this.MIN_LENGTH: {
        return value.trim().length > validatorValue;
      }
      case this.MAX_LENGTH: {
        return value.trim().length < validatorValue;
      }
    }
  }

  static showErrorMessage() {
    console.log('error');
  }
}
