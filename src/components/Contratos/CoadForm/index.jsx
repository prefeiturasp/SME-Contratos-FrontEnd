import React from "react";
import { Field , useField, ErrorMessage} from "formik";
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
  
  export const CoadRadio = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <FormGroup check inline>
        <Label check htmlFor={props.id || props.name} className="ml-2">
        <Field type="radio" {...field} {...props} />
          {label}
        </Label>
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </FormGroup>
    );
  };
