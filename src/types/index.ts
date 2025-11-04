// Invoice item type
export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  taxPercent: number;
  amount: number;
}

// Business details
export interface BusinessDetails {
  name: string;
  address: string;
  gstin?: string;
  logo?: string;
}

// Client details
export interface ClientDetails {
  name: string;
  address: string;
}

// Invoice details
export interface InvoiceDetails {
  invoiceNo: string;
  invoiceDate: Date;
  dueDate?: Date;
  placeOfSupply: string;
}

// Tax calculation result
export interface TaxCalculation {
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  totalAmount: number;
  amountInWords: string;
}

// Complete invoice data
export interface InvoiceData {
  business: BusinessDetails;
  client: ClientDetails;
  invoice: InvoiceDetails;
  items: InvoiceItem[];
  tax: TaxCalculation;
}

// Indian states for place of supply dropdown
export interface IndianState {
  code: string;
  name: string;
  tinCode: string;
}

// PDF template types
export type PDFTemplate = 'classic' | 'modern' | 'minimal';

// Form validation errors
export interface FormErrors {
  [key: string]: string | undefined;
}

// User type for authentication
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

// Saved invoice from database
export interface SavedInvoice {
  id: string;
  invoiceNo: string;
  userId?: string;
  businessName: string;
  businessAddress: string;
  gstin?: string;
  clientName: string;
  clientAddress: string;
  invoiceDate: Date;
  dueDate?: Date;
  placeOfSupply: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

// WhatsApp sharing data
export interface WhatsAppShareData {
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: string;
  invoiceLink?: string;
}

// Form state for invoice creation
export interface InvoiceFormState {
  business: BusinessDetails;
  client: ClientDetails;
  invoice: InvoiceDetails;
  items: InvoiceItem[];
  errors: FormErrors;
  isDirty: boolean;
}