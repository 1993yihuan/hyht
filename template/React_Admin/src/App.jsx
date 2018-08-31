import React, { Component } from 'react';
import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteIndex from './route';
import Menus from './components/Menus';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="menu-content">
                        <div className="logo">HYHT React</div>
                        <div className="menu-list">
                            <Menus />
                        </div>
                    </div>

                    <div className="content">
                        <RouteIndex />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
