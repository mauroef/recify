import { toast as superToast } from 'bulma-toast';

export default class Notification {
  static showTextSuccessMessage(record, action) {
    superToast({
      message: `<i class="far fa-thumbs-up"></i> ${record} was ${action} succefully.`,
      type: 'is-info',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' }
    });
  }

  static showTextErrorMessage(minValue, maxValue) {
    superToast({
      message: `<strong>Error:</strong> input value must be between ${minValue} and ${maxValue} characters.`,
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' }
    });
  }

  static showDateErrorMessage() {
    superToast({
      message: '<strong>Error:</strong> input value must be a valid date.',
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' }
    });
  }
}
