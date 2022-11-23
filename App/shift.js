/**
 * This javascript file exports a shift object to the the ./main.js script
 * Properties:
 *  - @param _type contains a String stating what type of shift the instance is.
 *  - @param _shiftTime contains a Schedule object that contains the time interval of the shift.
 *  - @param _assignedStudents is an array containing Student objects that are assigned to the instance of the shift object.
 *  - @param _hasStudent is a boolean value stating whether or not the shift has a student assigned to it.
 * 
 * How the methods work:
 * 
 */
class Shift{

    /**
     * Constructor for a shift object
     * 
     * @param {*} type 
     */
    constructor(type){
        this._type = type;
        this._shiftTime = new Schedule();
        this._assignedStudents = [];
        this._hasStudent = false;
    }

    setTime(from,to){
        this._shiftTime.subSection(from,to);
    }

    //Shifts will modify students
    selectStudent(student){
        if(this._assignedStudents.length > 0){
            this._hasStudent = true;
        }
        this._assignedStudents.push(student);
        student.assignShift(this);
    }

    removeStudent(student){

        indexOf = this._assignedStudents.indexOf(student);
        prt1 = this._assignedStudents.splice(0,indexOf);
        prt2 = this._assignedStudents;
        prt1.pop();
        this._assignedStudents = prt1.concat(prt2);
        student.unassignShift(this);

    }

}