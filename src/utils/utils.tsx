export const formatAmount = (amount: number) =>
  amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatTotalAmount = (amount: number) => {
  if (amount >= 1000000) {
    return `${Math.floor(amount / 1000000)}m`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}k`;
  } else {
    return amount.toString();
  }
};
