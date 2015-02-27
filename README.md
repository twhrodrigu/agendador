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

Make sure you have exported the following environment variables accordingly:

```export G_API_CLIENT={{YOUR_CLIENT_ID}}```  
```export G_API_SECRET={{YOUR_API_SECRET}}```  
```export G_API_KEY={{YOUR_API_KEY}}```  

**Frontend**

Inside the **public** folder:

1. Install [nodejs](http://nodejs.org/)  
2. Install Dependencies  
  ```npm install```
3. Compile the stylesheets  
  ```npm run sass```  
  *( repeat if you change something inside /sass )*
4. Compile the javascript  
  ```npm run browserify```  
  *( repeat if you change something inside /js )*


**Backend**

1. Install [Bundler](http://bundler.io/)  
  ```gem install Bundler```
2. Install Dependencies  
  ```bundle install```
3. Run the Server  
  ```bundle exec shotgun```


Well done, the app is running here [http://127.0.0.1:9393/](http://127.0.0.1:9393/)


