# News Explorer Backend
<!-- toc -->
#### По-русски
- [Описание](#Описание)
- [Размещение](#Размещение)
- [Функционал проекта](#Функционал-проекта)
- [Используемые технологии](#Используемые-технологии)
- [Как воспользоваться проектом](#Как-воспользоваться-проектом)
#### In English
- [About](#About)
- [Access](#Access)
- [Project functionality](#Project-functionality)
- [Technologies used](#Technologies-used)
- [How to use the project](#How-to-use-the-project)
<!-- tocstop -->

#### Описание
- Дипломный проект курса: сайт для поиска и хранения новостных статей

- Компонент: бэкенд

- Версия: 0.0.1

#### Размещение
Проект задеплоен по следующим адресам:
- http://www.api.vitaliytikhonov.ru/webdev/projects/news_explorer
- http://api.vitaliytikhonov.ru/webdev/projects/news_explorer
- https://www.api.vitaliytikhonov.ru/webdev/projects/news_explorer
- https://api.vitaliytikhonov.ru/webdev/projects/news_explorer

[Наверх :arrow_up:](#news-explorer-backend)
#### Функционал проекта
Сервер обрабатывает запросы на создание пользователя (_POST /signup_) и вход в систему (_POST /signin_), с выдачей токена для быстрого входа), а также запросы с токеном к следующим страницам:
   - GET /users/me (возвращает информацию о пользователе),
   - GET /articles (возвращает все сохраненные пользователем статьи),
   - POST /articles (создаёт статью),
   - DELETE /articles/:articleId (удаляет статью, при условии что она принадлежит пользователю),
а также запросы по несуществующим адресам, отправляя в ответ JSON-объекты.

[Наверх :arrow_up:](#news-explorer-backend)
#### Используемые технологии
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon
- Eslint
- bcrypt
- JSON Web Token
- Сelebrate и Joi
- Winston
- Helmet

[Наверх :arrow_up:](#news-explorer-backend)
#### Как воспользоваться проектом
Обращаться к роутам проекта, указывая в теле запросов необходимые данные.

[Наверх :arrow_up:](#news-explorer-backend)

*В рамках курса **Веб-разработка** в Яндекс.Практикуме*
***
#### About
- Graduation project of the course: a website for news search and saving

- Component: backend

- Version: 0.0.1

#### Access
The project is deployed at the following URLs:
- http://www.api.vitaliytikhonov.ru/webdev/projects/news_explorer
- http://api.vitaliytikhonov.ru/webdev/projects/news_explorer
- https://www.api.vitaliytikhonov.ru/webdev/projects/news_explorer
- https://api.vitaliytikhonov.ru/webdev/projects/news_explorer

[To top :arrow_up:](#news-explorer-backend)
#### Project functionality
The server handles requests for user creation (_POST /signup_) and login (_POST /signin_, issuing a token for quick login), as well as requests with a token to the following pages:
   - GET /users/me (returns user's own data),
   - GET /articles (returns all the articles the user has saved),
   - POST /articles (creates an article),
   - DELETE /articles/:articleId (deletes the article, provided that it belongs to the user),
as well as requests to non-existent addresses, sending JSON objects in response.

[To top :arrow_up:](#news-explorer-backend)
#### Technologies used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon
- Eslint
- bcrypt
- JSON Web Token
- Сelebrate и Joi
- Winston
- Helmet

[To top :arrow_up:](#news-explorer-backend)
#### How to use the project
Execute requests to the routes listed above, specifying data fields in the request body, as necessary.

[To top :arrow_up:](#news-explorer-backend)

*As part of the **Web-Development** course at ***Yandex.Praktikum*
