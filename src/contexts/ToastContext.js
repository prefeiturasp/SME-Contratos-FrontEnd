import React, { useRef, createContext } from "react";
import { Toast } from "primereact/toast";

export const ToastContext = createContext({
  showSuccess() {},
  showInfo() {},
  showWarn() {},
  showError() {},
});

export const ToastContextProvider = ({ children }) => {
  const toast = useRef(null);

  const showSuccess = (mensagem, titulo = "Sucesso") => {
    toast.current.show({
      severity: "success",
      summary: titulo,
      detail: mensagem,
      life: 7000,
      sticky: true,
    });
  };

  const showInfo = (mensagem, titulo = "Informação") => {
    toast.current.show({
      severity: "info",
      summary: titulo,
      detail: mensagem,
      life: 7000,
    });
  };

  const showWarn = (mensagem, titulo = "Aviso") => {
    toast.current.show({
      severity: "warn",
      summary: titulo,
      detail: mensagem,
      life: 7000,
    });
  };

  const showError = (mensagem, titulo = "Erro") => {
    toast.current.show({
      severity: "error",
      summary: titulo,
      detail: mensagem,
      life: 7000,
    });
  };

  return (
    <ToastContext.Provider
      value={{
        showSuccess,
        showInfo,
        showWarn,
        showError,
      }}
    >
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};
