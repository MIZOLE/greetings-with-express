
const assert = require('assert');
const greeted = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// const connectionString = process.env.DATABASE_URL || 'postgresql://codex123@localhost:5432/user_on';
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:codex123@localhost:5432/user_on';


const pool = new Pool({
    connectionString
});

describe('The user_on database', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greeted;");
        // await pool.query("delete from how_many_times;");
    });

    
    it('it should be able to delete all the user from the data base', async function () {

        let counted = greeted(pool)

        await counted.resetButton('Linda')
        await counted.resetButton('Amila')
        await counted.resetButton('John vuli gate')
        await counted.resetButton('John vuli gate')
        await counted.resetButton('John vuli gate')
        await counted.resetButton('Zuko')
        await counted.resetButton('Akhona')
        await counted.resetButton('Akhona')
        await counted.resetButton('Akhona')
        await counted.resetButton('Akhona')

        var DeletedNames = await counted.findTotalCounter()

        assert.equal(0, DeletedNames)
    });

    it('it should be able to add new user to the data base', async function () {
        let HowManyAdded = greeted(pool)

       
        await HowManyAdded.addNewUserToDatabase('Lulama')
        await HowManyAdded.addNewUserToDatabase('Zola')
        await HowManyAdded.addNewUserToDatabase('Xhanti')

        var addNames = await HowManyAdded.findTotalCounter()

        assert.equal(3, addNames)
    })

    it('it should be able to add an increment individual counter', async function () {
        let addIndividual = greeted(pool)

       
         await addIndividual.addNewUserToDatabase('Lulama')
         await addIndividual.addNewUserToDatabase('Lulama')

         await addIndividual.addNewUserToDatabase('Zola')
         await addIndividual.addNewUserToDatabase('Xhanti')

        var addName = await addIndividual.updateUserCounter('Lulama')

        assert.equal(2, addName)
    })

    it('it should be able to return the number of people greeted to the database', async function () {
        let addTotal = greeted(pool)

       
        await addTotal.addNewUserToDatabase('Lulama')
        await addTotal.addNewUserToDatabase('Zola')
        await addTotal.addNewUserToDatabase('Xhanti')
        await addTotal.addNewUserToDatabase('Lunga')
        
        var Totalofnames = await addTotal.findTotalCounter()
        
        assert.equal(4, Totalofnames)
    })



    it('it should be able to greet in isiXhosa', async function () {
        let message = greeted(pool)

       
        // await message.getGreetMessage('isiZulu')
        // await message.getGreetMessage('English')

        assert.equal('Molo, Lulama', await message.getGreetMessage('Lulama', 'isiXhosa'))

    })

    it('it should be able to greet in English', async function () {
        let message = greeted(pool)

       
        // await message.getGreetMessage('isiZulu')
        await message.getGreetMessage('English')

        assert.equal('Hello, Lulama', await message.getGreetMessage('Lulama', 'English'))

    })

    it('it should be able to greet in isiZulu', async function () {
        let message = greeted(pool)

       
        await message.getGreetMessage('isiZulu')

        assert.equal('Sawubona, Lulama', await message.getGreetMessage('Lulama', 'isiZulu'))

    })



    after(function () {
        pool.end();
    })
});