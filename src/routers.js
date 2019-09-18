import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Teste from './pages/Teste'
import Login from './pages/Login'

export default Routers => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/teste" component={Teste} />
        <Route path="/login" component={Login} />
    </Switch>
)