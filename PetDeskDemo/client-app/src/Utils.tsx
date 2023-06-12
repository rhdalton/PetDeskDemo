
export const convertDate = (date: Date) => {
  return date.toLocaleDateString();
};
export const convertTime = (date: Date) => {
  return date.toLocaleTimeString(['en-US'], {hour: '2-digit', minute:'2-digit'});
};
