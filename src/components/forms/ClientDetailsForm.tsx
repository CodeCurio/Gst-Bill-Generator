'use client';

import { Input, Textarea } from '@/components/ui';
import { ClientDetails, FormErrors } from '@/types';

interface ClientDetailsFormProps {
  client: ClientDetails;
  onChange: (client: ClientDetails) => void;
  errors?: FormErrors;
}

export function ClientDetailsForm({ client, onChange, errors = {} }: ClientDetailsFormProps) {
  const handleInputChange = (field: keyof ClientDetails, value: string) => {
    const updatedClient = { ...client, [field]: value };
    onChange(updatedClient);
  };

  return (
    <div className="form-section">
      <Input
        id="client-name"
        label="Client Name"
        value={client.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        placeholder="Enter client name"
        required
        error={errors.name}
        maxLength={100}
      />

      <Textarea
        id="client-address"
        label="Client Address"
        value={client.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        placeholder="Enter client's complete address"
        required
        error={errors.address}
        rows={3}
        maxLength={500}
      />
    </div>
  );
}