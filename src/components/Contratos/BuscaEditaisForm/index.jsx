import React, { useState } from 'react';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {InputMask} from 'primereact/inputmask';
import { Row, Col } from "reactstrap";


import SelecionaTipoEdital from '../SelecionaTipoEdital'
import { SelecionaTipoServico } from '../SelecionaTipoServico'
import { SelecionaDataContrato } from '../SelecionaDataContrato'
import { redirect } from "../../../utils/redirect";
import './style.scss'
import SelecionaSituacaoEdital from '../SelecionaSituacaoEdital';

export function BuscaEditaisForm({onBuscarClick}) {
    const [filtros, setFiltros] = useState({})
    
    const setaTipo = (tipo_contratacao) => {
        setFiltros({...filtros, tipo_contratacao})
    }

    const setaSituacao = (status) => {
        setFiltros({...filtros, status})
    }
   
    const setaTipoServico = (objeto) => {
        setFiltros({...filtros, objeto})
    }

    const setaDataInicialContrato = (data_inicial) => {
        if (data_inicial) {
            setFiltros({...filtros, data_inicial})
        }
    }

    const setaDataFinalContrato = (data_final) => {
        if (data_final) {
            setFiltros({...filtros, data_final})
        }
    }
   
    const handleClickBuscar = () => {
        onBuscarClick(filtros)
    }

    const limparFiltros = () => {
      setFiltros({
        tipo_contratacao: '',
        status: '',
        data_inicial: '',
        data_final: '',
        numero: '',
        objeto: '',
      })
    }

    const footer = <span>
                        <Button className="float-right" label="Consultar" style={{marginRight: '.25em'}} onClick={handleClickBuscar}/>
                        <Button className="float-right" label="Limpar Filtros" style={{marginRight: '.25em'}} onClick={limparFiltros}/>
                    </span>;

    return (
        <Card footer={footer} className='filtro filtroBorda'>
        <Row>
          <Col lg={12} xl={12}>
            <span className="float-right">
              <Button
                icon="pi pi-file"
                label="Criar Edital"
                style={{ marginBottom: ".80em" }}
                className="btn-coad-background-outline"
                onClick={event => {
                  redirect(`#/edital/`);
                }}
              />
            </span>
          </Col>
        </Row>
        <div className="p-grid p-fluid">
            <div className="card card-w-title filtro">

                <div className="p-grid">

                    <div className="p-col-6">
                        <h6>Nº do Edital</h6>
                        <InputMask
                            mask="********/9999"
                            value={filtros.numero} 
                            onChange={(e) => setFiltros({...filtros, numero: e.target.value})}
                            autoClear={false}
                            placeholder="Ex: XXXXXXXX/XXXX"
                        />
                    </div>

                    <div className="p-col-6">
                        <h6>Status</h6>
                        <SelecionaSituacaoEdital situacao={filtros.status} onSelect={setaSituacao}/>
                    </div>

                    <div className="p-col-6">
                        <h6>Tipo de Contratação</h6>
                        <SelecionaTipoEdital situacao={filtros.tipo_contratacao} onSelect={setaTipo}/>
                    </div>

                    <div className="p-col-6 "> 
                        <h6>Objeto</h6>
                        <SelecionaTipoServico tipoServico={filtros.objeto} onSelect={setaTipoServico}/>
                    </div>

                    <div className="p-col-6">
                        <h6>Período de Homologação</h6>
                        <div className="p-grid">
                            <div className="p-col-6">
                                <SelecionaDataContrato tipo={"De"} data={filtros.data_inicial} maxDate={filtros.data_final} onSelect={setaDataInicialContrato}/>
                            </div>
                            <div className="p-col-6">
                                <SelecionaDataContrato tipo={"Até"}  data={filtros.data_final} minDate={filtros.data_inicial} onSelect={setaDataFinalContrato}/>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
        </Card>

    );
}