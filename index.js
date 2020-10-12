const flash = require('express-flash');
const session = require('express-session');
let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greet')
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex123:codex123@localhost:5432/user_on';

const pool = new Pool({
  connectionString,
  ssl: false
});

const greet = Greetings(pool)
let app = express();
app.use(flash());

app.use(session({
  secret: "Welcome",
  resave: false,
  saveUninitialized: true
}));


app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async function (req, res) {
  const count = await greet.findTotalCounter();
  res.render('index', {
    count
  });
});


app.post('/', async (req, res) => {

  const { name, language } = req.body;

  const greetMessage = await greet.greetWorkflow(name, language); // Molo, Jan
  const count = await greet.findTotalCounter();
  res.render('index', {
    count, greet: greetMessage
  });

});


app.get('/greeted', async (req, res) => {
  const users = await greet.findUsers();
  res.render('greeted', {
    users
  })
})

app.get('/counter/:name', async (req, res) => {

  const name = req.params.name;
  const counter = await greet.getUserCounterByName(name);

  const user = name + ' have been greeted ' + counter + ' times.'
  res.render('counter', {
    user
  })
})


let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});