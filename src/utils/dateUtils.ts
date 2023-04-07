export const dateUtils = {
  getDate: (date: any) => {
    if (typeof date == 'string') {
      date = new Date(date);
    }
    return date as Date;
  },

  getYear: (date: any) => {
    if (date) {
      return dateUtils.getDate(date).getFullYear();
    }
  },

  getQuarter: (date: any) => {
    if (date) {
      return Math.trunc(dateUtils.getDate(date).getMonth() / 3) + 1;
    }
  },

  getMonth: (date: any) => {
    if (date) {
      return dateUtils.getDate(date).getMonth() + 1;
    }
  },
};
