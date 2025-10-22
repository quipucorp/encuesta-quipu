import { FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormSelectProps {
  name: string;
  label: string;
  description?: string;
  options: readonly string[] | string[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: FieldError;
  required?: boolean;
}

export function FormSelect({
  name,
  label,
  description,
  options,
  placeholder = 'Selecciona una opción',
  value,
  onChange,
  error,
  required = false,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <div>
        <Label htmlFor={name} className="text-base font-medium text-ink">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={name}
          className="touch-target"
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
