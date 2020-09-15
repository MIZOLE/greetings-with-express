module.exports = function greet() {

    var names = {}

    function greeter(name, language) {
        if (!name) {
            return "no name entered";
        }
        addNames(name)

        if (language === "isiXhosa") {
            return "Molo" + ", " + name
        }
        if (language === "English") {
            return "Hello" + ", " + name
        }

        if (language === "isiZulu") {
            return "Sawubona" + ", " + name
        }
    }
    function addNames(name) {

        if (names[name] === undefined) {
            names[name] = 0;
        }
        names[name]++
        console.log(names)
    }

    function countAll() {
        return Object.keys(names).length
    }

    function greeted() {
    return names;

    }

   



    return {
        greeter,
        addNames,
        countAll,
        greeted
    }
}