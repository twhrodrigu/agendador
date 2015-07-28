# MVP Agendador de Entrevistas

A idéia para o MVP é um campo onde o/a recruiter possa entrar o horário onde uma entrevista precisa ser agendada e clicar em "AGENDAR".
- Extras:
  - Filtrar por role
  - Filtrar por escritorio
  - Filtrar por skill

O/A recruiter então é direcionado para uma página com uma lista de todas as pessoas de POA que estão livres naquele horário.
- Extras:
  - Botão para esconder alguém da lista
  - Ordenar por maior nivel de skill

## Dev Setup

### Provisioning

To run the provisioning, we are using Vagrant with Ansible. To build your machine, you have to install a virtualization software like VirtualBox. Also, you have to install Vagrant and Ansible in your local machine.

To run Vagrant:

1. vagrant up - to build the machine and run all the ansible tasks (only the first time)
2. vagrant ssh - to access the virtual machine provisioned

Extras:

- `vagrant halt`: to stop the virtual machine after a vagrant ssh command
- `vagrant destroy`: to destroy the virtual machine instance created by vagrant up
- `vagrant provisioning`: once your machine is already up and you need to run new tasks, you don't need to destroy the virtual machine and up again.

### Environment Variables

If you are using vagrant to set your keys, you only have to change the `~/.profile` file in your host machine and set your own values.

### Google Calendar API
(Adapted from [this guide](https://my.thoughtworks.com/docs/DOC-30275))

#### Creating a Google application

* Go to https://console.developers.google.com/ (make sure you're using your ThoughtWorks account)
* Click on "Create Project", pick a name (i.e., "agendador-1") and click on "Create"
* Select "API & auth" on the sidebar on the left, and then "Consent screen"
* Enter a product name under "Product name" (i.e., "agendador") and click on "Save"
* Select "API & auth" on the sidebar on the left, and then "Credentials"
* Click on "Create new Client ID", select "Web application", enter "http://localhost:9393" under "Authorized Javascript origins" and "http://localhost:9393/" under "Authorized redirect URIs"
* Select "API & auth" on the sidebar on the left, and then "Credentials"
* Click on "Create new key", then on "Server key", leave the "Accept requests from these server IPs addresses" textarea empty and click on "Create"
* Select "API & auth" on the sidebar on the left, click on "APIs", then "Calendar APIs" and then on the "Enable API" button

#### Configuring the application

Go back to the "Credentials" page ("API &auth", then "Credentials"). In this page are a few identifiers that must be passed to the frontend and backend aplications: "Client ID", "Client secret" and "API key". To do so, we use environment variables.

* Edit the `$HOME/.profile` file on your vagrant instance and append the following:

```
export GOOGLE_API_CLIENT="<Client ID>"
export GOOGLE_API_SECRET="<Client secret>"
export GOOGLE_API_KEY="<API keys>"
```

### Jigsaw API

You should define the following environment variable to connect to the Jigsaw API:

```
export JIGSAW_API_SECRET="<Jigsaw api secret>"
```

The JIGSAW authorization token is unique for each environment/user and must be requested directly to the Staffing Team on `jigsaw-support@thoughtworks.com`.

### Frontend

Inside the **public** folder:

1. To watch file modifications and generate a new main.bundle.js, you need to run the command:
```
gulp
```

2. To install new js dependencies without 'vagrant provisioning', you only need to run:
```
npm install
```

3. To run JS tests, you need to run:
```
gulp test
```

### Backend

1. To install new gems without 'vagrant provisioning', you only need to run:
```
bundle install
```

3. Run the Server  
```
bundle exec shotgun -o 0.0.0.0
```

Well done, the app is running here [http://localhost:9393/index.html](http://localhost:9393/index.html)


## Frontend Tools

* [ReactJS](http://facebook.github.io/react/): Javascript Components Framework
* [WebPack](webpack.github.io): Javascript Module Loader
* [ReactJS MaterialUI](material-ui.com): Component Library based on Material Design
