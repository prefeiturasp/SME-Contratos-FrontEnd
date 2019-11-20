import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {BuscaIncrementalServidores} from '../../BuscaIncrementalServidores'

describe('<BuscaIncrementalServidores>', () => {
    it('renders without crashing', () => {
        shallow(<BuscaIncrementalServidores />)
    });
})
