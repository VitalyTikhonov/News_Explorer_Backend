module.exports.errors = {
  invalidInput: {
    name: 'Ошибка в поле Name',
    email: 'Ошибка в поле Email',
    about: 'Ошибка в поле About',
    avatar: 'Ошибка в URL аватарки',
    link: 'Ошибка в URL',
  },
  invalidCredentials: 'Неправильные почта или пароль',
  missingCredentials: 'Введите логин и пароль',
  notAuthorized: 'Необходима авторизация',
  notFound: 'Запрашиваемый ресурс не найден',
  docNotFound: {
    user: 'Такого пользователя нет',
    article: 'Такой статьи нет',
  },
  unknownRequestor: 'Запрос сделан от имени несуществующего пользователя',
  noDocs: {
    user: 'Пользователи не найдены',
    article: 'Статьи не найдены',
  },
  emailInUse: 'Этот адрес электронной почты уже используется',
  badPassword: (pswlength) => `Введите пароль длиной не менее ${pswlength} зн., состоящий из латинских букв, цифр и специальных символов`,
  objectId: {
    user: 'Ошибка в идентификаторе пользователя',
    requestor: 'Ошибка в идентификаторе автора запроса',
    article: 'Ошибка в идентификаторе статьи',
  },
};
