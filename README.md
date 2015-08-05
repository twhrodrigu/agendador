[![Build Status](https://snap-ci.com/tw-agendador/agendador/branch/master/build_image)](https://snap-ci.com/tw-agendador/agendador/branch/master)

# ThoughtWorks Interview Scheduler

This is an web application that will help the recruitment team scheduling interviews. It is intended to:

- Find the ThoughtWorks consultants that are more appropriate to interview a candidate. At ThoughtWorks we have several types of interviews, and each requires a specific set of skills.
- Find the best time to schedule an interview by looking at the consultant's Google Calendar.

In the future the application might also help by giving the candidate a list of possible date and times to choose from before scheduling an interview.

## Under the Hood

Backend:
- [Grape](https://github.com/ruby-grape/grape): Ruby REST API microframework

Frontend:
- [ReactJS](http://facebook.github.io/react/): Facebook's JavaScript view components framework
- [ReactJS MaterialUI](material-ui.com): Google's Material Design for ReactJS
- [WebPack](webpack.github.io): JavaScript module loader

## Setup

### Provisioning

To run the provisioning, we are using Vagrant with Ansible. To build your machine, you have to install a virtualization software like VirtualBox. Also, you have to install Vagrant and Ansible in your local machine.

To run Vagrant:

- `vagrant up` - to build the machine and run all the ansible tasks (only the first time)
- `vagrant ssh` - to access the virtual machine provisioned

Extras:

- `vagrant halt`: to stop the virtual machine after a vagrant ssh command
- `vagrant destroy`: to destroy the virtual machine instance created by vagrant up
- `vagrant provisioning`: once your machine is already up and you need to run new tasks, you don't need to destroy the virtual machine and up again.

### Environment Variables

If you are using vagrant to set your keys, you only have to change the `~/.profile` file in your host machine and set your own values.

### Google Calendar API
(Adapted from [this guide](https://my.thoughtworks.com/docs/DOC-30275))

#### Creating a Google Application

- Go to [console.developers.google.com](https://console.developers.google.com/) (make sure you're using your ThoughtWorks account)
- Click on "Create Project", pick a name (i.e., "agendador") and click on "Create"
- Select "API & auth" on the sidebar on the left, and then "Consent screen"
- Enter a product name under "Product name" (i.e., "agendador") and click on "Save"
- Select "API & auth" on the sidebar on the left, and then "Credentials"
- Click on "Create new Client ID", select "Web application", enter `http://localhost:9393` under "Authorized Javascript origins" and `http://localhost:9393/` under "Authorized redirect URIs"
- Select "API & auth" on the sidebar on the left, and then "Credentials"
- Click on "Create new key", then on "Server key", leave the "Accept requests from these server IPs addresses" textarea empty and click on "Create"
- Select "API & auth" on the sidebar on the left, click on "APIs", then "Calendar APIs" and then on the "Enable API" button

#### Configuring the Application

Go back to the "Credentials" page ("API &auth", then "Credentials"). In this page are a few identifiers that must be passed to the frontend and backend aplications: "Client ID", "Client secret" and "API key". To do so, we use environment variables.

- Edit the `$HOME/.profile` file on your vagrant instance and append the following:

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

Inside the `public` folder:

- To watch file modifications and generate a new main.bundle.js, you need to run the command:
```
gulp
```

- To install new js dependencies without 'vagrant provisioning', you only need to run:
```
npm install
```

- To run JavaScript tests, you need to run:
```
gulp test
```

### Backend

- To install new gems without 'vagrant provisioning', you only need to run:
```
bundle install
```

- Run the Server  
```
bundle exec shotgun -o 0.0.0.0
```

- Access the application at `http://localhost:9393`.
