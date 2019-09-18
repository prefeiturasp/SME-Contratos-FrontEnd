import React from "react";

export default props => (
  <div class="card" style={`"width: ${props.tamanho}"`}>
    <div class="card-body">
      <h5 class="card-title">{props.titulo}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{props.subtitulo}</h6>
      <p class="card-text">
        {props.texto}
      </p>
    </div>
  </div>
);
