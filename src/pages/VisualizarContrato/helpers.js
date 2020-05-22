import moment from "moment";
import { Cor } from "../../configs/colors.constants";

export const mapStateToPayload = (state) => {
  let payload = {};
  if (state) {
    payload = {
      gestor: state.gestor.uuid,
      nucleo_responsavel: state.nucleo_responsavel,
      tipo_servico: state.tipo_servico_uuid,
      situacao: state.situacao,
      empresa_contratada: state.empresa_contratada.uuid,
      estado_contrato: state.estado,
      data_ordem_inicio: moment(state.data_ordem_inicio).format("YYYY-MM-DD"),
      data_encerramento: moment(state.data_encerramento).format("YYYY-MM-DD"),
      data_assinatura: state.data_assinatura
        ? moment(state.data_assinatura).format("YYYY-MM-DD")
        : null,
      vigencia_em_dias: state.vigencia_em_dias,
      processo: state.processo,
      numero_edital: state.numero_edital,
      total_mensal: state.totalMensal,
      objeto: state.objeto,
      observacoes: state.observacoes,
      termo_contrato: state.contrato.termo_contrato,
      dotacao_orcamentaria: state.dotacao,
      coordenador: state.coordenador,
    };
  }

  return payload;
};

export const corDoPrazo = (dias) => {
  switch (true) {
    case dias <= 30:
      return Cor.vermelho;
    case dias <= 60:
      return Cor.laranja;
    default:
      return Cor.verde;
  }
};

export const corDoEstado = (status) => {
  switch (status.toLowerCase()) {
    case "ativo":
      return Cor.verde;
    default:
      return Cor.cinzaEscuro;
  }
};

export const getUnidadesSelecionadas = (contrato) => {
  let unidades = [];
  contrato.lotes.forEach((lote) => {
    lote.unidades.forEach((unidade) => {
      unidades.push({
        lote: lote.nome,
        unidade: {
          cd_equipamento: unidade.codigo_eol,
          nm_equipamento: unidade.nome,
          dc_tp_equipamento: unidade.equipamento,
          nm_exibicao_diretoria_referencia: unidade.dre,
        },
      });
    });
  });
  return unidades;
};
