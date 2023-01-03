

# Adonis Todo App 📝  
This is my first todo app api built using [AdonisJs](https://adonisjs.com/) framework. 

## Get Started 🚀 
To get started, proceed until the end of this repo to get the instruction about installation, feature, etc

## Installation 🔥  
To install this project, we need to configure **this project itself** and **database**

### Run Locally  
- Clone the project  

~~~bash  
  git clone https://github.com/redomeire/adonis-todo-app.git
~~~

- Go to the project directory  

~~~bash  
  cd adonis-todo-app
~~~

- Install dependencies  

~~~bash  
npm install
~~~

- Copy .env.example to .env

~~~bash  
cp .env.example .env
~~~

- Create database in your local computer

- Configure your database name, host, and password in .env file

- Run migration 

~~~bash  
adonis migration:run --seed
~~~

- Start the server  

~~~bash  
npm start
~~~   

## Features 🔥
- Login 
- Create Account
- Reset password
- Delete account
- CRUD Todo
- Get todo detail

## API Reference

#### Register 

```http
  POST /register
```  

| Request    | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `email`  | **Required**. email                |
| `password` | `string` | **Required**. Password to identify |
| `username` | `string` | **Required**. Username to identify |

#### Login 

```http
  POST /login
```  

| Request    | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `email`  | **Required**. email                |
| `password` | `string` | **Required**. Password to identify |

#### Reset password

```http
  PUT /password-reset
```  

| Request        | Type     | Description                     |
| :---------     | :------- | :-------------------------------|
| `old_password` | `string` | **Required**. your old password |
| `new_password` | `string` | **Required**. your new password |

**_Important*_**

#### Delete Account

```http
  DELETE /delete
```  

**_Important*_**

#### Create Todo

```http
  POST /posts
```  

| Request       | Type     | Description                           |
| :---------    | :------- | :------------------------------------ |
| `name`        | `string` | **Required**. title of the todo       |
| `description` | `string` | **Required**. description of the todo |

**_Important*_**

#### Get all todos

```http
  GET /posts?page={page}
```  

| Query params  | Type      | Description                           |
| :------------ | :-------- | :------------------------------------ |
| `page`        | `integer` | **Optional**. the page of pagination  |

**_Important*_**

#### Get todo detail

```http
  GET /posts/{id}
```  

| Path params   | Type      | Description                  |
| :------------ | :-------- | :--------------------------- |
| `id`          | `integer` | **Required**. the id of todo |

**_Important*_**

#### Search Todo

```http
  GET /posts/search?q={name}&page={page}
```  

| Query params  | Type       | Description                          |
| :------------ | :--------  | :---------------------------         |
| `name`        | `string`   | **Optional**. the name of todo       |
| `page`        | `integer`  | **Optional**. the page of pagination |

**_Important*_**

#### Edit Todo

```http
  PUT /posts/edit
```  

| Request       | Type      | Description                           |
| :---------    | :-------  | :------------------------------------ |
| `id`          | `integer` | **Required**. id of the todo          |
| `name`        | `string`  | **Required**. title of the todo       |
| `description` | `string`  | **Required**. description of the todo |

**_Important*_**

#### Delete todo

```http
  DELETE /posts/{id}
```  

| Path params   | Type      | Description                           |
| :---------    | :-------  | :------------------------------------ |
| `id`          | `integer` | **Required**. id of the todo          |

**_Important*_**

**_Important :_** make sure to pass `Authorization` with `Bearer {token}` in request header.
    
## That's it ✨  
FYI I'm really new to node js framework, so i dont think i will make next update for the feature in short time. After all, this project is my way to practice using AdonisJs. Feel free to suggest if you have a suggestion about the feature or anything
