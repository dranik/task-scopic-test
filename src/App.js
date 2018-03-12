import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './components/index';
import Show from './components/show';
import Edit from './components/edit';
import { initialFetchProducts } from './actions';
import { connect } from 'react-redux';
import 'react-dates/initialize';


class App extends Component {
  render() {
    return (
        <div>
          <BrowserRouter>
              <Switch>
                <Route path="/edit/:id" component={Edit} />
                <Route path="/new" component={Edit} />
                <Route path="/:id" component={Show} />
                <Route path="/" component={Index} />
              </Switch>
          </BrowserRouter>
        </div>
    );
  }

  componentDidMount() {
    this.props.initialFetchProducts();
  }
}

export default connect(null , { initialFetchProducts })(App);
