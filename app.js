/* jshint esversion:6 */
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.resolve('dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(
    'mongodb://test:test123@ds147011.mlab.com:47011/todo_react', { useNewUrlParser: true }
)

let todoSchema = new mongoose.Schema({
    id: String,
    title: String,
    check: Boolean
})

let Todo = mongoose.model('Todo', todoSchema);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'))

})

app.get('/todos', (req, res) => {
    Todo.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
})
app.post("/todos", (req, res) => {
    let newTodo = Todo(req.body.data).save((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.put("/todos/:id", (req, res) => {
    // let checkValue = Todo.aggregate({ $match: req.params.id }, {
    //     project: { check: 1 }
    // });
    // console.log(checkValue);
    let value = req.body.data == true ? true : false;
    Todo.update({ id: req.params.id }, { $set: { check: value } }, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.delete("/todos/:id", (req, res) => {
    Todo.find({ id: req.params.id }).remove((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});


app.listen(3000);