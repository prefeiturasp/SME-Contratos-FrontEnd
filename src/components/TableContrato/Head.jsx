import React from 'react'

const Head = ({ listaContratos, nomecolunas }) => {
    return (
      <thead>
        <tr>
          <th scope="col">#</th>
          {
            listaContratos.map(key => <th key={key} scope="col">{nomecolunas[key] || key}</th>)
          }
        </tr>
      </thead>
    )
  }
  
export default Head  