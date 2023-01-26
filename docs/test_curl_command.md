

# Curl Commands for Test


## register User
```
curl -X 'POST' \
  'http://localhost:3000/api/v1/users' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "test",
  "email": "test@email.com",
  "did": "did:ether:goerli:fdsfad",
  "password": "12345678"
}
'
```
## login User
```
curl -X 'POST' \
  'http://localhost:3000/api/v1/users/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "test#@email.com",
  "password": "12345678"
}
'
```

## register Converter
```
curl -X 'POST' \
  'http://localhost:3000/api/v1/model_converters' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "test",
  "email": "test#@email.com",
  "did": "did:ether:goerli:fdsfad",
  "password": "12345678"
}
'
```

## login Converter
```
curl -X 'POST' \
  'http://localhost:3000/api/v1/model_converters/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "test#@email.com",
  "password": "12345678"
}
'
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