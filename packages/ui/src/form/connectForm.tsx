import React, { type ReactElement } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

interface ConnectFormProps<TFieldValues extends FieldValues> {
  children(children: UseFormReturn<TFieldValues>): ReactElement;
}

const ConnectForm = <TFieldValues extends FieldValues>({
  children,
}: ConnectFormProps<TFieldValues>) => {
  const methods = useFormContext<TFieldValues>();

  return children({ ...methods });
};
interface IProps {
  name: string;
  onChange?: (e: any) => void;
  value?: any;
}

export const withForm = <T extends IProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithForm = ({ name, onChange, value, ...props }: T & IProps) => {
    return (
      <ConnectForm>
        {({ control, formState: { errors } }) => {
          // const handleChange = (value: any) => {
          //   // setValue(name, value);
          //   onChange && onChange(value);
          // };
          return (
            <>
              <Controller
                defaultValue={""}
                name={name}
                control={control}
                render={({ field }) => {
                  const handleChange = (value: any) => {
                    field.onChange(value);
                    onChange && onChange(value);
                  };
                  return (
                    <WrappedComponent
                      {...field}
                      {...(props as T)}
                      onChange={handleChange}
                      value={value !== undefined ? value : field.value}
                      // defaultValue={getValues(name)}
                    />
                  );
                }}
              />
              <>{errors?.[name] && errors[name]?.message}</>
            </>
          );
        }}
      </ConnectForm>
    );
  };

  WithForm.displayName = `withLogger(${
    WrappedComponent.name || WrappedComponent.displayName
  })`;
  return WithForm;
};
