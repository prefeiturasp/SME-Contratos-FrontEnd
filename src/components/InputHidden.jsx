import React from "react";

import { Input } from "reactstrap";

export const InputHidden = props => {
    const {name, input} = props
  return (
      <Input 
          {...props}
          type={'hidden'}
          value={input.value} 
          onChange={input.onChange}
          name={name}
        />
  );
};