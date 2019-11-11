import moment from "moment";

export const mapStateToPayload = state => {
  let payload = {};
  if (state) {
    payload = {
      gestor: state.gestor.uuid,
      divisao: state.divisao,
      tipo_servico: state.tipo_servico_uuid,
      situacao: state.situacao,
      empresa_contratada: state.empresa_contratada.uuid,
      estado_contrato: state.estado,
      data_ordem_inicio: moment(state.data_ordem_inicio).format('YYYY-MM-DD'),
      data_encerramento: moment(state.data_encerramento).format('YYYY-MM-DD'),
      vigencia_em_dias: state.vigencia_em_dias,
      processo: state.processo,
      numero_edital: state.numero_edital,
      total_mensal: state.total_mensal,
      objeto: state.objeto,
      observacoes: state.observacoes,
      documento_fiscal_dre: state.documentoFiscaDre,
      termo_contrato: state.termo_contrato
    };
  }

  return payload;
};
