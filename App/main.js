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
    List.addAt(index,Element);
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
 * Takes in a list of shifts stored in an ArrayList and sorts them.
 * @param {*} List arrayList object 
 */
function sortShifts(List){
    const output = new ArrayList();
    let ptrSorted = 0; //Pointer to the last sorted element.
    let prtCompare = 0;
    let sorted = false;
    let tmp;

    for(i = 0; i<List.length(); i++){
        for (j = i; j<List.length(); j++){
            sft1 = List.get(i);
            sft2 = List.get(j);
            if(sft2.isEarlierInWeekThan(sft1) == 1){
                    List.remove(i);
                    List.addAt(i,sft2);
                    List.remove(j);
                    List.addAt(j,sft1);
            }
            //In the case that we are looking at the same date
            if(sft2.isEarlierInWeekThan(sft1) == 0){
                if(sft2.startsEarlierThan(sft1)){
                    //Duplicate code, make this a method in arrayList class called swap.
                    List.remove(i);
                    List.addAt(i,sft2);
                    List.remove(j);
                    List.addAt(j,sft1);
                }
            }   
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


    /**
     * Testing comparisions
     */

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


    //testing addAt
    // const tmpTest = new ArrayList();
    // tmpTest.add(std1);
    // tmpTest.add(std2);
    // tmpTest.add(sft1);
    // tmpTest.add(sft2);
    // tmpTest.addAt(1,std4);
    // console.log(tmpTest);

    /**
     * Testing sort
     */

    const sft3 = new Shift("WSC");
    sft3.setTime(17, 21);
    sft3.setDate("Fri");

    const sft4 = new Shift("WSC");
    sft4.setTime(8.5, 9.5);
    sft4.setDate("Thr");

    const sft5 = new Shift("WSC");
    sft5.setTime(9.5, 13);
    sft5.setDate("Thr");

    const listShiftSort = new ArrayList();
    listShiftSort.add(sft1);
    listShiftSort.add(sft2);
    listShiftSort.add(sft3);
    listShiftSort.add(sft4);
    listShiftSort.add(sft5);

    console.log(listShiftSort);

    const listShiftSortCpy = new ArrayList();
    listShiftSortCpy.add(sft1);
    listShiftSortCpy.add(sft2);
    listShiftSortCpy.add(sft3);
    listShiftSortCpy.add(sft4);
    listShiftSortCpy.add(sft5);

    sortShifts(listShiftSortCpy)

    console.log(listShiftSortCpy);


}