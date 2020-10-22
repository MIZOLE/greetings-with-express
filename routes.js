module.exports = function routes(greet) {



    let getCount = async function (req, res) {
        const count = await greet.findTotalCounter();
        res.render('index', {
            count
        });

    };


    let workFlowCount = async (req, res) => {

        let error = ""

        const { name, language } = req.body;

        const greetMessage = await greet.greetWorkflow(name, language); // Molo, Jan
        const count = await greet.findTotalCounter();

        if (!name && !language) {
            error = "Please enter a name and select a language"
        }
        else if (!name) {
            error = 'Please enter a name'
        }

        else if (!language) {
            error = 'Please select a language'

        }

        else if (isNaN(name) === false) {
            error = 'Please do not enter a number '
        }

        else {
            res.render('index', {
                count,
                greet: greetMessage
            })
            return;
        }
        if (error) {
            req.flash('info', error);
            res.render('index');
        }



        else {
            res.render('index', {
                count,
                greet: greetMessage
            });

        }
    }

    let getUsers = async (req, res) => {
        const users = await greet.findUsers();
        res.render('greeted', {
            users
        })
    }

    let getResetBotton = async (req, res) => {
        try {
            await greet.resetButton()
        } catch (error) { }
        // res.render('index')
        res.redirect('/')

    }

    let getUserCounter = async (req, res) => {

        const name = req.params.name;
        const counter = await greet.getUserCounterByName(name);

        const user = name + ' has been greeted ' + counter + ' times.'
        res.render('counter', {
            user
        })
    }






    return {

        getCount,
        workFlowCount,
        getUsers,
        getResetBotton,
        getUserCounter
    }

}