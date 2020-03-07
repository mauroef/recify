import { toast as superToast } from 'bulma-toast';

export default class Notification {
  static showTextSuccessMessage(record, action) {
    superToast({
      message: `<i class="far fa-thumbs-up"></i> ${record} was ${action} succefully.`,
      type: 'is-info',
      dismissible: true,
      duration: 3000,
      animate: { in: 'fadeIn', out: 'fadeOut' }
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

  static showTextRepeatedErrorMessage(value) {
    superToast({
      message: `<strong>${value}</strong> already exists.`,
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

  static showServerErrorMessage(message) {
    superToast({
      message: `<strong>Error:</strong> ${message}`,
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' }
    });
  }

  static showServerWarningMessage() {
    superToast({
      message: 'Failed with server. Returning mocked Data.',
      type: 'is-warning',
      dismissible: true,
      duration: 4000,
      pauseOnHover: true,
      position: 'top-center',
      animate: { in: 'swing', out: 'bounceOut' }
    });
  }
}
