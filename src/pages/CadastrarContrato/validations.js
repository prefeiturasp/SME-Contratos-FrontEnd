import * as Yup from "yup";

export const contratoValidations = Yup.object({
  termo_contrato: Yup.string()
    .min(5, "Deve ter mais de 5 caracteres")
    .required("Termo de contrato deve está preenchido").nullable(),
    tipo_servico: Yup.string()
    .required("Tipo de serviço deve ser selecionado")
    .nullable(),
    vigencia_em_dias: Yup.string()
    .required('Vigência de Contrato deve ser prenchido'),
    empresa_contratada: Yup.string()
    .required('Selecione uma empresa'),
    nucleo_responsavel: Yup.string()
    .required('Selecione um Núcleo'),
    coordenador: Yup.string()
    .required('Selecione um Coordenador'),
    processo: Yup.string()
    .required('Número de processo deve ser preenchido')
});
