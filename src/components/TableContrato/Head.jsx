import React from 'react'

const Head = ({ listaContratos, nomeColunas }) => {
    return (
      <thead>
        <tr>
          <th scope="col">#</th>
          {
            listaContratos.map(key => <th key={key} scope="col">{nomeColunas[key] || key}</th>)
          }
        </tr>
      </thead>
    )
  }
  
export default Head  