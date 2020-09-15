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

    var username = req.params.username;

    addNames(username)

    var name = greet.greeted()

    // console.log(name[username])
    // var msg = "HI" + ;
    res.render('names', {name: greet.addNames(username) });
})

app.post('/counter', function (req, res) {
    let count = req.body.counted;
    res.render("index", { greet: greet.countAll(count) })
})

let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});