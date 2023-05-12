/**
 * This javascript file defines a Shift object.
 * A Shift has the following properties
 * Properties:
 *  - @param _type a String stating what type/name of shift the instance is.
 *  - @param _shiftTime a Schedule object that contains the time interval of the shift. By defualt the shift time is from 8.5 to 21.
 *  - @param _shiftDate a String in the form: Mon, Tue, Wed, Thr, Fri that represent the date the shift takes place. The default is Mon
 *  - @param _assignedStudents is an array containing the pointers to Student objects that are assigned to the instance of the shift object.
 *  - @param _hasStudent is a boolean value stating whether or not the shift has a student assigned to it.
 * 
 * How the methods work:
 * 
 */
class Shift{

    /**
     * Constructor for a shift object
     * @param {*} type Assigns the type of shift in a string.
     */
    constructor(type){
        this._type = type;
        this._shiftTime = new Schedule();
        this._shiftDate = "Mon";
        this._assignedStudents = new ArrayList();
        this._hasStudent = false;
    }

    /**
     * Returns the schedule object for the shift's time
     */
    get shiftTime(){
        return this._shiftTime;
    }

    /**
     * Returns the date of the shift
     */
    get shiftDate(){
        return this._shiftDate;
    }

    /**
     * Sets the time frame of when the shift occurs in a work week.
     * @param {8.5, 9.0, 9.5, ..., 21.0} from The starting interval of the shift.
     * @param {8.5, 9.0, 9.5, ..., 21.0} to The ending interval of the shift.
     */
    setTime(from,to){
        this._shiftTime.subSection(from,to);
    }

    /**
     * Sets the date in which the shift takes place
     * Preconditions: Must be a string of the following values: "Mon", "Tue", "Wed", "Thu", "Fri"
     * @param {"Mon", "Tue", "Wed", "Thu", "Fri"} date The date to be set.
     */
    setDate(date){
        this._shiftDate = date;
    }

    /**
     * Assigns a student to a shift.
     * @param {*} student 
     */
    selectStudent(student){
        //If there are no students intially, change the property for having a student.
        if(this._assignedStudents.length() <= 0){
            this._hasStudent = true;
        }
        //Assign.
        this._assignedStudents.add(student);
    }

    /**
     * Removes a student from a shift
     * @param {Student} student The specified student to be removed.
     */
    removeStudent(student){
        //Remove the specified student by spliting the array in two parts.
        this._assignedStudents.remove(student);

        //If there are no students left after the computation, change the property.
        if(this._assignedStudents.length() <= 0){
            this._hasStudent = false;
        }
    }

    assignedStudents(){
        outputCpy = new ArrayList();
        for(let i=0; i<this._assignedStudents; i++){
            outputCpy.add(this._assignedStudents.at(i));
        }
        return outputCpy;
    }

    /**
     * Compares the dates of another Shift obj. 
     * @param {Shift} otherShift The other Shift object.
     * @returns 0 if the shifts are on the same day, 1 if the other shift is Earlier than this shift, -1 there is incorrect syntax of the shiftDate property in the other shift.
     */
    isEarlierInWeekThan(otherShift){
        let orderOfDates = ["Mon","Tue","Wed","Thr","Fri"] //For the computer to understand, this is the order of dates.
        let otherDate = otherShift.shiftDate
        let thisDate = this._shiftDate

        //get the indexes of associated data.
        let otherIndex = orderOfDates.indexOf(otherDate)
        let thisIndex = orderOfDates.indexOf(thisDate)

        if(otherIndex == -1){ //If element not found, ie: in proper syntax of strings, return false
            return -1
        }
        else if(otherIndex > thisIndex){
            return 1
        }
        else if(otherIndex == thisIndex){
            return 0
        }
    }
    
    /**
     * Compares the start times of another shift obj.
     * @param {Shift} otherShift The other Shift object.
     * @returns true if this shift starts ealier than the other shift. false otherwise.
     */
    startsEarlierThan(otherShift){
        let otherStart = otherShift.shiftTime.selectedTime[0];
        let thisStart = this._shiftTime.selectedTime[0];
        if(thisStart<otherStart){
            return true;
        }
        else return false;
    }

    /**
     * Compares two shift objects. If there is any overlap in schedule objects then the function returns the overlap in an array.
     * @param otherShift The other Shift object.
     */
    conflict(otherShift){
        //To be done later. Mostly for GUI elements.
    }
    
    /**
     * Determins if two shifts are equal to each other.
     * A shift is equal to another shift if they share their Schedule objects are equal and if they share the same date.
     * @param {Shift} otherShift the other Shift object.
     * @returns true if the shiftDate and Schedule is the same for both objects.
     */
    equals(otherShift){
        if(this.shiftDate !== otherShift.shiftDate){
            return false;
        }
        else if(this.shiftTime.equal(otherShift.shiftTime)){
            return true;
        }
        else return false;
    }

    /**
     * Returns how many 30min chunks
     * @returns The number of elements in the shift's schedule object.
     */
    getNum30MinChunks(){
        return this._shiftTime.num30MinChunks();
    }

    /**
     * Exports the contents of the string
     */
    export(){
        return "name: "+this._type+"\nshiftDate: "+this._shiftDate+"\nshiftTime: "+this._shiftTime.export();
    }

}
//Export the class
module.exports = Shift;