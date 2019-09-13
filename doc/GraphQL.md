# GraphQL

## Query

Queries can be executed in two different ways:

- render mode
- programmatically

So, if you want to render something you can execute query simply write:

```jsx
<Query
  query={this.props.query}
  variables={this.props.filters}
  skip={!this.props.query}
>
  {({ loading, error, data }) => {
    if (loading) {
      return (
        <div>
          {'Loading data :)'}
        </div>
      );
    }
    if (error) return 'Error :(';
    if (data) {
     return 'data returned from server!'
    }
  }}
</Query>
```

If you want to execute a query programmatically, you can use client instance of apolloclient and write it as Promise:

```js
client.query({
	query: this.props.query,
	variables: this.props.filters
})
.then(result => console.log('data returned from server', result.data))
.catch(error => console.log('error', error));
```

You can also write it as async function

```js
async getData(){
	try {
        const result = await client.query({
            query: this.props.query,
            variables: this.props.filters
        });
        console.log('data result', result.data);
	} catch (error) {
		console.log('error', error)
	}

}
```



## Mutation

Mutations can be executed in two different ways:

- render mode
- programmatically

So, if you want to render something you can execute query simply write:

```jsx
<Mutation
  mutation={this.props.query}
  variables={this.props.filters}
  skip={!this.props.query}
>
  {(addData, { loading, error, data }) => (
    if (loading) {
      return (
        <div>
          {'Loading data :)'}
        </div>
      );
    }
    if (error) return 'Error :(';
    if (data) {
     return 'data returned from server!'
    }
    )
  }
</Mutation>
```

If you want to execute a query programmatically, you can use client instance of apolloclient and write it as Promise:

```js
client.mutate({
	mutation: this.props.query,
	variables: this.props.filters
})
.then(result => console.log('data returned from server', result.data))
.catch(error => console.log('error', error));
```

You can also write it as async function

```js
async addData(){
	try {
        const result = await client.mutate({
            mutation: this.props.query,
            variables: this.props.filters
		});
        console.log('data result', result.data);
	} catch (error) {
		console.log('error', error)
	}

}
```

## Query examples

Here is an example of a query that get companies group by workers range.

```js
const GET_COMPANIES_GROUP_BY_WORKERS_RANGE = gql`
    query CompaniesGroupByWorkersRange($filters: AffiliationFilterDtoInput) {
        queryAlias: CompaniesGroupByWorkersRange(filter: $filters) {
          range {
            name
          }
          count
        }
      }
`;

```

If query is written this way, it will always wait for a filter variable, which can also be empty.

So, if we want to get everything we can send:

```json
{
	filters: {
		
	}
}
```

Or, if you wan to add some filter as described in 'AffiliationFilterDtoInput':

```
input AffiliationFilterDtoInput {
  goodsSectorId: Int
  aibZoneId: Int
  companyId: Int
  workersRangeId: Int
  minDate: Date
  maxDate: Date
}
```

For Example, assume that you want Companies Group by Workers Range for `goodsSectorId` 1, in your code you have to write:

```json
{
	filters : {
		goodsSectorId: 1
	}
}
```

## Mutation examples

Here is an example of a mutation that shares a graph in wall/home.

```js
const ShareChartInWall = gql`
    mutation ShareChartInWall($kpi: ChartKPIDtoInput) {
      ShareChartInWall(kpi: $kpi)
        {
            id
        } 
	}`;

const variables = {
  kpi: {
    title: this.state.textTitle,
    query: this.props.queryGraph,
    filter: this.props.filters,
    width: this.props.width,
    chartType: this.props.chartType,
    position: this.state.position,
  }
}
```

as result of this mutation you will receive:

```json
{
	"data" : {
		 "ShareChartInWall" : {
            "id" : 1
        } 
	}
}
```

You can also ask to mutation to have something else modify the content of `SharChartInWall` body.

## Query alias

Assume you have a series of queries for a single component, with the same body and that differ only in the name of the object. For example, in this project we have a Select component with the same body in query. 

The simply way to not keep track of the name of the object is to give to the constructor the same alias for all query. Let's apply this to two queries.

### Before

```js
const GET_GOODS_SECTORS = gql`
    query {
      GoodsSectors {
            id
            name
        }
    }
`;

const GET_WORKERS_RANGES = gql`
    query {
      WorkersRanges {
            id
            name
        }
    }
`;
```

### After

```js
const GET_GOODS_SECTORS = gql`
    query {
      queryAlias: GoodsSectors {
            id
            name
        }
    }
`;

const GET_WORKERS_RANGES = gql`
    query {
      queryAlias: WorkersRanges {
            id
            name
        }
    }
`;
```



So we can access to data of every query simply writing:

```jsx
<Query query={GET_GOODS_SECTORS}>
  {({ loading, error, data }) => {
    if (loading) return 'Loading data :)';
    if (error) return 'Error :(';
    if (data) {
      return (
			{const dataObject = data.queryAlias}
            {dataObject.map(item => (
            	{console.log('id', item.id)}
                {console.log('name', item.name)}
               ))
    		}
      );
    }
  }}
</Query>

```

