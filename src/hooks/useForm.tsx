import { ChangeEvent, useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [validation, setValidation] = useState(
    Object.keys(initialState).reduce((prev, curr) => {
      return {
        ...prev,
        [curr]:
          (initialState as any)[curr] !== undefined &&
          ((initialState as any)[curr] as string).toString().length > 0
            ? true
            : false,
      };
    }, {})
  );

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
    validate(target.name, target.value);
  };

  const reset = (newValues?: {}) => {
    setValues(newValues ? newValues : initialState);
    validateAll(newValues ? newValues : initialState);
  };

  const validate = (name: string, value: string | number) => {
    setValidation({
      ...validation,
      [name]: value.toString().length == 0 ? false : true,
    });
  };

  const validateAll = (values: {}) => {
    setValidation(
      Object.keys(values).reduce((prev, curr) => {
        return {
          ...prev,
          [curr]:
            (values as any)[curr] !== undefined &&
            ((values as any)[curr] as string).toString().length > 0
              ? true
              : false,
        };
      }, {})
    );
  };

  return [values, handleInputChange, reset, validation];
};
