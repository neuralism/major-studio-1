In this code:

```json
test = {
  "name": "Nexus S",
  "snippet": "Fast just got faster with Nexus S.",
  "age": 1
}
```

```js
> test['name']
```
returns
```js
> "Nexus S"
```

In this code:

```json
test = {
  "name": "Nexus S",
  "snippet": {
    "title": "The new Nexus S!",
    "body": "Fast just got faster with Nexus S."
  },
  "age": 1
}
```

```js
> test.snippet.title
```

returns

```js
> "The new Nexus S!"
```

In this code: 

```json
{
  "phones": [
    {
      "name": "Nexus S",
      "snippet": "Fast just got faster with Nexus S.",
      "age": 1
    },
    {
      "name": "Motorola XOOM™ with Wi-Fi",
      "snippet": "The Next, Next Generation tablet.",
      "age": 2
    },
    {
      "name": "MOTOROLA XOOM™",
      "snippet": "The Next, Next Generation tablet.",
      "age": 3
    }
  ]
}
```
```js
> test.phones[1].name
```
returns

```js
> "Motorola XOOM™ with Wi-Fi"
```