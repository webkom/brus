# brus [![Build Status](https://ci.abakus.no/api/badges/webkom/brus/status.svg)](https://ci.abakus.no/webkom/brus)

## API reference

**API base url:** [brus.abakus.no/api](http://brus.abakus.no/api)

| Url              | Methods | Body (application/json)        | Description                                                     |
| ---------------- | ------- | ------------------------------ | --------------------------------------------------------------- |
| /liste/          | GET     |                                | Lists the brus list. All users and a summary of their purchases |
| /liste/?name     | GET     |                                | Shows a users details and a summary of their purchases          |
| /liste/purchase/ | POST    | shopping_cart: a shopping cart | Purchase items                                                  |
| /liste/products/ | GET     |                                | List all available products                                     |

```ts
shoppingCart: [
  {
    product_name: string;
    count: integer;
  }
]
```
