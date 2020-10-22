module.exports = function greet(pool) {

    async function checkIfNameExist(name) {
        if (name) {
            var cases = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            const result = await pool.query('select * from greeted where name_greeted = $1 ', [cases])
            return result.rowCount;
        }
    }

    async function updateUserCounter(name) {
        var cases = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        var updater = await pool.query('update greeted set how_many_times = how_many_times + 1 where name_greeted = $1', [cases])
        return updater.rowCount
    }

    async function addNewUserToDatabase(name) {
        if (name) {
            var cases = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

            await pool.query('INSERT into greeted(name_greeted, how_many_times) values($1, $2)', [cases, 1])
        }
    }

    async function getUserCounterByName(name) {
        const sql = 'select * from greeted where name_greeted = $1;';

        const count = await pool.query(sql, [name]);

        // console.log(count.rows[0].how_many_times);

        return count.rows[0].how_many_times;
    }

    async function greetWorkflow(name, language) {
        if (name && language) {
            const nameExist = await checkIfNameExist(name); // true or false
            if (nameExist > 0) {
                // update counter for that name
                await updateUserCounter(name);
            } else {
                await addNewUserToDatabase(name);
            }
            // return getGreetMessage(name, language); // Molo, Jan.
        }
    }

    function getGreetMessage(name, language) {

        if (language === "isiXhosa") {
            return "Molo, " + name
        }
        if (language === "English") {
            return "Hello, " + name
        }

        if (language === "isiZulu") {
            return "Sawubona, " + name
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
    async function resetButton() {
        const reseting = await pool.query(`delete from greeted`)
        return reseting;
    }
    return {
        findTotalCounter,
        greetWorkflow,
        findUsers,
        getUserCounterByName,
        resetButton,
        getGreetMessage,
        addNewUserToDatabase,
        checkIfNameExist,
        updateUserCounter

    }
}