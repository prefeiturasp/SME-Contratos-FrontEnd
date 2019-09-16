import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Teste from './pages/Teste'

export default Routers => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/teste" component={Teste} />
    </Switch>
)