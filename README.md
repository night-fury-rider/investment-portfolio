# Investment Portfolio

It serves as a digital platform where users can manage and track their investments in various financial assets. The website aims to provide individuals or institutional investors with the tool to monitor and optimize their portfolios based on their financial goals


![Investment Portfolio_2025-02-08](https://github.com/user-attachments/assets/f66625f8-479f-4bfe-971d-6d6c5960f50d)


---

# Technologies and Libraries Used

| Library                                                     | Version |
| ----------------------------------------------------------- | ------- |
| [React](https://reactjs.org/)                               | v19     |
| [Next.js](https://nextjs.org/)                              | v15     |
| [Material UI](https://mui.com/material-ui/getting-started/) | v6      |
| [Nivo Charts](https://nivo.rocks/pie)                       | v0.88   |
| [uv-tech/util](https://www.npmjs.com/package/@uv-tech/util) | v1      |

---

# Getting Started

## Prerequisite

- Node 20+
- npm 10+

## Install Dependencies

```bash
npm i
```

## Run Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prepare Deployment Build

```bash
npm run build
```

It will create Static Export Build under `build` folder.

## Test Deployment Build

Run following command in Terminal in `build` folder.

```bash
npx serve -l 8888 --cors
```

Open [http://localhost:8888](http://localhost:8888) with your browser to see the result.

# Developer Notes

- Attribute `value` is meant for displaying data to user. Attribute `absoluteValue` is meant for doing the calculations.
