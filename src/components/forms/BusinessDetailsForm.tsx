'use client';

import { useState } from 'react';
import { Input, Textarea } from '@/components/ui';
import { BusinessDetails, FormErrors } from '@/types';
import { validateGSTIN } from '@/lib/gst-calculator';
import { ERROR_MESSAGES } from '@/lib/constants';
import { fileToBase64, validateFile } from '@/lib/utils';

interface BusinessDetailsFormProps {
  business: BusinessDetails;
  onChange: (business: BusinessDetails) => void;
  errors?: FormErrors;
}

export function BusinessDetailsForm({ business, onChange, errors = {} }: BusinessDetailsFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: keyof BusinessDetails, value: string) => {
    const updatedBusiness = { ...business, [field]: value };
    onChange(updatedBusiness);

    // Validate GSTIN if it's being changed
    if (field === 'gstin' && value) {
      if (!validateGSTIN(value)) {
        // You could update errors here if needed
      }
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(
      file,
      ['image/jpeg', 'image/png', 'image/jpg'],
      1024 * 1024 // 1MB
    );

    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsUploading(true);

    try {
      const base64 = await fileToBase64(file);
      handleInputChange('logo', base64);
    } catch (error) {
      alert('Failed to upload logo. Please try again.');
      console.error('Logo upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeLogo = () => {
    handleInputChange('logo', undefined);
    // Reset file input
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="form-section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="business-name"
          label="Business Name"
          value={business.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter your business name"
          required
          error={errors.name}
          maxLength={100}
        />

        <Input
          id="business-gstin"
          label="GSTIN (Optional)"
          value={business.gstin || ''}
          onChange={(e) => handleInputChange('gstin', e.target.value.toUpperCase())}
          placeholder="22AAAAA0000A1ZV"
          helperText="15-character GST Identification Number"
          error={errors.gstin}
          maxLength={15}
        />
      </div>

      <Textarea
        id="business-address"
        label="Business Address"
        value={business.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        placeholder="Enter your complete business address"
        required
        error={errors.address}
        rows={3}
        maxLength={500}
      />

      {/* Logo Upload */}
      <div>
        <label className="form-label">Business Logo (Optional)</label>
        <div className="mt-1 flex items-center space-x-4">
          {business.logo ? (
            <div className="relative">
              <img
                src={business.logo}
                alt="Business logo"
                className="h-16 w-16 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                title="Remove logo"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="h-16 w-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          <div className="flex-1">
            <input
              id="logo-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleLogoUpload}
              disabled={isUploading}
              className="hidden"
            />
            <label
              htmlFor="logo-upload"
              className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Logo
                </>
              )}
            </label>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 1MB
            </p>
          </div>
        </div>
        {errors.logo && (
          <p className="form-error">{errors.logo}</p>
        )}
      </div>
    </div>
  );
}