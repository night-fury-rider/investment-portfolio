# Investment Portfolio
This is a website to analyze our investment portfolio.

# Technologies and Libraries Used

* [React 16.13.1](https://reactjs.org/)
* [Redux Saga 1.1.3](https://redux-saga.js.org/)
* [TypeScript 3.9.7](https://www.typescriptlang.org/)
* [React Bootstrap 1.3.0](https://react-bootstrap.github.io/)
* [amCharts 4.10.11](https://www.amcharts.com/)
* [Axios 0.21.0](https://github.com/axios/axios)
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
npm start
```
Runs the app in the development mode which can be browsed at [http://localhost:3000](http://localhost:3000)


## Run Unit Tests

```
npm test
```
Launches the test runner in the interactive watch mode.<br />


## Make Build of Application

```
npm run build
```
Builds the app for production to the `build` folder.<br />


## Notes
1. Objects of `items` array represents an investment plan.
2. Objects of `subItems` array represents an instance of investment plan. It's values will be considered in all calculations.
