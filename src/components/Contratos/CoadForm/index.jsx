import React from "react";
import { Field , useField} from "formik";
import {FormGroup, Label} from 'reactstrap';

export const CoadTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <FormGroup>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Field className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </FormGroup>
  );
};

export const CoadSelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <FormGroup>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <select className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </FormGroup>
    );
  };
  
