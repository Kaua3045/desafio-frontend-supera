export const helpers = {
  formatDateStringToString: (dateString: string): string => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());

      return `${day}/${month}/${year}`;
  },
  formatDateToString: (date: Date): string => {
      const newDate = new Date(date);
      const year = newDate.getFullYear().toString();
      const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
      const day = newDate.getDate().toString().padStart(2, '0');
      return year + '-' + month + '-' + day;
  }
};