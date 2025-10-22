import { FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface FormCheckboxGroupProps {
  name: string;
  label: string;
  description?: string;
  options: readonly string[] | string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: FieldError;
  required?: boolean;
  allowOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function FormCheckboxGroup({
  name,
  label,
  description,
  options,
  values,
  onChange,
  error,
  required = false,
  allowOther = false,
  otherValue = '',
  onOtherChange,
}: FormCheckboxGroupProps) {
  const [showOtherInput, setShowOtherInput] = useState(
    allowOther && values.includes('Otra razón')
  );

  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...values, option]);
      if (option === 'Otra razón' || option === 'Otra') {
        setShowOtherInput(true);
      }
    } else {
      onChange(values.filter((v) => v !== option));
      if (option === 'Otra razón' || option === 'Otra') {
        setShowOtherInput(false);
        onOtherChange?.('');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={name} className="text-base font-medium text-ink">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option} className="flex items-start space-x-3 touch-target">
            <Checkbox
              id={`${name}-${option}`}
              checked={values.includes(option)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option, checked as boolean)
              }
              className="mt-0.5"
              aria-label={option}
            />
            <Label
              htmlFor={`${name}-${option}`}
              className="font-normal text-sm cursor-pointer leading-relaxed flex-1"
            >
              {option}
            </Label>
          </div>
        ))}

        {showOtherInput && allowOther && (
          <div className="ml-7 mt-2">
            <Input
              type="text"
              placeholder="Especifica..."
              value={otherValue}
              onChange={(e) => onOtherChange?.(e.target.value)}
              className="max-w-md"
              aria-label="Especifica otra razón"
            />
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${name}-error`}
          className="text-sm text-destructive font-medium"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
