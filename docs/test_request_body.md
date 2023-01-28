

# Curl Commands for Test


## register User
```
{
  "name": "test",
  "email": "test@email.com",
  "password": "12345678"
}
```
## login User
```
{
  "email": "test@email.com",
  "password": "12345678"
}
```

## register Converter
```
{
  "name": "test",
  "email": "test#@email.com",
  "password": "12345678"
}
```

## login Converter
```
{
  "email": "test#@email.com",
  "password": "12345678"
}
```

## (User) upload Model
```
curl -X 'POST' \
  'http://localhost:3000/api/v1/nft-model' \
  -H 'accept: */*' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name=hoge' \
  -F 'copyright=hoge' \
  -F 'modelFormat=.txt' \
  -F 'description=hoge' \
  -F 'file=@memo.txt;type=text/plain'
```

## (User) POST new Order
```
{
"tokenId": 1,
"reward_wei": 1000,
"format": ".md"
}
```

## (Converter) GET Orders


## (Converter) GET Order details


## (Converter) COMMIT(PUT) The Order


## (Converter) Complete(PUT) The Order


## (User) Get The Completed Order


## GET NFT Model


## Get The Log of Convertion


## Others

### GET Users
```

```


### GET Model Converters
```
curl -X 'GET' \
  'http://localhost:3000/api/v1/model_converters' \
  -H 'accept: */*'
```

### GET Model Converter
```
curl -X 'GET' \
  'http://localhost:3000/api/v1/model_converters/1' \
  -H 'accept: */*'
```