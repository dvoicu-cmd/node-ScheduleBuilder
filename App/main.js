/**
 * The main.js file contains contents that will be displayed to the end user. It brings together all the classes into one file that manages them all.
 */


/**
 * Initializes a new arrayList()
 * @returns 
 */
function initList(){
    const List = new ArrayList();
    return List;
}
/**
 * Pass in a list with an element, returns the list with the element added
 * Please don't mix students and shift lists.
 * @param {*} List
 * @param {*} Element 
 * @returns List with element added.
 */
function addElement(List,Element){
    List.add(Element);
    return List;
}

/**
 * Pass in a list with an index and an element, then returns the list with the element added at the specified index
 * @param {*} List 
 * @param {*} index 
 * @param {*} Element 
 */
function addElementAt(List,index,Element){
    List.addAt(Element,index,Element);
    return List;
}


function randomScore(Shifts,Students){
    Students.randomize();
    Shifts.randomize();
    for(i = 0; i < Shifts.length(); i++){ //For each shift
        const studentScore = new ArrayList();
        for(j = 0; j < Students.length(); j++){
            const shift = Shifts.get()


        }
    }
}

/**
 * Takes in a list of shifts stored in an ArrayList and sorts them
 * @param {*} List arrayList object 
 */
function sortShifts(List){
    const output = new ArrayList();
    let tmpDate = "Mon";
    let tmpTime = 8.5;
    let ptrSorted = 0; //Pointer to the last sorted element.
    for(i = 0; i<List.length(); i++){
        //Get and store the properties of the current shift we are observing.
        let Shift = List.get(i);
        let schedule = Shift.shiftTime.selectedTime; //Get the array from the schedule object.
        let startTime = schedule[0];
        let date = Shift.shiftDate;

        //Compare to unsorted elements
        for(j = ptrSorted; j<List.length(); j++){
            //Get the other shift we are comparing to
            let otherShift = List.get(j);
            let otherSchedule = otherShift.shiftTime.selectedTime;
            let otherStartTime = otherSchedule[0];
            let otherDate = otherShift.shiftDate;

            //Compare the two shifts. Shifts are sorted as such: A shift that is closer to the start of the week and starts ealier will come first.



        }


    }
    
}

/**
 * Pass in the list, returns the list randomized
 * @param {*} List 
 * @returns 
 */
function randomizeList(List){
    List.randomize();
    return List;
}

function test(){
    const arrayShifts = new ArrayList();
    const arrayStudents = new ArrayList();
    
    //Students Sample
    const std1 = new Student('Dan');
    const std2 = new Student('Ali');
    const std3 = new Student('Sara');
    const std4 = new Student('Billy');
    
    arrayStudents.add(std1);
    arrayStudents.add(std2);
    arrayStudents.add(std3);
    arrayStudents.add(std4);

    //Shifts Sample
    for(i = 0; i<5; i++){ //for 5 days.
        for(j = 0; j<7; j++){ // make 7 shifts.
            let date;
            if(i == 0){
                date = "Mon";
            }
            if(i == 1){
                date = "Tue";
            }
            if(i == 2){
                date = "Wed";
            }
            if(i == 3){
                date = "Thu";
            }
            if(i == 4){
                date = "Fri";
            }
            const sft = new Shift("WSC");
            sft.setTime(j+8.5, j+9.0);
            sft.setDate(date);
            arrayShifts.add(sft);
        }
    }

    const sft1 = new Shift("WSC");
    sft1.setTime(10, 14);
    sft1.setDate("Tue");

    const sft2 = new Shift("WSC");
    sft2.setTime(8.5, 9.5);
    sft2.setDate("Mon");

    console.log(sft1);
    console.log(sft2);

    console.log(sft1.isEarlierInWeekThan(sft2)); //is a Tuesday shift earlier in the week than a Monday shift :False
    console.log(sft1.startsEarlierThan(sft2)); //is 10 AM an earlier start time than 8:30 AM : False
    console.log(sft2.isEarlierInWeekThan(sft1)); //is a Monday shift ealier in the week than a Tuesday shift : True
    console.log(sft2.startsEarlierThan(sft1)); //is 8:30 AM an earlier start time than 10 AM: True
}