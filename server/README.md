# Backend / Server Side

Folder ini berisikan berbagai berkas yang digunakan untuk menghubungkan ke database dan membangun server yang berisi fungsi yang berguna dalam penggunaannya pada website perjalanan dinas.

## API Reference

### User

#### Regist user

```http
  POST /user/regist
```

#### Login user

```http
  POST /user/login
```

#### Logged user

```http
  GET /user/me
  Authorization
```

#### Forget password

```http
  PATCH /user/forget-password/${email}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `email`   | `string` | **Required**. email of item to update |

### Perdin

#### Create Perdin

```http
  POST /perdin/create
  Authorization
```

#### Get Perdin By Name

```http
  GET /perdin/:name/data
  Authorization
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `name`    | `string` | **Required**. name of item to fetch |

#### Get All Perdin

```http
  GET /perdin/data
  Authorization
```

#### Get Perdin By Id

```http
  GET /perdin/${id}
  Authorization
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

#### Update Perdin Status

```http
  PATCH /perdin/process/${id}
  Authorization
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. id of item to update |

### City

#### Add City

```http
  POST /city/add
  Authorization
```

#### Get All City Data

```http
  GET /city/data
  Authorization
```

#### Count Range Between Two City

```http
  POST /city/range
  Authorization
```

#### Get City Data By Id

```http
  GET /city/data/${id}
  Authorization
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update City Data

```http
  PATCH /city/update/${id}
  Authorization
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

#### Delete City

```http
  DELETE /city/delete/${id}
  Authorization
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |
