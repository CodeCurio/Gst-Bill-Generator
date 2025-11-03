// Simple test for GST calculator functionality
const { calculateGSTTax, numberToWords } = require('./src/lib/gst-calculator.ts');

// Test data
const testItems = [
  {
    id: '1',
    name: 'Web Development Service',
    quantity: 1,
    rate: 10000,
    taxPercent: 18,
    amount: 10000
  },
  {
    id: '2',
    name: 'Hosting',
    quantity: 12,
    rate: 500,
    taxPercent: 18,
    amount: 6000
  }
];

console.log('Testing GST Calculator...');

// Test same state (CGST + SGST)
const sameStateResult = calculateGSTTax(testItems, 'UP', 'UP');
console.log('Same State (UP):', sameStateResult);

// Test different states (IGST)
const diffStateResult = calculateGSTTax(testItems, 'UP', 'MH');
console.log('Different States (UP -> MH):', diffStateResult);

// Test number to words
console.log('Number to Words (16000):', numberToWords(16000));