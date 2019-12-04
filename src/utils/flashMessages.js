import React, { Fragment, useState } from "react";
import { Alert } from "reactstrap";

export const setFlashMessage = (message, key) => {
  localStorage.setItem(key, message);
};

export const getFlashMessage = key => {
  if (localStorage.getItem(key)) {
    const message = localStorage.getItem(key);
    localStorage.removeItem(key);
    return message;
  }
};
