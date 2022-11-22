/**
 * This javascript file exports a student object to the the ./main.js script
 */

class Student {

    static hourCap = 15;

    /*
     * The following are object constructors
     */

    /**
     * Constructor method with the following input paramaters.
     * @param {*} name A string containing the student's name
     * @param {*} avalability An array of 5 schedule object containing time frames when the student is available
     * @param {*} preference  An array of 5 schedule objects containing time frames when the student would like to work
     */
    // constructor(name,avalability,preference){
    //     this._name = name;
    //     this._hours = 0;
    //     this._assignedShifts = [];
    //     if(avalability instanceof Array && preference.length == 5){
    //         this._avalability = avalability;
    //     }
    //     else throw SyntaxError;
    //     if(preference instanceof Array && preference.length == 5){
    //         this._preference = preference;
    //     }
    //     else throw SyntaxError;
    // }

    /**
     * Constructor method with only one input paramater.
     * @param {*} name 
     */
    constructor(name){
        this._name = name;
        this._hours = 0;
        this._assignedShifts = [];
        this._avalability = generateListOfSchedules();
        this._preference = generateListOfSchedules();
    }

    /*
     * The following are getter methods
     */
    get name(){
        return this._name;
    }
    get hours(){
        return this._hours;
    }
    get avalability(){
        return this._avalability;
    }
    get preference(){
        return this._preference;
    }

    //WIP
    assignShift(){}

    unassignShift(){}

    /**
     * A method to reduce the time when a student is available 
     * @param {*} date a number from 0 to 4 that is used to select a particular schedule for a day of the week.
     * @param {*} timeFrom one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select a starting interval to crop availability.
     * @param {*} timeTo one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select an ending interval to crop availability.
     */
    reduceAvailability(date, timeFrom, timeTo){
        if(date > 5 || date < 0){
            throw RangeError;
        }
        else {
            this._avalability[date] = this._avalability[date].trim(timeFrom, timeTo);
        }
    }

    /**
     * A method used to reduce the set of time for when a student wants to work
     * @param {*} date a number from 0 to 4 that is used to select a particular schedule for a day of the week.
     * @param {*} timeFrom one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select a starting interval to crop availability.
     * @param {*} timeTo one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select an ending interval to crop availability.
     */
    changePreference(date, timeFrom, timeTo){
        if(date > 5 || date < 0){
            throw RangeError;
        }
        else {
            this._preference[date] = this._preference[date].trim(timeFrom, timeTo);
        }
    }

    /**
     * Reduces the number tracking the hours a student works
     * @param {*} n an interger input to reduce the number of hours
     */
    reduceHours(n){
        this._hours = this._hours - n;
        if(this._hours < 0){
            this._hours = 0;
        }
    }

    /**
     * Increases the number tracking the hours a student works
     * @param {*} n an interger input to increase the number of hours
     */
    addHours(n){
        this._hours = this._hours + n;
        if(this.hours > hourCap){
            console.log(this._name + " is over over the hour cap of: " + hourCap);
        }
    }
}

/**
 * Helper function used to generate an array of 5 schedule objects.
 */
function generateListOfSchedules(){
    let output = [];
    for(let i = 0; i<5; i++){
        output.push(new Schedule());
    }
    return output;
}