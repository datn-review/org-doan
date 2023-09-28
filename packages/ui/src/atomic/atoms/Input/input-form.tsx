import React, { memo } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  type UseFormReturn,
} from "react-hook-form";

// we can use React.memo to prevent re-render except isDirty state changed
const NestedInput = memo(
  ({
    register,
    formState: { isDirty },
    name,
  }: UseFormReturn & { name: string }) => (
    <div>
      <input {...register(name)} />
      {isDirty && <p>This field is dirty</p>}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
);

export const InputForm = ({ name }: { name: string }) => {
  const methods = useFormContext();

  return <NestedInput {...methods} name={name} />;
};

// export default function App() {
//   const methods = useForm();
//   const onSubmit = (data: any) => console.log(data);
//   console.log(methods.formState.isDirty); // make sure formState is read before render to enable the Proxy

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         <InputForm name="ok" />
//         <input type="submit" />
//       </form>
//     </FormProvider>
//   );
// }
