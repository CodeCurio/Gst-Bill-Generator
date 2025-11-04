import { InvoiceItem, TaxCalculation } from '@/types';

/**
 * Calculate GST tax amounts based on items and location
 * @param items - Array of invoice items
 * @param sellerStateCode - Seller's state code (2-letter code)
 * @param buyerStateCode - Buyer's state code (2-letter code)
 * @returns Tax calculation object with all tax amounts
 */
export function calculateGSTTax(
  items: InvoiceItem[],
  sellerStateCode: string,
  buyerStateCode: string
): TaxCalculation {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  // Calculate total tax amount
  const totalTax = items.reduce((sum, item) => {
    const itemTax = (item.quantity * item.rate * item.taxPercent) / 100;
    return sum + itemTax;
  }, 0);

  // Determine tax distribution based on location
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (sellerStateCode === buyerStateCode) {
    // Same state - split tax equally between CGST and SGST
    cgst = totalTax / 2;
    sgst = totalTax / 2;
  } else {
    // Different states - IGST only
    igst = totalTax;
  }

  // Calculate total amount
  const totalAmount = subtotal + totalTax;

  // Convert amount to words
  const amountInWords = numberToWords(totalAmount);

  return {
    subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimal places
    cgst: Math.round(cgst * 100) / 100,
    sgst: Math.round(sgst * 100) / 100,
    igst: Math.round(igst * 100) / 100,
    totalTax: Math.round(totalTax * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    amountInWords,
  };
}

/**
 * Calculate individual item amount
 * @param quantity - Item quantity
 * @param rate - Item rate per unit
 * @returns Item amount (quantity × rate)
 */
export function calculateItemAmount(quantity: number, rate: number): number {
  return Math.round(quantity * rate * 100) / 100;
}

/**
 * Calculate item tax amount
 * @param quantity - Item quantity
 * @param rate - Item rate per unit
 * @param taxPercent - Tax percentage
 * @returns Tax amount for the item
 */
export function calculateItemTax(
  quantity: number,
  rate: number,
  taxPercent: number
): number {
  const amount = quantity * rate;
  const tax = (amount * taxPercent) / 100;
  return Math.round(tax * 100) / 100;
}

/**
 * Convert number to words (Indian currency format)
 * @param num - Number to convert
 * @returns Number in words format
 */
export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';

  const wholePart = Math.floor(num);
  const decimalPart = Math.round((num - wholePart) * 100);

  const wholeWords = convertWholeNumberToWords(wholePart);
  const decimalWords = decimalPart > 0 ? convertWholeNumberToWords(decimalPart) : '';

  let result = wholeWords;

  if (wholePart === 1) {
    result += ' Rupee';
  } else {
    result += ' Rupees';
  }

  if (decimalPart > 0) {
    if (decimalPart === 1) {
      result += ` and ${decimalWords} Paise`;
    } else {
      result += ` and ${decimalWords} Paise`;
    }
  }

  return result + ' Only';
}

/**
 * Convert whole number to words
 * @param num - Whole number to convert
 * @returns Number in words
 */
function convertWholeNumberToWords(num: number): string {
  if (num === 0) return 'Zero';

  const units = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];

  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const thousands = Math.floor(num / 1000);
  const hundreds = Math.floor((num % 1000) / 100);
  const remainder = num % 100;

  let words = '';

  if (thousands > 0) {
    words += convertWholeNumberToWords(thousands) + ' Thousand';
  }

  if (hundreds > 0) {
    if (words) words += ' ';
    words += units[hundreds] + ' Hundred';
  }

  if (remainder > 0) {
    if (words) words += ' ';

    if (remainder < 20) {
      words += units[remainder];
    } else {
      const tensDigit = Math.floor(remainder / 10);
      const unitsDigit = remainder % 10;

      words += tens[tensDigit];
      if (unitsDigit > 0) {
        words += ' ' + units[unitsDigit];
      }
    }
  }

  return words;
}

/**
 * Validate GSTIN format
 * @param gstin - GSTIN to validate
 * @returns True if GSTIN is valid format
 */
export function validateGSTIN(gstin: string): boolean {
  if (!gstin || gstin.length !== 15) return false;

  // GSTIN regex pattern as per Indian government specification
  const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;

  return gstinPattern.test(gstin.toUpperCase());
}

/**
 * Generate next invoice number
 * @param lastInvoiceNumber - Last invoice number (optional)
 * @returns New invoice number in format INV-YYYY-XXXX
 */
export function generateInvoiceNumber(lastInvoiceNumber?: string): string {
  const currentYear = new Date().getFullYear();

  if (!lastInvoiceNumber) {
    return `INV-${currentYear}-0001`;
  }

  // Extract last sequence number and increment
  const parts = lastInvoiceNumber.split('-');
  const lastYear = parseInt(parts[1]);
  const lastSequence = parseInt(parts[2]);

  // Reset sequence if year changed
  if (lastYear !== currentYear) {
    return `INV-${currentYear}-0001`;
  }

  // Increment sequence
  const newSequence = (lastSequence + 1).toString().padStart(4, '0');
  return `INV-${currentYear}-${newSequence}`;
}

/**
 * Validate place of supply state code
 * @param stateCode - 2-letter state code
 * @returns True if valid Indian state code
 */
export function validateStateCode(stateCode: string): boolean {
  const validStateCodes = [
    'AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CT', 'DN', 'DL', 'GA',
    'GJ', 'HP', 'HR', 'JH', 'JK', 'KA', 'KL', 'LA', 'LD', 'MH',
    'ML', 'MN', 'MP', 'MZ', 'NL', 'OD', 'PB', 'PY', 'RJ', 'SK',
    'TN', 'TR', 'UP', 'UT', 'WB',
  ];

  return validStateCodes.includes(stateCode.toUpperCase());
}