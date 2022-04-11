import React from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { Col, Row } from "reactstrap";
import { Button } from "primereact/button";
import { redirect } from "../../utils/redirect";

export default () => {
  return (
    <Page>
      <h4>Atas</h4>
      <Container>
        <Row>
          <Col lg={12} xl={12}>
            <span className="float-right">
              <Button
                icon="pi pi-file"
                label="Nova Ata"
                style={{ marginBottom: ".80em" }}
                className="btn-coad-background-outline"
                onClick={() => {
                  redirect(`#/atas/`);
                }}
              />
            </span>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
