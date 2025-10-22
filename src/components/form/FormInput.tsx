import { UseFormRegister, FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormInputProps {
  name: string;
  label: string;
  description?: string;
  type?: 'text' | 'number' | 'email' | 'tel';
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  helpText?: string;
  className?: string;
}

export function FormInput({
  name,
  label,
  description,
  type = 'text',
  placeholder,
  register,
  error,
  required = false,
  helpText,
  className,
}: FormInputProps) {
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

      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber: type === 'number' })}
        className={cn('touch-target', className)}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${name}-error` : helpText ? `${name}-help` : undefined
        }
      />

      {helpText && !error && (
        <p id={`${name}-help`} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}

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
