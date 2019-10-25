import React, { Component } from 'react'
import { Collapse } from 'antd';

export default class DesignacaoCargosCoad extends Component {
    render() {
        const { Panel } = Collapse;

        const text = `
            A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
            `;

        function callback(key) {
            console.log(key);
            }

        return (
            <div>
                <Collapse defaultActiveKey={['1']} onChange={callback} expandIconPosition={'right'} className="coad-acordion">
                    <Panel header="COAD" key="COAD">
                    <p>{text}</p>
                    </Panel>
                </Collapse>,                
            </div>
        )
    }
}
