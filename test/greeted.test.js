
const assert = require('assert');
const greeted = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// const connectionString = process.env.DATABASE_URL || 'postgresql://codex123@localhost:5432/user_on';
const connectionString = process.env.DATABASE_URL || 'postgresql://codex123:codex123@localhost:5432/user_on';


const pool = new Pool({
    connectionString
});

describe('The user_on database', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greeted;");
        // await pool.query("delete from how_many_times;");
    });

    it('should check if the name exist', async function () {

        // the Factory Function is called greet
        let nameGreeted = greeted(pool);

        await nameGreeted.greetWorkflow('Lulama')
        //    await namesGreeted.checkIfNameExist('Zola')
        //  await namesGreeted.checkIfNameExist('Lunga')

        var names = await nameGreeted.findUsers()

        assert.equal(names.rows)
    });

    it('it should be able to count all the names was greeted', async function () {

        let counted = greeted(pool)

        await counted.findTotalCounter('Linda')
        await counted.findTotalCounter('Amila')
        await counted.findTotalCounter('John vuli gate')
        await counted.findTotalCounter('John vuli gate')
        await counted.findTotalCounter('John vuli gate')
        await counted.findTotalCounter('Zuko')
        await counted.findTotalCounter('Akhona')
        await counted.findTotalCounter('Akhona')
        await counted.findTotalCounter('Akhona')
        await counted.findTotalCounter('Akhona')

        var NowManyNames = await counted.findUsers()

        assert.equal(5, NowManyNames.rows.count)
    });

    // it('it should be able to get the greet message', async function () {
    //     let message = greeted(pool)

    //     await message.getGreetMessage('isiXhosa')
    //     await message.getGreetMessage('isiZulu')
    //     await message.getGreetMessage('English')

    //     var greetMe = await message.findTotalCounter()

    //     assert.equal(greetMe)
    // })

    after(function () {
        pool.end();
    })
});