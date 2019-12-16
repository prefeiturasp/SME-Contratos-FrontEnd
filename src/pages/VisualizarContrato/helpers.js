import moment from "moment";

export const mapStateToPayload = state => {
  let payload = {};
  if (state) {
    payload = {
      gestor: state.gestor.uuid,
      nucleo_responsavel: state.nucleo_responsavel,
      tipo_servico: state.tipo_servico_uuid,
      situacao: state.situacao,
      empresa_contratada: state.empresa_contratada.uuid,
      estado_contrato: state.estado,
      data_ordem_inicio: moment(state.data_ordem_inicio).format('YYYY-MM-DD'),
      data_encerramento: moment(state.data_encerramento).format('YYYY-MM-DD'),
      data_assinatura: moment(state.data_assinatura).format('YYYY-MM-DD'),
      vigencia_em_dias: state.vigencia_em_dias,
      processo: state.processo,
      numero_edital: state.numero_edital,
      total_mensal: state.totalMensal,
      objeto: state.objeto,
      observacoes: state.observacoes,
      termo_contrato: state.contrato.termo_contrato,
      dotacao_orcamentaria: state.dotacao,
      coordenador: state.coordenador
    };
  }

  return payload;
};
