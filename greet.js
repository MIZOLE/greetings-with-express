module.exports = function greet(pool) {

    async function checkIfNameExist(name) {
        const result = await pool.query('select * from greeted where name_greeted = $1 ', [name])
        
        return result.rowCount > 0;
    }

    async function updateUserCounter(name) {
        await pool.query('update greeted set how_many_times = how_many_times + 1 where name_greeted = $1', [name])
    }

    async function addNewUserToDatabase(name) {
        await pool.query('INSERT into greeted(name_greeted, how_many_times) values($1, $2)', [name, 1])

    }

    async function getUserCounterByName(name) {
        const sql = 'select * from greeted where name_greeted = $1;';

        const count = await pool.query(sql, [name]);
        console.log(count.rows[0].how_many_times);

        return count.rows[0].how_many_times;
        
    }


    async function greetWorkflow(name, language) {
        const nameExist = await checkIfNameExist(name); // true or false

        if(nameExist) {
            // update counter for that name
            await updateUserCounter(name);
        } else {
            await addNewUserToDatabase(name);
        }
        return getGreetMessage(name, language); // Molo, Jan.
    } 

    // var names = {}

    /** 
     * 
     */


    function getGreetMessage(name, language) {
        if (language === "isiXhosa") {
            return "Molo" + ", " + name
        }
        if (language === "English") {
            return "Hello" + ", " + name
        }

        if (language === "isiZulu") {
            return "Saw'bona" + ", " + name
        }
    }

    async function findTotalCounter() {
        const counter = await pool.query('select count(*) from greeted');   
        return counter.rows[0].count;
    };

    async function findUsers() {
        const counter = await pool.query('select * from greeted');   
        return counter.rows

    }


    return {
        findTotalCounter,
        greetWorkflow,
        findUsers,
        getUserCounterByName
        // greeter,
        // addNames,
        // countAll,
        // greeted
    }
}