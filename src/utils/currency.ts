/**
 * Formats a number as INR Currency string (e.g. ₹84,100.00)
 */
export function formatINR(amount: number, includeDecimals = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0.00';
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });

  return formatter.format(amount);
}

/**
 * Calculates subtotal, GST amount, and grand total for financials
 */
export function calculateFinancials(
  items: { amount: number; taxable?: boolean }[],
  gstRate: number
) {
  const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  
  // By default, if taxable is not explicitly set to false, it is considered taxable
  const taxableAmount = items.reduce((sum, item) => {
    if (item.taxable !== false) {
      return sum + (Number(item.amount) || 0);
    }
    return sum;
  }, 0);

  const gstAmount = Math.round((taxableAmount * (gstRate / 100)) * 100) / 100;
  const grandTotal = subtotal + gstAmount;

  return {
    subtotal,
    taxableAmount,
    gstAmount,
    grandTotal,
  };
}

/**
 * Calculates AMC GST and Total
 */
export function calculateAMC(amount: number, gstRate: number) {
  const baseAmount = Number(amount) || 0;
  const gstAmount = Math.round((baseAmount * (gstRate / 100)) * 100) / 100;
  const grandTotal = baseAmount + gstAmount;

  return {
    baseAmount,
    gstAmount,
    grandTotal,
  };
}

/**
 * Calculates exact rupee amounts for milestone percentages
 */
export function calculateMilestones(
  grandTotal: number,
  stages: { percentage: number; label: string; description: string }[]
) {
  return stages.map((stage) => {
    const stageAmount = Math.round((grandTotal * (stage.percentage / 100)));
    return {
      ...stage,
      amount: stageAmount,
    };
  });
}
