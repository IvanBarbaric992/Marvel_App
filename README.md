# Marvel characters catalog

## Description

Marvel character catalog is a simple app demo where users can search and bookmark their favourite characters.

## Demo

---

## How to use

### Prerequisites

First, make sure you have `Node.js` (**npm** or **yarn**) installed.

```
$ node -v
v12.x.x
```

Also, you can use `nvm` as a helpful tool to install the correct **node** and **npm**/**yarn** version.

### Sign up to Marvel API developer portal

Before installing the application sign up to [MarveL Developer portal](https://developer.marvel.com/) where you will get your PUBLIC and PRIVATE KEY for accessing this api.

### Installing the application

```
$ git clone https://github.com/IvanBarbaric992/Blank_Task_Marvel_App.git <my-project-name>
$ cd <my-project-name>
$ npm install
```

_These commands will install all of the latest dependencies. Installation might take some time._

### Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (_which will be ignored by Git_):

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and set `REACT_APP_MARVEL_API_ENDPOINT`, `REACT_APP_MARVEL_API_PUBLIC_KEY`, and `REACT_APP_MARVEL_API_PRIVATE_KEY` to match your Marvel API data provided to you.

Your `.env.local` file should look like this:

```bash
SASS_PATH=node_modules:src  ---> Scss absolute paths

REACT_APP_MARVEL_API_ENDPOINT = http://gateway.marvel.com/v1/public/characters

REACT_APP_MARVEL_API_PUBLIC_KEY = <your-marvel-api-public-key>
REACT_APP_MARVEL_API_PRIVATE_KEY = <your-marvel-api-private-key>
```

### Running the application

```
$ npm start
```

_Runs the app in the development mode. React will automatically open new browser tab or if not than open [http://localhost:3000](http://localhost:3000) to view it in the browser._

### Building the application

```
$ npm build
```

_Builds the application for production usage._

---

## Built with

- [Create React App](https://github.com/facebook/create-react-app)
- [Sass](https://github.com/sass/dart-sass) as CSS pre-processor

## Libraries

In addition several smaller libraries are used. Instructions on how to use them are linked below.

| Library                                             | Purpose                                                         |
| --------------------------------------------------- | --------------------------------------------------------------- |
| [Crypto](https://github.com/brix/crypto-js)         | for MD5 encription which is required by Marvl API authorization |
| [ESLint](https://github.com/eslint/eslint)          | for making code more consistent and avoiding bugs               |
| [Stylelint](https://github.com/stylelint/stylelint) | for avoiding errors and enforcing conventions in styles         |
| [Prettier](https://github.com/prettier/prettier)    | for code formatting                                             |
| [Husky](https://github.com/typicode/husky)          | for preventing bad commit or push                               |

See `package.json` for a complete overview.

---

## Folder structure

```
├── public
├── src
│   └── components
│   │   └── {ComponentName}
│   │        ├── {ComponentName}.scss
│   │        └── {ComponentName}.js
│   ├── constants
│   │   └── {ConstantName}.js
│   ├── hooks
│   │   └── use{HookName}.js
│   ├── pages
│   │   └── {PageName}.js
│   ├── services
│   │   ├── api
│   │   │    └── {NameOfApiService}.js
│   │   └── utilities
│   │   │    └── {NAmeOfFunction}.js
│   ├── styles
│   │    ├── globals
│   │    ├── mixins
│   │    └── index.scss
│   ├── App.js
│   └── index.js
```
