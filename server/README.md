# Backend / Server Side

Folder ini berisikan berbagai berkas yang digunakan untuk menghubungkan ke database dan membangun server yang berisi fungsi yang berguna dalam penggunaannya pada website perjalanan dinas.

## Installation

Install projek ini secara lokal menggunakan npm

```bash
  cd server
  npm install
  npm run server
```

## API Reference

### User

#### Regist user

```bash
  POST /user/regist
```

#### Login user

```bash
  POST /user/login
```

#### Logged user

```bash
  GET /user/me
  Authorization
```

#### Forget password

```bash
  PATCH /user/forget-password/${email}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `email`   | `string` | **Required**. email of item to update |

### Perdin

#### Create Perdin

```bash
  POST /perdin/create
  Authorization
```

#### Get Perdin By Name

```bash
  GET /perdin/:name/data
  Authorization
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `name`    | `string` | **Required**. name of item to fetch |

#### Get All Perdin

```bash
  GET /perdin/data
  Authorization
```

#### Get Perdin By Id

```bash
  GET /perdin/${id}
  Authorization
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

#### Update Perdin Status

```bash
  PATCH /perdin/process/${id}
  Authorization
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. id of item to update |

### City

#### Add City

```bash
  POST /city/add
  Authorization
```

#### Get All City Data

```bash
  GET /city/data
  Authorization
```

#### Count Range Between Two City

```bash
  POST /city/range
  Authorization
```

#### Get City Data By Id

```bash
  GET /city/data/${id}
  Authorization
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update City Data

```bash
  PATCH /city/update/${id}
  Authorization
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

#### Delete City

```bash
  DELETE /city/delete/${id}
  Authorization
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |
