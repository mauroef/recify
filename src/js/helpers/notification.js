import { toast as superToast } from 'bulma-toast';
import { capitalize } from './ui';

export default class Notification {
  static showTextSuccessMessage(record, action) {
    superToast({
      message: `<i class="far fa-thumbs-up"></i> ${record} was ${action} succefully.`,
      type: 'is-info',
      dismissible: true,
      duration: 3000,
      animate: { in: 'fadeIn', out: 'fadeOut' },
    });
  }

  static showTextErrorMessage(minValue, maxValue) {
    superToast({
      message: `<strong>Error:</strong> input value must be between ${minValue} and ${maxValue} characters.`,
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' },
    });
  }

  static showTextRepeatedErrorMessage(value) {
    superToast({
      message: `<strong>${value}</strong> already exists.`,
      type: 'is-warning',
      dismissible: true,
      duration: 3000,
      animate: { in: 'swing', out: 'bounceOut' },
    });
  }

  static showDateErrorMessage() {
    superToast({
      message: '<strong>Error:</strong> input value must be a valid date.',
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' },
    });
  }

  static showComboErrorMessage() {
    superToast({
      message: '<strong>Error:</strong> bands | place values cannot be empty.',
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' },
    });
  }

  static showServerErrorMessage(message) {
    superToast({
      message: `<strong>Error:</strong> ${message}`,
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' },
    });
  }

  static showCanNotDeleted() {
    superToast({
      message: `<strong>Error:</strong> record can not be deleted.`,
      type: 'is-danger',
      dismissible: true,
      duration: 3000,
      animate: { in: 'shake', out: 'fadeOut' },
    });
  }

  static showServerWarningMessage() {
    superToast({
      message: `This is a demo. Please, <strong>login</strong> to start the app 🎊`,
      type: 'is-warning',
      dismissible: true,
      duration: 4000,
      pauseOnHover: true,
      position: 'top-center',
      animate: { in: 'swing', out: 'bounceOut' },
    });
  }

  static showLoging(name) {
    superToast({
      message: `Welcome <strong>${capitalize(name)}</strong> 😎`,
      type: 'is-success',
      dismissible: true,
      duration: 4000,
      pauseOnHover: true,
      position: 'top-center',
      animate: { in: 'bounceInUp', out: 'bounceOutUp' },
    });
  }

  static showLogout() {
    superToast({
      message: `You logged out succefully. 🙋‍♂️`,
      type: 'is-success',
      dismissible: true,
      duration: 3000,
      pauseOnHover: true,
      position: 'top-center',
      animate: { in: 'bounceInDown', out: 'fadeOut' },
    });
  }
}
