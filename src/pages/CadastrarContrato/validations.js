import * as Yup from "yup";

export const contratoValidations = Yup.object({
  termo_contrato: Yup.string()
    .min(5, "Deve ter mais de 5 caracteres")
    .required("Nome deve ser preenchido"),
  tipo_servico: Yup.string()
    .required("Sobrenome deve ser preenchido"),
  numero_processo: Yup.number(),
  estado_contrato: Yup.string()
    .required('Deve selecionar um estado de contrato'),
  situacao: Yup.string()
    .required('Deve seleciona uma situação'),
  data_assinatura: Yup.string(),
  data_ordem_inicio: Yup.date()
    .required('Deve selecionar uma data válida'),
  vigencia_em_dias: Yup.number()
    .required('Deve informar número de vigência em dias')

});
