import { BusinessDetails, ClientDetails, InvoiceDetails, InvoiceItem, TaxCalculation } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/constants';

interface InvoicePreviewProps {
  business: BusinessDetails;
  client: ClientDetails;
  invoice: InvoiceDetails;
  items: InvoiceItem[];
  tax?: TaxCalculation | null;
}

export function InvoicePreview({
  business,
  client,
  invoice,
  items,
  tax
}: InvoicePreviewProps) {
  const hasValidData = business.name && client.name && items.some(item => item.name && item.quantity > 0 && item.rate > 0);

  if (!hasValidData) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Invoice Preview</h3>
        <p className="text-gray-500">
          Fill in the form details to see a live preview of your invoice
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 space-y-6" style={{ minHeight: '600px' }}>
        {/* Header */}
        <div className="flex justify-between items-start">
          {/* Business Info */}
          <div className="flex-1">
            {business.logo && (
              <img
                src={business.logo}
                alt="Business Logo"
                className="h-12 w-12 object-contain mb-2"
              />
            )}
            <h2 className="text-xl font-bold text-gray-900">{business.name}</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{business.address}</p>
            {business.gstin && (
              <p className="text-sm text-gray-600">GSTIN: {business.gstin}</p>
            )}
          </div>

          {/* Invoice Details */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h1>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">Invoice No:</span> <span className="font-medium">{invoice.invoiceNo}</span></p>
              <p><span className="text-gray-600">Date:</span> <span className="font-medium">{formatDate(invoice.invoiceDate)}</span></p>
              {invoice.dueDate && (
                <p><span className="text-gray-600">Due Date:</span> <span className="font-medium">{formatDate(invoice.dueDate)}</span></p>
              )}
              {invoice.placeOfSupply && (
                <p><span className="text-gray-600">Place of Supply:</span> <span className="font-medium">{invoice.placeOfSupply}</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Bill To:</h3>
          <div className="text-sm">
            <p className="font-medium text-gray-900">{client.name}</p>
            <p className="text-gray-600 whitespace-pre-wrap">{client.address}</p>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2">Item Description</th>
                <th className="text-center py-2 w-20">Qty</th>
                <th className="text-right py-2 w-24">Rate</th>
                <th className="text-right py-2 w-24">Tax %</th>
                <th className="text-right py-2 w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.filter(item => item.name && item.quantity > 0).map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-2">{item.name}</td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">{formatCurrency(item.rate)}</td>
                  <td className="text-right py-2">{item.taxPercent}%</td>
                  <td className="text-right py-2 font-medium">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        {tax && (
          <div className="flex justify-end">
            <div className="w-80 space-y-2">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(tax.subtotal)}</span>
              </div>

              {/* Tax Breakdown */}
              {tax.cgst > 0 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CGST:</span>
                    <span className="font-medium">{formatCurrency(tax.cgst)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SGST:</span>
                    <span className="font-medium">{formatCurrency(tax.sgst)}</span>
                  </div>
                </>
              )}

              {tax.igst > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IGST:</span>
                  <span className="font-medium">{formatCurrency(tax.igst)}</span>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between pt-2 border-t-2 border-gray-200">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold">{formatCurrency(tax.totalAmount)}</span>
              </div>

              {/* Amount in Words */}
              <div className="bg-gray-50 p-3 rounded text-xs">
                <p className="text-gray-600 mb-1">Amount in Words:</p>
                <p className="font-medium capitalize">{tax.amountInWords}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Generated with {APP_CONFIG.name} by {APP_CONFIG.author}
          </p>
        </div>
      </div>
    </div>
  );
}