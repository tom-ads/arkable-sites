import { useEffect } from "react";
import { CombinedError } from "urql";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type UseURQLErrorOptions = {
  overridePrefix: boolean;
};

export default function useURQLError<TFormValues extends FieldValues>(
  errors: CombinedError | undefined,
  setError: UseFormSetError<TFormValues>,
  options?: UseURQLErrorOptions
) {
  useEffect(() => {
    if (errors) {
      errors.graphQLErrors.forEach(({ extensions }) => {
        // Handle validation errors
        if (Object.keys(extensions).some((meta) => meta === "validation")) {
          const validation = extensions.validation as Record<string, [string]>;
          Object.keys(validation).forEach((key) => {
            setError(
              (options?.overridePrefix
                ? key.replace(/^input\./, "")
                : key) as Path<TFormValues>,
              {
                message: validation[key][0],
              }
            );
          });
        }
      });
    }
  }, [errors, setError, options?.overridePrefix]);
}
