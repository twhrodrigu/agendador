var React = require('react'),
    Router = require('react-router');
    Auth = require('../Auth'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var Login = React.createClass({displayName: "Login",
  mixins: [Router.Navigation, Router.State],
  render: function () {
    return (
      React.createElement("div", {className: "login-page"}, 
        React.createElement("h3", null, "Bem Vindo"), 
        React.createElement("p", null, 
        "Este é o agendador de entrevista da ThoughtWorks Brasil", React.createElement("br", null), 
        "Você ainda não esta logado, clique abaixo para prosseguir"
        ), 
        React.createElement(RaisedButton, {primary: true, label: "Acessar", onTouchTap: this._handleTapLogin})
      )
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
