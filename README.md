# Investment Portfolio
This is a website to analyze our investment portfolio of various investment instruments.

![Screenshot from 2021-06-18 11-55-19](https://user-images.githubusercontent.com/5191208/122516668-ac224e80-d02c-11eb-8e9d-560bda63256d.png)


# Technologies and Libraries Used

* [React 17.0.2](https://reactjs.org/)
* [Redux Saga 1.1.3](https://redux-saga.js.org/)
* [TypeScript 4.1.2](https://www.typescriptlang.org/)
* [React Bootstrap 1.3.0](https://react-bootstrap.github.io/)
* [amCharts 4.10.11](https://www.amcharts.com/)
* [Axios 0.21.0](https://github.com/axios/axios)
* [React Router 5.2.0](https://reactrouter.com/web/guides/quick-start)
* [env-cmd 10.1.0](https://github.com/toddbluhm/env-cmd)
* [uvUtil 1.0.9](https://github.com/yuvi1422/npm-uv-util)
* [bit Harmony](https://bit.dev/)

# File Naming convension

* File name should be prefixed by `uv_`.
* File name should be in lowercase separated by hypen (`-`)
* File name should have dot (`.`) to separate file type. Ex. `uv_angular-gauge.reducer.ts`
* File name of root interfaces should be prefixed by `uv_interface-`

<br />

# Available Scripts

## Start Application

```
yarn start
```
Runs the app in the development mode which can be browsed at [http://localhost:3000](http://localhost:3000)


## Run Unit Tests

```
yarn test
```
Launches the test runner in the interactive watch mode.<br />


## Generate Coverage Report

```
yarn test:coverageAll
```
Create coverage report and stores it inside coverage folder.<br />


## Make Build of Application

```
yarn run build
```
Builds the app for production to the `build` folder.<br />


<br />


# Deployment

Since we are using `BrowserRouter` of React Router, we need to do a [configuration on hosting server](https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing).


<br />


# Notes
1. Objects of `items` array represents an investment plan.
2. Objects of `subItems` array represents an instance of investment plan. It's values will be considered in all calculations.
