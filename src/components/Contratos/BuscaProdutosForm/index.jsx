import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Row, Col } from "reactstrap";

import { redirect } from "../../../utils/redirect";

export function BuscaProdutosForm() {
  return (
    <Card className="filtro filtroBorda">
      <Row>
        <Col lg={12} xl={12}>
          <span className="float-right">
            <Button
              icon="pi pi-file"
              label="Novo Produto"
              style={{ marginBottom: ".80em" }}
              className="btn-coad-background-outline"
              onClick={() => {
                redirect(`#/produtos/`);
              }}
            />
          </span>
        </Col>
      </Row>
    </Card>
  );
}
