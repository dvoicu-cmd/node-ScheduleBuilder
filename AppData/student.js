/**
 * This javascript defines a student object.
 * Properties:
 *  - @param maxHour a positive integer depicting the maximum number of hours a student can take on for a work week.
 *  - @param _name a String that contains the name of the student.
 *  - @param _hours an integer depicting the number of hours a student is working in a week. Default is 0.
 *  - @param _assignedShifts a list of Shift objects pointing to the shifts the student has assigned. Defualt is an empty array []
 *  - @param _avalability a list of 5 Schedule object that depicts the time the student is available. Default is 5 default schedule objects in an array.
 *  - @param _preference a list of 5 Schedule object that depicts when a student prefers to work. Default is 5 default schedule objects in an array.
 */
import ArrayList from './ArrayList.js';
import Shift from './shift.js';
import Schedule from './schedule.js';

class Student {

    /**
     * Constructor method.
     * @param {String} name the name of the student.
     */
    constructor(name){
        this.hourCap = 10; //I tried, I can't get this to be a propertiy shared among all student classes.
        this._name = name;
        this._hours = 0;
        this._assignedShifts = new ArrayList();
        this._assignedtoDay = generateDayAssignments();
        this._avalability = generateListOfSchedules();
        this._preference = generateListOfSchedules();        
    }

    /**
     * Gets the name of the student.
     */
    get name(){
        return this._name;
    }
    /**
     * Gets the hours a student is working in a week.
     */
    get hours(){
        return this._hours;
    }

    /**
     * Adds a shift to the list of shifts a student it taking on.
     * @param {Shift} shift The shift being added.
     */
    assignShift(shift){
        this._assignedShifts.add(shift);
    }

    /**
     * Removes a Shift object from the assigned shifts of a student.
     * @param {Shift} shift the shift to be removed.
     */
    unassignShift(shift){
        this._assignedShifts.remove(shift);
    }

    /**
     * Gets a Schedule object of a student on a specified date.
     * @param {"Mon","Tue","Wed","Thr","Fri"} date a String specifiying the date.
     */
    avalabilityAt(date){
        switch(date){
            case "Mon":
                return this._avalability.at(0);
            case "Tue":
                return this._avalability.at(1);
            case "Wed":
                return this._avalability.at(2);
            case "Thr":
                return this._avalability.at(3);
            case "Fri":
                return this._avalability.at(4);
            default:
                console.log("No valid input for avalabilityAt(date) method");
        }
    }

    /**
     * Reduces the time when a student is available 
     * @param {*} date a one of the strings: "Mon","Tue","Wed","Thr","Fri"
     * @param {*} timeFrom one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select a starting interval to crop availability.
     * @param {*} timeTo one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select an ending interval to crop availability.
     */
    reduceAvailability(date, timeFrom, timeTo){
        let orderOfDates = ["Mon","Tue","Wed","Thr","Fri"]
        switch(date){
            case "Mon":
                this._avalability[0].trim(timeFrom, timeTo);
                break;
            case "Tue":
                this._avalability[1].trim(timeFrom, timeTo);
                break;
            case "Wed":
                this._avalability[2].trim(timeFrom, timeTo);
                break;
            case "Thr":
                this._avalability[3].trim(timeFrom, timeTo);
                break;
            case "Fri":
                this._avalability[4].trim(timeFrom, timeTo);
                break;
            default:
                console.log("No valid input for reduceAvailability method");
                break;
        }
        return;
    }

    /**
     * Return true or false if a student is already assigned for the day.
     */
    assignedToDay(date){
        let orderOfDates = ["Mon","Tue","Wed","Thr","Fri"]
        let index = undefined;
        switch(date){
            case "Mon":
                index = 0;
                break;
            case "Tue":
                index = 1;
                break;
            case "Wed":
                index = 2;
                break;
            case "Thr":
                index = 3;
                break;
            case "Fri":
                index = 4;
                break;
            default:
                console.log("No valid input");
                break;
        } 
    }

    /**
     * Resets the day assignments of a given student.
     */
    resetAssignedDay(){
        this._assignedtoDay = generateDayAssignments();
    }

    /**
     * Reduces the set of time for when a student wants to work
     * @param {*} date a number from 0 to 4 that is used to select a particular schedule for a day of the week.
     * @param {*} timeFrom one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select a starting interval to crop availability.
     * @param {*} timeTo one of the numbers in the set {8.5, 9.0, 9.5, ..., 21.0} used to select an ending interval to crop availability.
     */
    changePreference(date, timeFrom, timeTo){
        if(date > 5 || date < 0){
            throw RangeError;
        }
        else {
            this._preference[date].trim(timeFrom, timeTo);
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
        if(this.atMaxHours()){
            console.log(this._name + " is over/at the hour cap of: " + this.hourCap);
        }
    }

    /**
     * States if the student has max hours
     */
    atMaxHours(){
        if(this.hours >= this.hourCap){
            return true;
        }
        else return false;
    }

    assignedShifts(){
        let outputCpy = new ArrayList();
        for(let i = 0; i<this._assignedShifts; i++){
            outputCpy.add(this._assignedShifts.at(i));
        }
        return outputCpy;
    }

    changeHourCap(n){
        this.hourCap = n;
    }

    /**
     * Exports student data into a string
     */
    export(){
        let str = "\n";
        for(let i = 0; i < this._avalability.length; i++){
            str = str + i + ")\n";
            str = str + this._avalability[i].export();
            str = str + "\n"
        }
        str = str + "fi";

        return "name: "+this._name+"\nmaxHours: "+this.hourCap+"\nAvalability:"+ str; 
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

function generateDayAssignments(){
    let output = new ArrayList();
    for(let i = 0; i<5; i++){
        output.add(false);
    }
    return output;
}

//Export the class
export default Student;