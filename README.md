# Social network app

Social network web-app with real-time chat feature.
Developed using React (Vite), NodeJS, Express, PostGres, Socket.io.

! To test the app, please do:
1) Install all the npm dependencies;
2) Make sure to have:
- .env file in the server folder with these specified variables:
  - PORT=
  - DB_NAME=
  - DB_USER=
  - DB_PASSWORD=
  - DB_HOST=
  - DB_PORT=
  - ACCESS_TOKEN_SECRET_KEY=
  - ACCESS_TOKEN_EXPIRY=
  - REFRESH_TOKEN_SECRET_KEY=
  - REFRESH_TOKEN_EXPIRY=

- .env file in the client folder with these specified variables:
  - REACT_APP_API_URL = 'http://localhost:YOUR_PORT_NUMBER_FOR_CLIENT'
    
3) Run "npm run dev" in the app folder to start all servers concurrently and start the app.

