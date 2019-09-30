# Amcharts Factory

## Project src structure

- src/components
- src/constants
- src/containers

All graphs can be used with graphql.
The Charts Factory was created to manage graphics using levels.
Each graph has a manager, who manages the return.
In case we wanted to use the graphics as an example, it will be sufficient to specify the props: chartType, id, title.
Otherwise, query execution can be requested.
In this project there is no configuration to interact with a graphql server.

In this readme you will find some doc about GraphQL and Amcharts.

## Getting Started 

### Install dependencies

### `	yarn `

### Run project

### `	yarn start`



## ChartsFactory

In components folder you will find ChartsFactory folder, which contains all Charts used in this project.

Inside ChartsFactory folder there is a manager which helps wall to manage chartType from server. Query and filters are passed to the chart manager who will execute the query and will pass result to the chart. 

Queries and filters are passed from parent.



## How to

If you want to use Charts and you know the type of the chart you need to use, you can simply include the manager. 

All charts structure are based on graphQL queries. 

Assume you want to use a XYChart.

```js
import XYChartManager from 'components/ChartsFactory/Amcharts/XYChart/Manager';

/* example query */
const GET_DATA = `
    query {
      Data {
        category
        value
      }
    }
`;

```

```jsx
<XYChartManager
  label="Aziende associate negli anni"
  id="xyChart1"
  query={GET_DATA}
/>
```

So, XYChartManager will execute query and will build chart with data from server.

If you don't know the type of chart you need, you can simply ask to server all data you need, for example chart type, query to execute.

```jsx
/*
	assume result is what you receive from server
*/

<XYChartManager
  label={data.label}
  id={shortid.generate()}
  query={data.query}
  chartType={data.chartType}
/>
```







