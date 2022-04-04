import React from "react";

import { FormGroup, Label, Input } from "reactstrap";

export const InputLabel = props => {
  const { id, label, classe, name, input } = props;
  return (
    <FormGroup>
      <Label for={`${id}`}>{label}</Label>
      <Input
        {...props}
        className={`form-group ${classe ? classe : ""}`}
        value={input.value}
        id={id}
        onChange={input.onChange}
        name={name}
      />
    </FormGroup>
  );
};
