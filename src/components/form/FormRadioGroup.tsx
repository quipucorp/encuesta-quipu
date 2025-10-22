import { FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FormRadioGroupProps {
  name: string;
  label: string;
  description?: string;
  options: readonly string[] | string[];
  value?: string;
  onChange: (value: string) => void;
  error?: FieldError;
  required?: boolean;
}

export function FormRadioGroup({
  name,
  label,
  description,
  options,
  value,
  onChange,
  error,
  required = false,
}: FormRadioGroupProps) {
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

      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-3"
        aria-label={label}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-3 touch-target">
            <RadioGroupItem
              value={option}
              id={`${name}-${option}`}
              className="h-5 w-5"
            />
            <Label
              htmlFor={`${name}-${option}`}
              className="font-normal text-sm cursor-pointer leading-relaxed flex-1"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>

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
