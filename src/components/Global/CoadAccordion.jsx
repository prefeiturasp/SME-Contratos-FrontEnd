import React, { useState, useEffect } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import { PropTypes } from "prop-types";

const isBoolean = v => typeof v === "boolean";

const CoadAccordion = props => {
  const { titulo, aberto } = props;
  const [collapse, setCollapse] = useState(isBoolean(aberto) ? aberto : false);

  const toggle = () => setCollapse(!collapse);

  useEffect(() => {
    if (isBoolean(aberto)) setCollapse(aberto);
  }, [aberto]);

  return (
    <div className="accordion">
      <div className="card caod-card-accordion px-0">
        <div
          className="card-header coad-card-header-accrodion"
          onClick={toggle}
          style={{ cursor: "pointer" }}
        >
          <h5 className="mb-0  d-flex justify-content-end">
            <span className="w-100 pt-2">{titulo}</span>
            <button
              type="button"
              className="btn btn-link"
              aria-expanded="true"
              onClick={toggle}
            >
              {collapse ? (
                <i className="fas fa-chevron-up"></i>
              ) : (
                <i className="fas fa-chevron-down"></i>
              )}
            </button>
          </h5>
        </div>
      </div>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>{props.children}</CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

CoadAccordion.prototype = {
  tiulo: PropTypes.string,
};

CoadAccordion.defaultProps = {
  titulo: "",
};

export default CoadAccordion;
