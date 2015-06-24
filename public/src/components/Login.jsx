var React = require('react'),
    Router = require('react-router');
    Auth = require('../Auth'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var Login = React.createClass({
  mixins: [Router.Navigation, Router.State],
  render: function () {
    return (
      <div className="login-page">
        <h3>Bem Vindo</h3>
        <p>
        Este é o agendador de entrevista da ThoughtWorks Brasil<br/>
        Você ainda não esta logado, clique abaixo para prosseguir
        </p>
        <RaisedButton primary={true} label="Acessar" onTouchTap={this._handleTapLogin}/>
      </div>
    )
  },

  _handleTapLogin: function (e) {
    var nextPath = this.getQuery().nextPath;
    Auth.login().then(function (loggedIn) {
      if (Auth.loggedIn()) {
        if (nextPath) {
          this.transitionTo(nextPath);
        } else {
          this.replaceWith('/');
        }
      }
    }.bind(this));
  }
});

module.exports = Login;
