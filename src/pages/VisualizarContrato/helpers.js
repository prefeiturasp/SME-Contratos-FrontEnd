import moment from "moment";
import { Cor } from "../../configs/colors.constants";

export const mapStateToPayload = ({
  contrato,
  empresa,
  dotacoes,
  valorTotal,
  objeto,
  gestao,
  observacoes,
  unidadesSelecionadas,
}) => {
  let payload = {};

  payload = {
    gestores: gestao.gestores.map(user => {
      return { gestor: user.uuid };
    }),
    objeto: objeto.tipo_servico.uuid,
    situacao: contrato.situacao,
    empresa_contratada: empresa.uuid,
    data_ordem_inicio: moment(contrato.data_ordem_inicio).format("YYYY-MM-DD"),
    data_encerramento: moment(contrato.data_encerramento).format("YYYY-MM-DD"),
    data_assinatura: contrato.data_assinatura
      ? moment(contrato.data_assinatura).format("YYYY-MM-DD")
      : null,
    vigencia: contrato.vigencia,
    processo: contrato.processo,
    total_mensal: contrato.total_mensal,
    descricao_objeto: objeto.descricao_objeto,
    observacoes: observacoes,
    termo_contrato: contrato.termo_contrato,
    dotacoes: dotacoes.map(dotacao => {
      return {
        dotacao_orcamentaria: dotacao.uuid,
        valor: dotacao.valor,
        empenhos: dotacao.empenhos,
      };
    }),
    valor_total: valorTotal,
    unidades_selecionadas: unidadesSelecionadas,
    unidade_vigencia: contrato.unidade_vigencia,
    referencia_encerramento: contrato.referencia_encerramento,
    edital: objeto.alteracaoEdital
      ? objeto.alteracaoEdital.uuid
      : contrato.edital
      ? contrato.edital.uuid
      : null,
    ata: contrato.ata ? contrato.ata.uuid : null,
  };

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
