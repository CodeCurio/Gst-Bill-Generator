import { IndianState } from '@/types';

// Indian states and union territories for place of supply
export const INDIAN_STATES: IndianState[] = [
  { code: 'AN', name: 'Andaman and Nicobar Islands', tinCode: '35' },
  { code: 'AP', name: 'Andhra Pradesh', tinCode: '37' },
  { code: 'AR', name: 'Arunachal Pradesh', tinCode: '12' },
  { code: 'AS', name: 'Assam', tinCode: '18' },
  { code: 'BR', name: 'Bihar', tinCode: '10' },
  { code: 'CH', name: 'Chandigarh', tinCode: '04' },
  { code: 'CT', name: 'Chhattisgarh', tinCode: '22' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu', tinCode: '26' },
  { code: 'DL', name: 'Delhi', tinCode: '07' },
  { code: 'GA', name: 'Goa', tinCode: '30' },
  { code: 'GJ', name: 'Gujarat', tinCode: '24' },
  { code: 'HP', name: 'Himachal Pradesh', tinCode: '02' },
  { code: 'HR', name: 'Haryana', tinCode: '06' },
  { code: 'JH', name: 'Jharkhand', tinCode: '20' },
  { code: 'JK', name: 'Jammu and Kashmir', tinCode: '01' },
  { code: 'KA', name: 'Karnataka', tinCode: '29' },
  { code: 'KL', name: 'Kerala', tinCode: '32' },
  { code: 'LA', name: 'Ladakh', tinCode: '38' },
  { code: 'LD', name: 'Lakshadweep', tinCode: '31' },
  { code: 'MH', name: 'Maharashtra', tinCode: '27' },
  { code: 'ML', name: 'Meghalaya', tinCode: '17' },
  { code: 'MN', name: 'Manipur', tinCode: '14' },
  { code: 'MP', name: 'Madhya Pradesh', tinCode: '23' },
  { code: 'MZ', name: 'Mizoram', tinCode: '15' },
  { code: 'NL', name: 'Nagaland', tinCode: '13' },
  { code: 'OD', name: 'Odisha', tinCode: '21' },
  { code: 'PB', name: 'Punjab', tinCode: '03' },
  { code: 'PY', name: 'Puducherry', tinCode: '34' },
  { code: 'RJ', name: 'Rajasthan', tinCode: '08' },
  { code: 'SK', name: 'Sikkim', tinCode: '11' },
  { code: 'TN', name: 'Tamil Nadu', tinCode: '33' },
  { code: 'TR', name: 'Tripura', tinCode: '16' },
  { code: 'UP', name: 'Uttar Pradesh', tinCode: '09' },
  { code: 'UT', name: 'Uttarakhand', tinCode: '05' },
  { code: 'WB', name: 'West Bengal', tinCode: '19' },
];

// Application constants
export const APP_CONFIG = {
  name: 'Online GST Bill Maker',
  description: 'Create GST-compliant invoices in seconds. Auto-calculate CGST, SGST, and IGST.',
  version: '1.0.0',
  author: 'TopRank Digital Service',
  authorUrl: 'https://www.toprankindia.com',
  location: 'Lucknow',
};

// Invoice number format
export const INVOICE_NUMBER_FORMAT = 'INV-YYYY-XXXX';

// File upload constraints
export const FILE_UPLOAD = {
  maxSize: 1 * 1024 * 1024, // 1MB in bytes
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  allowedExtensions: ['.jpg', '.jpeg', '.png'],
};

// Tax rates (common GST rates in India)
export const GST_RATES = [0, 5, 12, 18, 28];

// Default values
export const DEFAULT_VALUES = {
  quantity: 1,
  rate: 0,
  taxPercent: 18,
  maxItems: 50,
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  pincode: /^\d{6}$/,
};

// Error messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidGstin: 'Please enter a valid GSTIN number',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid 10-digit mobile number',
  fileTooBig: 'File size must be less than 1MB',
  invalidFileType: 'Only PNG and JPG files are allowed',
  atLeastOneItem: 'Please add at least one item',
  positiveNumber: 'Please enter a positive number',
  maxItemsExceeded: 'Maximum 50 items allowed per invoice',
};

// Success messages
export const SUCCESS_MESSAGES = {
  invoiceGenerated: 'Invoice PDF generated successfully!',
  invoiceSaved: 'Invoice saved successfully!',
  invoiceShared: 'Invoice shared via WhatsApp!',
  logoUploaded: 'Logo uploaded successfully!',
};

// PDF templates configuration
export const PDF_TEMPLATES = {
  classic: {
    name: 'Classic',
    description: 'Traditional layout with borders and professional appearance',
    hasBorders: true,
    hasHeader: true,
    hasFooter: true,
  },
  modern: {
    name: 'Modern',
    description: 'Clean, minimalist design with subtle styling',
    hasBorders: false,
    hasHeader: true,
    hasFooter: false,
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple layout with essential elements only',
    hasBorders: false,
    hasHeader: false,
    hasFooter: false,
  },
} as const;

// WhatsApp sharing template
export const WHATSAPP_TEMPLATE = `🧾 *GST Invoice* - {invoiceNumber}
📅 Date: {invoiceDate}
💰 Amount: ₹{totalAmount}
📱 View/Download: {invoiceLink}

Generated with Online GST Bill Maker by TopRank Digital Service`;

// SEO metadata
export const SEO_METADATA = {
  home: {
    title: 'Free Online GST Bill Maker – Create GST Invoice PDF Instantly',
    description: 'Generate GST-compliant invoices in seconds. Auto-calculate CGST, SGST, and IGST. Download professional PDF bills free. Built by TopRank Digital Service.',
    keywords: ['GST bill maker', 'GST invoice', 'online GST billing', 'invoice generator', 'GST calculator'],
  },
  templates: {
    title: 'GST Invoice Templates – Professional Invoice Designs',
    description: 'Choose from 3 professional GST invoice templates. Classic, Modern, and Minimal designs for your business needs.',
    keywords: ['GST invoice templates', 'invoice designs', 'professional templates'],
  },
};