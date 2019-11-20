import React from 'react';
import ReactDOM from 'react-dom';
import {BuscaIncrementalServidores} from '../../BuscaIncrementalServidores'


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BuscaIncrementalServidores />, div);
});
