'use client';

import { useState } from 'react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { InvoiceItem, FormErrors } from '@/types';
import { generateId, calculateItemAmount } from '@/lib/utils';
import { GST_RATES, DEFAULT_VALUES } from '@/lib/constants';

interface ItemsTableProps {
  items: InvoiceItem[];
  onChange: (items: InvoiceItem[]) => void;
  errors?: FormErrors;
}

export function ItemsTable({ items, onChange, errors = {} }: ItemsTableProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items];
    const item = { ...updatedItems[index] };

    if (field === 'quantity' || field === 'rate') {
      const numValue = parseFloat(value.toString()) || 0;
      item[field] = Math.max(0, numValue);

      // Recalculate amount when quantity or rate changes
      item.amount = calculateItemAmount(item.quantity, item.rate);
    } else if (field === 'taxPercent') {
      item[field] = parseFloat(value.toString()) || 0;
      // Recalculate amount and tax will be handled in parent
      item.amount = calculateItemAmount(item.quantity, item.rate);
    } else {
      item[field] = value.toString();
    }

    updatedItems[index] = item;
    onChange(updatedItems);
  };

  const addItem = () => {
    if (items.length >= DEFAULT_VALUES.maxItems) {
      alert(`Maximum ${DEFAULT_VALUES.maxItems} items allowed per invoice`);
      return;
    }

    const newItem: InvoiceItem = {
      id: generateId(),
      name: '',
      quantity: DEFAULT_VALUES.quantity,
      rate: 0,
      taxPercent: DEFAULT_VALUES.taxPercent,
      amount: 0,
    };

    onChange([...items, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) {
      alert('At least one item is required');
      return;
    }

    const updatedItems = items.filter((_, i) => i !== index);
    onChange(updatedItems);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === items.length - 1)
    ) {
      return;
    }

    const updatedItems = [...items];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap items
    [updatedItems[index], updatedItems[newIndex]] = [updatedItems[newIndex], updatedItems[index]];

    onChange(updatedItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="space-y-4">
      {/* Items Table Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
        <Button
          onClick={addItem}
          disabled={items.length >= DEFAULT_VALUES.maxItems}
          size="sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Item
        </Button>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Rate (₹)
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Tax %
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Amount (₹)
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    onFocus={() => setFocusedField(`${item.id}-name`)}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter item description"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors[`items.${index}.name`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`items.${index}.name`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`items.${index}.name`]}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    onFocus={() => setFocusedField(`${item.id}-quantity`)}
                    onBlur={() => setFocusedField(null)}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors[`items.${index}.quantity`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`items.${index}.quantity`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`items.${index}.quantity`]}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                    onFocus={() => setFocusedField(`${item.id}-rate`)}
                    onBlur={() => setFocusedField(null)}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors[`items.${index}.rate`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`items.${index}.rate`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`items.${index}.rate`]}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3">
                  <select
                    value={item.taxPercent}
                    onChange={(e) => handleItemChange(index, 'taxPercent', e.target.value)}
                    onFocus={() => setFocusedField(`${item.id}-taxPercent`)}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
                      errors[`items.${index}.taxPercent`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {GST_RATES.map(rate => (
                      <option key={rate} value={rate}>
                        {rate}%
                      </option>
                    ))}
                  </select>
                  {errors[`items.${index}.taxPercent`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`items.${index}.taxPercent`]}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  ₹{item.amount.toFixed(2)}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <button
                      type="button"
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === items.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="p-1 text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Subtotal Row */}
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={4} className="px-4 py-3 text-right">
                Subtotal:
              </td>
              <td className="px-4 py-3 text-right text-lg">
                ₹{subtotal.toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Error Messages */}
      {errors.items && (
        <p className="form-error">{errors.items}</p>
      )}

      {/* Help Text */}
      <p className="text-sm text-gray-500">
        Add items with description, quantity, rate, and tax percentage. Amount is calculated automatically.
      </p>
    </div>
  );
}