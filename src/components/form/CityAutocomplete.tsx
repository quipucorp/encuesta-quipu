import { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FieldError } from 'react-hook-form';
import { colombianCities } from '@/lib/validation';
import { cn } from '@/lib/utils';

interface CityAutocompleteProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: FieldError;
  required?: boolean;
}

export function CityAutocomplete({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
}: CityAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      const filtered = colombianCities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      onChange(suggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-base font-medium text-ink">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <div className="relative">
        <Input
          ref={inputRef}
          id={name}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Ej: Bogotá, Medellín..."
          className="touch-target"
          aria-required={required}
          aria-invalid={!!error}
          aria-autocomplete="list"
          aria-controls={`${name}-suggestions`}
          aria-expanded={showSuggestions}
          aria-activedescendant={
            activeSuggestionIndex >= 0
              ? `${name}-suggestion-${activeSuggestionIndex}`
              : undefined
          }
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul
            id={`${name}-suggestions`}
            role="listbox"
            className="absolute z-50 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.map((city, index) => (
              <li
                key={city}
                id={`${name}-suggestion-${index}`}
                role="option"
                aria-selected={index === activeSuggestionIndex}
                onClick={() => {
                  onChange(city);
                  setShowSuggestions(false);
                }}
                className={cn(
                  'px-4 py-2 cursor-pointer hover:bg-muted transition-colors',
                  index === activeSuggestionIndex && 'bg-muted'
                )}
              >
                {city}
              </li>
            ))}
          </ul>
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
