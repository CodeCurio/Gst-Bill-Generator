'use client';

import { useState } from 'react';
import { BusinessDetailsForm } from '@/components/forms/BusinessDetailsForm';
import { ClientDetailsForm } from '@/components/forms/ClientDetailsForm';
import { InvoiceDetailsForm } from '@/components/forms/InvoiceDetailsForm';
import { ItemsTable } from '@/components/invoice/ItemsTable';
import { TaxCalculationDisplay } from '@/components/invoice/TaxCalculationDisplay';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { Button } from '@/components/ui/Button';
import { InvoiceFormState, InvoiceData } from '@/types';
import { calculateGSTTax, generateInvoiceNumber } from '@/lib/gst-calculator';
import { generateInvoicePDF } from '@/lib/pdf';
import { APP_CONFIG } from '@/lib/constants';

export default function Home() {
  const [formState, setFormState] = useState<InvoiceFormState>({
    business: {
      name: '',
      address: '',
      gstin: '',
    },
    client: {
      name: '',
      address: '',
    },
    invoice: {
      invoiceNo: generateInvoiceNumber(),
      invoiceDate: new Date(),
      dueDate: undefined,
      placeOfSupply: '',
    },
    items: [
      {
        id: '1',
        name: '',
        quantity: 1,
        rate: 0,
        taxPercent: 18,
        amount: 0,
      },
    ],
    errors: {},
    isDirty: false,
  });

  // Calculate taxes whenever form data changes
  const calculateTaxes = () => {
    if (formState.items.some(item => item.name && item.quantity > 0 && item.rate > 0)) {
      const sellerState = formState.invoice.placeOfSupply.slice(0, 2).toUpperCase();
      const buyerState = formState.invoice.placeOfSupply.slice(0, 2).toUpperCase(); // Same state for now

      return calculateGSTTax(formState.items, sellerState, buyerState);
    }
    return null;
  };

  const taxCalculation = calculateTaxes();

  const updateFormState = (updates: Partial<InvoiceFormState>) => {
    setFormState(prev => ({
      ...prev,
      ...updates,
      isDirty: true,
    }));
  };

  const handleGeneratePDF = async () => {
    // This will be implemented when we add PDF generation
    alert('PDF generation will be implemented in next step');
  };

  const handleSaveInvoice = async () => {
    // This will be implemented when we add authentication
    alert('Save functionality will be implemented after authentication setup');
  };

  const handleShareWhatsApp = async () => {
    // This will be implemented when we add WhatsApp sharing
    alert('WhatsApp sharing will be implemented in next steps');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {APP_CONFIG.name}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Generate GST-compliant invoices in seconds. Auto-calculate CGST, SGST, and IGST taxes with professional PDF output.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column - Input Forms */}
          <div className="space-y-6">

            {/* Business Details */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Business Details</h2>
              <BusinessDetailsForm
                business={formState.business}
                onChange={(business) => updateFormState({ business })}
                errors={formState.errors}
              />
            </div>

            {/* Client Details */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Client Details</h2>
              <ClientDetailsForm
                client={formState.client}
                onChange={(client) => updateFormState({ client })}
                errors={formState.errors}
              />
            </div>

            {/* Invoice Details */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
              <InvoiceDetailsForm
                invoice={formState.invoice}
                onChange={(invoice) => updateFormState({ invoice })}
                errors={formState.errors}
              />
            </div>

            {/* Items Table */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
              <ItemsTable
                items={formState.items}
                onChange={(items) => updateFormState({ items })}
                errors={formState.errors}
              />
            </div>

            {/* Tax Calculation */}
            {taxCalculation && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Tax Summary</h2>
                <TaxCalculationDisplay calculation={taxCalculation} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGeneratePDF}
                  disabled={!taxCalculation || formState.items.length === 0}
                  className="flex-1"
                >
                  Generate PDF
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleSaveInvoice}
                  disabled={!taxCalculation || formState.items.length === 0}
                  className="flex-1"
                >
                  Save Invoice
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleShareWhatsApp}
                  disabled={!taxCalculation || formState.items.length === 0}
                  className="flex-1"
                >
                  Share on WhatsApp
                </Button>
              </div>
            </div>

          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
              <InvoicePreview
                business={formState.business}
                client={formState.client}
                invoice={formState.invoice}
                items={formState.items}
                tax={taxCalculation}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our GST Bill Maker?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional invoice generation with automatic GST calculations, designed for Indian businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto GST Calculation</h3>
              <p className="text-gray-600">
                Automatically calculates CGST, SGST, and IGST based on place of supply with accurate tax amounts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Generation</h3>
              <p className="text-gray-600">
                Generate professional PDF invoices with multiple templates, ready for printing or digital sharing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Preview</h3>
              <p className="text-gray-600">
                See exactly how your invoice will look as you type, with instant updates and formatting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}