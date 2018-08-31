import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from "../page/Index";
import Map from "../page/Map";
import List from "../page/List";

class RoutesIndex extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/Map" component={Map} />
                <Route exact path="/List" component={List} />
            </Switch>
        );
    }
}

export default RoutesIndex;
