import React from "react";
import { Field, useField, ErrorMessage } from "formik";
import { FormGroup, Label } from "reactstrap";
import { Editor } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { CALENDAR_PT } from "../../../configs/config.constants";

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
      <Field as="select" className="form-control" {...field} {...props} />
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

export const CoadEditor = ({
  label,
  field,
  form: { setFieldValue },
  ...props
}) => (
  <>
    <FormGroup>
      {label ? (
        <Label check htmlFor={props.id || props.name} className="ml-2">
          {label}
        </Label>
      ) : (
        ""
      )}
      <br />
      <Editor
        {...field}
        {...props}
        headerTemplate={
          <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
          </span>
        }
        onTextChange={e => setFieldValue(field.name, e.htmlValue)}
      />
    </FormGroup>
  </>
);

export const CoadCalendar = ({
  label,
  field,
  form: { setFieldValue },
  ...props
}) => (
  <>
    <Label>{label}</Label>
    <br />

    <Calendar
      {...field}
      {...props}
      onChange={e => setFieldValue(field.name, e.value)}
      locale={CALENDAR_PT}
      dateFormat="dd/mm/yy"
      showIcon={true}
    />
  </>
);
