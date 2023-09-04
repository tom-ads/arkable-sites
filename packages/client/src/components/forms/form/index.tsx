import { FormEvent, ReactNode, useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  UseFormReturn,
  ValidationMode,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CombinedError } from "urql";
import useURQLError from "@/hooks/use-urql-error";

export type FormProps<
  TFormValues extends FieldValues,
  ValidationSchema extends ZodType = ZodType
> = {
  onSubmit: (fields: TFormValues, methods?: UseFormReturn<TFormValues>) => void;
  className?: string;
  validationSchema?: ValidationSchema;
  error?: CombinedError;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  defaultValues?: DefaultValues<TFormValues>;
  mode?: keyof ValidationMode;
};

export function Form<
  TFormValues extends FieldValues,
  ValidationSchema extends ZodType = ZodType
>({
  onSubmit,
  error,
  validationSchema,
  defaultValues,
  mode = "all",
  children,
}: FormProps<TFormValues, ValidationSchema>) {
  const methods = useForm({
    mode,
    defaultValues: defaultValues,
    resolver: validationSchema && zodResolver(validationSchema),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();

    methods.handleSubmit((data: TFormValues) => onSubmit(data, methods))(event);
  };

  /*
    Sometimes we might make an async request that doesn't contain the correct defaultValues
    during render. This useEffect will reset form state once that operation is complete.
  */
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);

  useURQLError<TFormValues>(error, methods.setError, { overridePrefix: true });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        {/* fieldset uses min-width: min-content by default, so we override it */}
        <fieldset className="flex flex-col w-full min-w-0">
          {children(methods)}
        </fieldset>
      </form>
    </FormProvider>
  );
}
