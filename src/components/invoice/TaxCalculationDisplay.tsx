import { TaxCalculation } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface TaxCalculationDisplayProps {
  calculation: TaxCalculation;
}

export function TaxCalculationDisplay({ calculation }: TaxCalculationDisplayProps) {
  return (
    <div className="space-y-3">
      {/* Tax Breakdown */}
      <div className="space-y-2">
        {calculation.cgst > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">CGST:</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(calculation.cgst)}
            </span>
          </div>
        )}

        {calculation.sgst > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">SGST:</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(calculation.sgst)}
            </span>
          </div>
        )}

        {calculation.igst > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">IGST:</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(calculation.igst)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Total Tax:</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(calculation.totalTax)}
          </span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between items-center py-3 bg-primary-50 px-4 rounded-lg">
        <span className="text-lg font-semibold text-primary-900">Total Amount:</span>
        <span className="text-xl font-bold text-primary-900">
          {formatCurrency(calculation.totalAmount)}
        </span>
      </div>

      {/* Amount in Words */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Amount in Words:</p>
        <p className="font-medium text-gray-900 capitalize">
          {calculation.amountInWords}
        </p>
      </div>

      {/* Tax Calculation Note */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Tax Calculation:</p>
            {calculation.cgst > 0 ? (
              <p>Same state transaction: CGST + SGST applied</p>
            ) : (
              <p>Inter-state transaction: IGST applied</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}