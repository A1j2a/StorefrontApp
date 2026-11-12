export const formatPrice = (amount: number, symbol = '$'): string => {
  const safe = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${safe.toFixed(2)}`;
};

// Integer-cent arithmetic prevents floating-point drift (e.g. 59.99 * 3).
export const calculateSubtotalCents = (price: number, quantity: number): number =>
  Math.round(price * 100) * Math.max(0, quantity);

export const centsToAmount = (cents: number): number =>
  Math.round(cents) / 100;

