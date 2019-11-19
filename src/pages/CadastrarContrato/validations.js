import * as Yup from "yup";

export const contratoValidations = Yup.object({
    firstName: Yup.string()
      .min(15, "Deve ter mais de 15 caracteres")
      .required("Nome deve ser preenchido"),
    lastName: Yup.string()
      .min(15, "Last Name deve conter mais de 15 caracteres")
      .required("Sobrenome deve ser preenchido")
  })