# Graphql-Movie-Starter

```
> npm install
> npm run dev
```

Puis aller sur http:localhost:4000


# Console GraphQL
```
http://localhost:4000/graphql
```

## Query

```
query {
  movies {
  id,
  title
 }
} 
```

```
mutation {
  mv1 : addMovie(title:"Star Wars") {
    id,
    title
  },
  mv2 : addMovie(title:"Indiana Jones") {
    id,
    title
  },
  mv3 : addMovie(title:"Le seigneur des anneaux") {
    id,
    title
  }   
}
```

NB: la requête suivante fonctionne
```
http://localhost:4000/graphql?query=query{movies{id,title}}

```
