import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.less';
import betaAction from './redux/action/beta';
import { connect } from 'react-redux';
import { Store } from "./redux/index";

@connect(state => ({
    beta: state.beta
}))
class App extends Component {
    changeReduxText() {
        Store.dispatch(betaAction.betaChange());
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to hyht</h1>
                </header>
                <div>{this.props.beta.text}</div>
                <p
                    className="App-intro"
                    onClick={() => {
                        this.changeReduxText();
                    }}
                >
                    React+Redux模板
                </p>
            </div>
        );
    }
}

export default App;
