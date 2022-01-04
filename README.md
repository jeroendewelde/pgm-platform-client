# PGM-platform client
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  
The content is coming from the **PGM platform server**, a NestJS project:  
[https://github.com/pgmgent-atwork-3/pgm-platform-server](https://github.com/pgmgent-atwork-3/pgm-platform-server)

## Install dependencies
To install the dependencies, run the following command:  

```bash
yarn install
# or
npm install
```

## Set up environments
When using the local database, run the **pgm-platform-server**, and add the following _.env_-files in the root of the project:
### `.env.dev`
```
HOST = 'http://localhost:3000/graphql'
PORT = 4000
```

### `.env.prod`
```
HOST = 'https://pgm-platform-server.herokuapp.com/graphql'
PORT = 4000
```

## Run the application _locally_
To run the application locally (with heroku-database or local server running), run the following commmand:
```bash
# Run with local server running
$ yarn dev

# Run with heroku database
$ yarn prod
```
The applicaiton will be running on [http://localhost:4000/](http://localhost:4000/).


## Deployment
The app is deployed with [Heroku](https://www.heroku.com/). To deploy the app, run the following command (in the main-branch):
```bash
$ heroku login
$ git push heroku main:main
```
To visit the live application:  
[https://pgm-platform-client.herokuapp.com/](https://pgm-platform-client.herokuapp.com/)


## API routes

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Deploy on Heroku

To push to **heroku**, run the following command:
`git push heroku main:main`

After deployment, the app is visible on the following URL:

[https://pgm-platform-client.herokuapp.com/](https://pgm-platform-client.herokuapp.com/)
