import { FormEvent, ReactNode } from "react";
import {
  DeepPartial,
  FieldValues,
  FormProvider,
  UseFormReturn,
  ValidationMode,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormProps<
  TFormValues extends FieldValues,
  ValidationSchema extends ZodType = ZodType
> = {
  onSubmit: (fields: TFormValues, methods?: UseFormReturn<TFormValues>) => void;
  className?: string;
  validationSchema?: ValidationSchema;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  defaultValues?: DeepPartial<TFormValues>;
  mode?: keyof ValidationMode;
};

export default function Form<
  TFormValues extends FieldValues,
  ValidationSchema extends ZodType = ZodType
>({
  onSubmit,
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        {/* fieldsets use min-width: min-content by default, so we override it */}
        <fieldset className="flex flex-col w-full min-w-0">
          {children(methods)}
        </fieldset>
      </form>
    </FormProvider>
  );
}
