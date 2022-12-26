/**
 * This javascript file exports a shift object to the the ./main.js script
 * Properties:
 *  - @param _type contains a String stating what type of shift the instance is.
 *  - @param _shiftTime contains a Schedule object that contains the time interval of the shift. By defualt the shift time is from 8.5 to 21.
 *  - @param _assignedStudents is an array containing Student objects that are assigned to the instance of the shift object.
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
        this._assignedStudents = [];
        this._hasStudent = false;
    }

    get shiftTime(){
        return _shiftTime;
    }

    get shiftDate(){
        return _shiftDate;
    }

    /**
     * Sets the time frame of the shift.
     * @param {*} from 
     * @param {*} to 
     */
    setTime(from,to){
        this._shiftTime.subSection(from,to);
    }

    /**
     * Sets the date in which the shift takes place
     * Preconditions: Must be a string of the following values: "Mon", "Tue", "Wed", "Thu", "Fri"
     */
    setDate(date){
        this._shiftDate = date;
    }

    /**
     * Assigns a student to a shift.
     * @param {*} student 
     */
    selectStudent(student){
        //If there are no students intially, change the property.
        if(this._assignedStudents.length > 0){
            this._hasStudent = true;
        }
        //Assign.
        this._assignedStudents.push(student);
        student.assignShift(this);
    }

    /**
     * Removes a student from a shift
     * @param {*} student the specified student
     */
    removeStudent(student){
        //Remove the specified student by spliting the array in two parts. (Should have used an arrayList)
        indexOf = this._assignedStudents.indexOf(student);
        prt1 = this._assignedStudents.splice(0,indexOf);
        prt2 = this._assignedStudents;
        prt1.pop();
        this._assignedStudents = prt1.concat(prt2);
        student.unassignShift(this);

        //If there are no students left after the computation, change the property.
        if(this._assignedStudents.length <= 0){
            this._hasStudent = false;
        }
    }

}