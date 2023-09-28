import React, { useEffect, type ReactElement, ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type { UseFormReturn, FieldValues } from "react-hook-form";

interface ConnectFormProps<TFieldValues extends FieldValues> {
  children(children: UseFormReturn<TFieldValues>): ReactElement;
}

const ConnectForm = <TFieldValues extends FieldValues>({
  children,
}: ConnectFormProps<TFieldValues>) => {
  const methods = useFormContext<TFieldValues>();

  return children({ ...methods });
};

export const withForm = <T,>(WrappedComponent: React.ComponentType<T>) => {
  const WithForm = (props: T & { name: string }) => {
    useEffect(() => {
      // Log data on component mount
      console.log(`Component ${WrappedComponent.name} mounted.`);
      return () => {
        // Log data on component unmount
        console.log(`Component ${WrappedComponent.name} unmounted.`);
      };
    }, []);

    useEffect(() => {
      // Log data on component update
      console.log(`Component ${WrappedComponent.name} updated.`);
    });

    return (
      <ConnectForm<any>>
        {({ register, formState: { errors } }) => (
          <section>
            <WrappedComponent {...register(props.name)} {...props} />;
            {errors[props.name] && <p>{errors[props.name]?.message}</p>}
          </section>
        )}
      </ConnectForm>
    );
  };

  WithForm.displayName = `withLogger(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return WithForm;
};
