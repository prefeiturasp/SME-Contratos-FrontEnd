import moment from "moment";
import { Cor } from "../../configs/colors.constants";

export const mapStateToPayload = (state, incluir) => {
  let payload = {};
  if (state) {
    payload = {
      gestor: state.gestor ? state.gestor.uuid : null,
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
      vigencia: state.vigencia,
      processo: state.processo,
      total_mensal: state.totalMensal,
      objeto: state.objeto,
      observacoes: state.observacoes,
      termo_contrato: state.contrato.termo_contrato
        ? state.contrato.termo_contrato
        : state.termo_contrato,
      coordenador: state.coordenador,
      dotacoes: state.dotacoes_orcamentarias.map(dotacao => {
        return {
          dotacao_orcamentaria: dotacao.uuid,
          valor: dotacao.valor,
          empenhos: dotacao.empenhos,
        };
      }),
      valor_total: state.valor_total,
      unidades_selecionadas: state.unidades_selecionadas,
      unidade_vigencia: state.unidade_vigencia,
      referencia_encerramento: state.referencia_encerramento,
      edital: state.alteracaoEdital
        ? state.alteracaoEdital.uuid
        : state.contrato.edital
        ? state.contrato.edital.uuid
        : null,
      ata: state.ata ? state.ata.uuid : null,
    };
    if (incluir) {
      delete payload.unidades_selecionadas;
    }
  }

  return payload;
};

export const corDoPrazo = dias => {
  switch (true) {
    case dias <= 30:
      return Cor.vermelho;
    case dias <= 60:
      return Cor.laranja;
    default:
      return Cor.verde;
  }
};

export const corDoEstado = status => {
  switch (status.toLowerCase()) {
    case "ativo":
      return Cor.verde;
    default:
      return Cor.cinzaEscuro;
  }
};

export const getUnidadesSelecionadas = contrato => {
  let unidades = [];
  contrato.lotes.forEach(lote => {
    lote.unidades.forEach(unidade => {
      unidades.push({
        lote: lote.nome,
        suplentes: lote.suplentes,
        rf_fiscal: lote.rf_fiscal,
        nome_fiscal: lote.nome_fiscal,
        unidade: {
          cd_equipamento: unidade.codigo_eol,
          nm_equipamento: unidade.nome,
          dc_tp_equipamento: unidade.equipamento,
          nm_exibicao_diretoria_referencia: unidade.dre,
          logradouro: unidade.logradouro,
          bairro: unidade.bairro,
        },
      });
    });
  });
  return unidades;
};
