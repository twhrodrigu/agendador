var React = require('react'),
    Actions = require('../actions/Actions'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var Login = React.createClass({
  getStyles: function() {
    return {
      loginPage: {
        padding: 16
      }
    };
  },

  render: function () {
    var styles = this.getStyles();
    return (
      <div style={styles.loginPage}>
        <h3>Bem Vindo</h3>
        <p>
        Este é o agendador de entrevista da ThoughtWorks Brasil<br/>
        Você ainda não esta logado, clique abaixo para prosseguir
        </p>
        <RaisedButton ref='login' primary={true} label="Acessar" onTouchTap={Actions.login} />
      </div>
    )
  }
});

module.exports = Login;
