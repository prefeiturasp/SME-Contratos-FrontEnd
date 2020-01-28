import React, { Component } from "react";
import { Dialog } from "primereact/dialog";

export default class Finalizar extends Component {
  state = {};

  render() {
    return (
      <>
        <Dialog
          className="coad-dialog"
          header="Cadastrar contrato"
          visible={true}
          style={{ width: "50vw", "z-index": 1000 }}
          modal={true}
          onHide={false}
          footer={
            <div className="pb-3">
              <button
                className="btn btn-coad-background-outline"
                onClick={() => this.props.jumpToStep(0)}
              >
                Não
              </button>
              <button type="submit" className="btn btn-coad-primary">
                Sim
              </button>
            </div>
          }
        >
          Deseja cadastrar contato?
        </Dialog>
      </>
    );
  }
}
