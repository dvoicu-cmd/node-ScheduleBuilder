/**
 * This javascript file exports a shift object to the the ./main.js script
 */

 class Shift{
     static numShifts

     constructor(type){
         this._type = type;
         this._shiftTime = new Schedule();
         this._assignedStudents = [];
         this._hasStudent = false;
     }

     setTime(from,to){
         this._shiftTime.trim()
     }

 }