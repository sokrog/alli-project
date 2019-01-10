# alli-project

> All include project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

#### TO-DO list

```
# DataBase
# PostgreSQL - подойдет в качестве использования нормальной полноценной базы данных
# SQLite3 - подойдет только для однопользовательского приложения, так как является 
  встраиваемой базой данных (аналог MSAccess)

```

```
# TheNotification
# Нужно добавить вывод сообщения не только об ошибке, но и об успешном выполнении операции
```

```
# Rf
# RfAdd/Edit
# Первоначально разобраться с добавлением записи в таблицу
  - для компонента RfDatePicker и RfAutocomplete создать store
    для сохранения и передачи значения
# Затем уже с редактированием и добавлением скана в редактировании
  - делать возможность загрузки скана уже в поле редактирования документа
  - нужно подумать где и как хранить сканы документов
# После этого удалением
# Потом можно добавить функции отслеживания вернувшихся и не вернувшихся документов
# На дальнейшую перспективу нужно перейти к нормальной СУБД и добавить возможность печати данных
```

```
# Creditors
# Нужно поле с вводом сроков отсрочки платежа по поставщикам услуг в днях,
  исходя из этого будут отображаться документы по которым просрочен платеж
  - дополнительно можно будет выводить в dashboard просроченные суммы на текущий день
```
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).