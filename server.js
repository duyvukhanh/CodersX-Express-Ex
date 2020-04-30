// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
let todoList = [
            { id: 1, content: "Nau com" },
            { id: 2, content: "Rua bat" },
            { id: 3, content: "Hoc CodersX" }
        ]

app.set('view engine', 'pug')
app.set('views', './views')
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  response.render("ex2", {
        todoList: todoList
    })
});

app.get("/todos/search", (request, response) => {
  let q = request.query.q;
  let todoListMatched = todoList.filter(function(todo) {
    return todo.content.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  response.render("ex2", {
        todoList: todoListMatched
    })
});

app.post('/todos/create', function (request, response) {
    todoList.push(request.body)
    response.redirect('/todos')
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
