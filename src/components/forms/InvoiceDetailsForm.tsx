'use client';

import { Input, Select } from '@/components/ui';
import { InvoiceDetails, FormErrors } from '@/types';
import { INDIAN_STATES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

interface InvoiceDetailsFormProps {
  invoice: InvoiceDetails;
  onChange: (invoice: InvoiceDetails) => void;
  errors?: FormErrors;
}

export function InvoiceDetailsForm({ invoice, onChange, errors = {} }: InvoiceDetailsFormProps) {
  const handleInputChange = (field: keyof InvoiceDetails, value: any) => {
    const updatedInvoice = { ...invoice, [field]: value };
    onChange(updatedInvoice);
  };

  const handleDateChange = (field: 'invoiceDate' | 'dueDate', value: string) => {
    const date = value ? new Date(value) : undefined;
    handleInputChange(field, date);
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Set minimum date for due date (can't be before invoice date)
  const minDueDate = formatDateForInput(invoice.invoiceDate);

  return (
    <div className="form-section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="invoice-no"
          label="Invoice Number"
          value={invoice.invoiceNo}
          onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
          placeholder="INV-2024-0001"
          required
          error={errors.invoiceNo}
          helperText="Auto-generated sequential number"
        />

        <Select
          id="place-of-supply"
          label="Place of Supply"
          value={invoice.placeOfSupply}
          onChange={(e) => handleInputChange('placeOfSupply', e.target.value)}
          required
          error={errors.placeOfSupply}
          options={INDIAN_STATES.map(state => ({
            value: state.code,
            label: `${state.name} (${state.code})`,
          }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="invoice-date"
          label="Invoice Date"
          type="date"
          value={formatDateForInput(invoice.invoiceDate)}
          onChange={(e) => handleDateChange('invoiceDate', e.target.value)}
          required
          error={errors.invoiceDate}
          max={formatDateForInput(new Date())} // Can't be future dated
        />

        <Input
          id="due-date"
          label="Due Date (Optional)"
          type="date"
          value={formatDateForInput(invoice.dueDate)}
          onChange={(e) => handleDateChange('dueDate', e.target.value)}
          error={errors.dueDate}
          min={minDueDate} // Due date can't be before invoice date
          helperText="Leave empty if not applicable"
        />
      </div>
    </div>
  );
}