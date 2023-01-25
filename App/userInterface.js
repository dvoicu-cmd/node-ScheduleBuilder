/**
 * This controls the front end
 */

/**
 * Global variables. Yes this is bad web development practice. I don't care.
 */
let arrayShifts = initList();
let arrayStudents = initList();
let Mapping;

let Dan = new Student("Dan");
arrayStudents.add(Dan);

/**
 * Adds a student to the arrayOfStudents
 */
function addStudent(){
    for(i = 0; i< arrayStudents.length(); i++){
        let std = document.createElement("label");
        let stdList = doccument.getElementById(stdList);
        stdList.appendChild(std);
    }
}

/**
 * Pop up window
 */
function viewSchedule(){
    window.open('/schedule.html','popUpWindow','heigh=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
}

/**
 * 
 */
function addShift(){

}

/**
 * 
 */
function generateMapping(){

}

/**
 * 
 */
function displayStudents(){

}

/**
 * 
 */
function displayShifts(){

}

/**
 * 
 */
function displayMapping(){

}

/**
 * 
 */
function inportData(){

}

/**
 * 
 */
function exportData(){
    
}