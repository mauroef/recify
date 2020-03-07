export default class Validator {
  static REQUIRED = 'REQUIRED';
  static MIN_LENGTH = 'MIN_LENGTH';
  static MAX_LENGTH = 'MAX_LENGTH';
  static DATE_FORMAT = 'DATE_FORMAT';

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
      case this.DATE_FORMAT: {
        return isValidDateFormat(value);
      }
    }

    function isValidDateFormat(value) {
      const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
      return regex.test(value.trim());
    }
  }
}
