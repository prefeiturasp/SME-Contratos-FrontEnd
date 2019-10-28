import React, { useState } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import { PropTypes } from "prop-types";

const CoadAccordion = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);

  const {titulo} = props;
  return (
    <div className="accordion">
      <div class="card caod-card-accordion px-0">
        <div class="card-header coad-card-header-accrodion">
          <h5 class="mb-0  d-flex justify-content-end">
              <span className="w-100 pt-2">{titulo}</span>
            <button
              className="btn btn-link"
              aria-expanded="true"
              onClick={toggle}
            >
              {collapse ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
            </button>
          </h5>
        </div>
      </div>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>
            {props.children}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};


CoadAccordion.prototype = {
  tiulo: PropTypes.string
}

CoadAccordion.defaultProps = {
  titulo : ''
}

export default CoadAccordion;