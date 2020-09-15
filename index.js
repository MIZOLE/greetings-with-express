let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greet')

const greet = greetings()
let app = express();

app.engine('handlebars', exphbs({
    layoutsDir: './views/layouts'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {

    });
});
app.post('/greet', function (req, res) {

    let firstName = req.body.greeted;
    let languages = req.body.language;

    res.render("index", { greet: greet.greeter(firstName, languages), count: greet.countAll() })
})

app.get('/greeted', function (req, res) {

    let firstName = req.body.greeted;
    let languages = req.body.language;


    res.render("greeted", { names: greet.greeted() })
})

app.get('/counter/:username', function (req, res) {

    var personsName = req.params.username;
    var namesGreeted = greet.greeted()

    var msg = "Hello, " + personsName + " has been greeted " + namesGreeted[personsName] + " times."
   console.log(namesGreeted[personsName])
    res.render('name', {
      message : msg
    });
})

app.post('/counter', function (req, res) {
    let count = req.body.counted;
    res.render("index", { greet: greet.countAll(count) })
})

let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});