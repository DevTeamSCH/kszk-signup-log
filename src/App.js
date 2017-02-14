import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

class App extends Component {
  state = { rookies: [] };
  instance = axios.create();
  url = 'https://kszk-signup.firebaseio.com/rookies.json';

  componentWillMount() {
    this.instance.get(this.url, { })
    .then(response => {
      this.setState({ rookies: response.data });
    });
  }

  renderRookies() {
    let rookies = _.map(this.state.rookies, (val, uid) => {
      return { ...val, uid };
    });
    rookies = _.uniqBy(rookies, 'mail');

    return rookies.map((rookie) => {
      return (
        <tr key={rookie.uid}>
          <td>
            {rookie.name}
          </td>
          <td>
            {rookie.mail}
          </td>
        </tr>);
    });
  }

  renderView() {
    if (this.state.rookies.length === 0) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    } else {
      return this.renderRookies();
    }
  }

  render() {
    return (
      <div>
        <div data-uk-sticky className="uk-navbar-container tm-navbar-container" id="navbar">
          <div className="uk-container">
            <nav className="uk-navbar">
              <div className="uk-navbar-left">
                <a className="uk-navbar-item uk-logo">
                  <object data="kszk.svg" type="image/svg+xml" width="30px">
                    <img src="kszk.png" width="30px" alt="logo" />
                  </object>
                  &nbsp;KSZKépzés 2017 LOG
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="body">
          <div id="rolunk" className="uk-section uk-section-default">
            <div className="uk-container">
              <h3>Jelentkezettek:</h3>
              <div>
                <table className="uk-table uk-table-striped">
                  <thead>
                    <tr>
                      <th>Név</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderView()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="uk-section uk-section-secondary uk-light uk-padding-remove">
            <div className="uk-container">
                <p id="footer">
                  Created by DevTeam © 2017.
                </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
