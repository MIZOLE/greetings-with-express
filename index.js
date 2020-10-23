const flash = require('express-flash');
const session = require('express-session');
let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greet')
const greetR = require('./routes')
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex123:codex123@localhost:5432/user_on';

const pool = new Pool({
  connectionString,
  ssl: false
});



const greet = Greetings(pool)
const greetRoutes = greetR(greet)
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

app.get('/', greetRoutes.getCount)


app.post('/', greetRoutes.workFlowCount)

app.get('/greeted', greetRoutes.getUsers)

app.get('/reset', greetRoutes.getResetBotton)

app.get('/counter/:name', greetRoutes.getUserCounter)


let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});