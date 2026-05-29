import { useEffect, useState } from "react";

// Hook reutilizable para aplicar debouncing a cualquier valor. Retrasa la actualización hasta que el usuario deja de escribir durante un tiempo determinado.
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Creamos un temporizador que actualizará el valor solo después del delay configurado.
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
