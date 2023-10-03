import { css } from "@emotion/css";
import React, { ReactNode, type ReactElement } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { Space } from "../atomic/atoms";

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
  label?: ReactNode;
}

export const withForm = <T extends IProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithForm = ({ name, onChange, value, label, ...props }: T & IProps) => {
    return (
      <ConnectForm>
        {({ control, formState: { errors } }) => {
          return (
            <Space
              className={css`
                position: relative;
                padding-bottom: 2.5rem;
              `}
            >
              {label && (
                <label
                  className={css`
                    display: block;
                    padding-bottom: 0.3rem;
                    font-size: 1.3rem;
                  `}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              )}
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
              <div
                className={css`
                  color: red;
                  position: absolute;
                  left: 0;
                  font-size: 1.3rem;
                  bottom: 1rem;
                `}
              >
                {errors?.[name] && String(errors[name]?.message)}
              </div>
            </Space>
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
