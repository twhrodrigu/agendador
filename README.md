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

**Google Calendar Variables**

**Provisioning**

To run the provisioning, we are using Vagrant with Ansible. To build your machine, you have to install a virtualization software like VirtualBox. Also, you have to install Vagrant and Ansible in your local machine.

To run Vagrant:

1. vagrant up - to build the machine and run all the ansible tasks (only the first time)
2. vagrant ssh - to access the virtual machine provisioned

Extras:
vagrant halt - to stop the virtual machine after a vagrant ssh command
vagrant destroy - to destroy the virtual machine instance created by vagrant up
vagrant provisioning - once your machine is already up and you need to run new tasks, you don't need to destroy the virtual machine and up again.


Make sure you have exported the following environment variables accordingly:

```
export G_API_CLIENT={{YOUR_CLIENT_ID}}
export G_API_SECRET={{YOUR_API_SECRET}}
export G_API_KEY={{YOUR_API_KEY}}
```

If you are using vagrant to set your keys, you only have to change the ~/.bashrc file with your Google credentials.

Don't know how to create the tokens?  
There is a guide about [how to create the Google API token](https://my.thoughtworks.com/docs/DOC-30275)

**Frontend**

Inside the **public** folder:

1. To watch file modifications and generate a new main.bundle.js, you need to run the command:
  ```gulp```

2. To install new js dependencies without 'vagrant provisioning', you only need to run:
  ```npm install```

3. To run JS tests, you need to run:
  ```gulp test```

**Backend**

1. To install new gems without 'vagrant provisioning', you only need to run:
  ```bundle install```
3. Run the Server  
  ```bundle exec shotgun -o 0.0.0.0```


Well done, the app is running here [http://localhost:9393/index.html](http://localhost:9393/index.html)


## Frontend Tools

[ReactJS](http://facebook.github.io/react/): Javascript Components Framework
[WebPack](webpack.github.io): Javascript Module Loader
[ReactJS MaterialUI](material-ui.com): Component Library based on Material Design
