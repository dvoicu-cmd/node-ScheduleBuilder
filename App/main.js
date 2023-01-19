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

/**
 * 
 * @param {*} shifts 
 * @param {*} students 
 */
function randomScore(shifts,students){

    //Store the order of students before randomizing
    let tmpStudents = initList();
    for(i = 0; i<students.length(); i++){
        tmpStudents.add(students.get(i));
    }

    //First randomize
    students.randomize();
    shifts.randomize();

    //Then find the scores between shifts and students. Store scores in an array.
    const foundScores = new ArrayList();
    for(i = 0; i < shifts.length(); i++) { //For each shift
        shiftCompatability = new ArrayList();
        let sft = shifts.get(i);
        for(j = 0; j < students.length(); j++) { //For each student
            let std = students.get(j);
            let score = scoreCompatability(sft,std);
            const relation = [sft,score,std];
            foundScores.add(relation); //Store
        }
    }

    //Sort the shifts, reset the students
    sortShifts(shifts);
    students = tmpStudents;

    //Now sort and compile the mapping in our desired output.    
    let Mapping = initList();
    for(l = 0; l<shifts.length(); l++) { //For each shift, Note: there is another scope issue here. This must be l and not i. I think this is conflicting with the call of the equals method in line 77.
        let scoresWithThisShift = initList();
        for (j = 0; j < foundScores.length(); j++){ //For each score
            let currentScore = foundScores.get(j);
            let specificShift = currentScore[0];
            if(specificShift.equals(shifts.get(l))) { //If the shift of the relation matches with the currently compared to shift, then added to the list.
                scoresWithThisShift.add(currentScore); //add the to the list
            }
        }
        //Now sort the scores with this shift
        sortScores(scoresWithThisShift);
        //Now that the scores are sorted, count how many 0s
        let cnt0 = cnt0Scores(scoresWithThisShift);
        //Then create the array [count of 0s, {scoresWithThisShift}]
        let addToMapping = initList();
        addToMapping.add(cnt0);
        addToMapping.add(scoresWithThisShift);
        //Add to the mapping
        Mapping.add(addToMapping);
    }



    console.log(Mapping);
}

/**
 * Returns a score of compatability between a shift and student.
 * A score is how many 30 min chunks in a shift's schedule and a student's schedule match up.
 * @param {*} Shift 
 * @param {*} Student 
 */
function scoreCompatability(Shift,Student){
    let score = 0;
    let sftSchedule = Shift.shiftTime;
    //First check if the student is avalabile on the day of the shift
    let sftDate = Shift.shiftDate;
    let stdSchedule = Student.avalabilityAt(sftDate); //Getting the specific avalability of the student on the day of the shift.
    if(stdSchedule.selectedTime.length == 0){ //Return 0 if there is no avalability.
        return score; 
    }

    //This must be k because there is a conflicting scope in the randomScore() method. If this is i, i in the randomScore() method will always be set to 3 due to this function always being called.
    for(k = 0; k<sftSchedule.selectedTime.length; k++){
        let chunkSft = sftSchedule.selectedTime.at(k);
        let existsAt = stdSchedule.selectedTime.indexOf(chunkSft);
        if(existsAt >= 0){
            score++;
        }
    }
    return score;
}

/**
 * Takes in a list of shifts stored in an ArrayList and sorts them.
 * @param {*} List arrayList object 
 */
function sortShifts(List){
    for(i = 0; i<List.length(); i++){
        for(j = i; j<List.length(); j++){
            sft1 = List.get(i);
            sft2 = List.get(j);
            if(sft2.isEarlierInWeekThan(sft1) == 1){
                    swap(List,i,j);
            }
            //In the case that we are looking at the same date
            if(sft2.isEarlierInWeekThan(sft1) == 0){
                if(sft2.startsEarlierThan(sft1)){
                    swap(List,i,j);
                }
            }   
        }
    }
}

function sortScores(Scores){
    for(j = 0; j < Scores.length(); j++){
        for(k = j; k < Scores.length(); k++){
            let scr1 = Scores.get(j);
            let scr2 = Scores.get(k);
            if(scr1[1] > scr2[1]){
                swap(Scores,j,k);
            }
        }
    }
}

function sortMapping(Map){
    for(j = 0; j < Map.length(); j++){
        for(k = j; k < Map.length(); k++){
            let scoreCnt1 = Map.get(j).get(0);
            let scoreCnt2 = map.get(k).get(0);
            if(scoreCnt1 > ScoreCnt2){
                swap(Map,j,k);
            }
        }
    }
}

function swap(List,index1,index2){
    let element1 = List.get(index1);
    let element2 = List.get(index2);
    List.remove(index1);
    List.addAt(index1,element2);
    List.remove(index2);
    List.addAt(index2,element1);
}

/**
 * Given that it's sorted
 * @param {*} Scores 
 * @returns 
 */
function cnt0Scores(Scores){
    let cnt0 = 0;
    for(j = 0; j < Scores.length(); j++){
        scr = Scores.get(j);
        scrNum = scr[1];
        if(scrNum == 0) {
            cnt0++;
        }
        if(scrNum > 0){
            break;
        }
    }
    return cnt0;
}

/**
 * Pass in the list, returns the list randomized
 * @param {*} List 
 * @returns 
 */
// function randomizeList(List){
//     List.randomize();
//     return List;
// }

function test(){
    const arrayShifts = new ArrayList();
    const arrayStudents = new ArrayList();
    
    //Students Sample
    const std1 = new Student('Dan');
    const std2 = new Student('Ali');
    const std3 = new Student('Sara');
    const std4 = new Student('Billy');
    const std5 = new Student('Mike');
    
    std1.reduceAvailability("Mon",8.5,21.0);
    std2.reduceAvailability("Tue",8.5,21.0);
    std3.reduceAvailability("Wed",8.5,21.0);
    std4.reduceAvailability("Thr",8.5,21.0);
    std5.reduceAvailability("Fri",8.5,21.0);


    arrayStudents.add(std1);
    arrayStudents.add(std2);
    arrayStudents.add(std3);
    arrayStudents.add(std4);
    arrayStudents.add(std5);


    //Shifts Sample
    for(i = 0; i<5; i++){ //for 5 days.
        for(j = 0; j<2; j++){ // make 2 shifts.
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
                date = "Thr";
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

    sftEqu1 = new Shift("WSC");
    sftEqu2 = new Shift("WSC");
    sftEqu1.setTime(8.5,9.0);
    sftEqu1.setDate("Tue");
    sftEqu2.setTime(8.5,9.0);
    sftEqu2.setTime("Mon");
    
    sftNon = new Shift("WSC");
    sftNon.setTime(16.5,21.0);
    sftNon.setDate("Tue");


    console.log(sftEqu1.equals(sftEqu2));
    console.log(sftEqu1.equals(sftNon));


    

    console.log("Starting computation");
    let mapping = randomScore(arrayShifts,arrayStudents); //IT is over flowing again
    console.log(mapping);



    // /**
    //  * Testing comparisions
    //  */

    // const sft1 = new Shift("WSC");
    // sft1.setTime(10, 14);
    // sft1.setDate("Tue");

    // const sft2 = new Shift("WSC");
    // sft2.setTime(8.5, 9.5);
    // sft2.setDate("Mon");

    // console.log(sft1);
    // console.log(sft2);

    // console.log(sft1.isEarlierInWeekThan(sft2)); //is a Tuesday shift earlier in the week than a Monday shift :False
    // console.log(sft1.startsEarlierThan(sft2)); //is 10 AM an earlier start time than 8:30 AM : False
    // console.log(sft2.isEarlierInWeekThan(sft1)); //is a Monday shift ealier in the week than a Tuesday shift : True
    // console.log(sft2.startsEarlierThan(sft1)); //is 8:30 AM an earlier start time than 10 AM: True


    // //testing addAt
    // // const tmpTest = new ArrayList();
    // // tmpTest.add(std1);
    // // tmpTest.add(std2);
    // // tmpTest.add(sft1);
    // // tmpTest.add(sft2);
    // // tmpTest.addAt(1,std4);
    // // console.log(tmpTest);

    // /**
    //  * Testing sort
    //  */

    // const sft3 = new Shift("WSC");
    // sft3.setTime(17, 21);
    // sft3.setDate("Fri");

    // const sft4 = new Shift("WSC");
    // sft4.setTime(8.5, 9.5);
    // sft4.setDate("Thr");

    // const sft5 = new Shift("WSC");
    // sft5.setTime(9.5, 13);
    // sft5.setDate("Thr");

    // const listShiftSort = new ArrayList();
    // listShiftSort.add(sft1);
    // listShiftSort.add(sft2);
    // listShiftSort.add(sft3);
    // listShiftSort.add(sft4);
    // listShiftSort.add(sft5);

    // console.log(listShiftSort);

    // const listShiftSortCpy = new ArrayList();
    // listShiftSortCpy.add(sft1);
    // listShiftSortCpy.add(sft2);
    // listShiftSortCpy.add(sft3);
    // listShiftSortCpy.add(sft4);
    // listShiftSortCpy.add(sft5);

    // sortShifts(listShiftSortCpy)

    // console.log(listShiftSortCpy);


    // /**
    //  * Testing the get schedule of specified date of student.
    //  */
    // sampleStd = new Student("Bill");
    // sampleStd.reduceAvailability("Mon", 9.0, 21);
    // console.log(sampleStd.avalabilityAt("Mon"));



    // /**
    //  * Testing Compatability Score function
    //  */
    // sampleSft = new Shift("WSC"); //Test different dates
    // sampleSft.setTime(8.5,9.0);
    // sampleSft.setDate("Mon");
    // console.log(sampleSft.shiftTime);
    // console.log(scoreCompatability(sampleSft,sampleStd));
    // sampleSft.setDate("Fri");
    // sampleStd.reduceAvailability("Fri",8.5,21);
    // console.log(scoreCompatability(sampleSft,sampleStd));
     

}