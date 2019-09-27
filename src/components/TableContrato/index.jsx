import React from "react";
import Row from './Row'
import Head from './Head'


const Table = ({ dadosContrato, nomeColunas }) => {
  const listaContratos = Object.keys(dadosContrato[0])
  return (
    <div class="table">
      <table class="table">
        <Head listaContratos={listaContratos} nomeColunas={nomeColunas} />
        <tbody>
          { dadosContrato.map((registroTabela, key)=> <Row registroTabela={registroTabela} id={key} />) }
        </tbody>
      </table>
    </div>
  )
}

export default Table