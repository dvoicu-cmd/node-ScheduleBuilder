/**
 * main.js contains a varity of algorithms used for the app including: 
 * - Sorting algorithms for shifts, scores, and mappings
 * - Wrapper functions for the ArrayList class
 * - The randomScore()
 */


/**
 * 
 * --------------------------------------
 * Wrapper methods for arrayList objects.
 * --------------------------------------
 * 
 */


/**
 * Initializes a new arrayList()
 * @returns a new ArrayList object.
 */
function initList(){
    const List = new ArrayList();
    return List;
}
/**
 * calls the add method on an arrayList object
 * Don't mix students and shift lists.
 * @param {ArrayList} List arrayList object.
 * @param {*} Element element to be added.
 */
function addElement(List,Element){
    List.add(Element);
}

/**
 * Pass in a list with an index and an element, and then adds a new entry next to the specified element in the ArrayList object.
 * @param {ArrayList} List inputted arrayList object.
 * @param {Positive Integer} index a positive integer to select which index the element will be added next to.
 * @param {*} Element element to be added.
 */
function addElementAt(List,index,Element){
    List.addAt(index,Element);
}

/**
 * Pass in the list, returns the list randomized
 * @param {*} List the ArrayList to be randomized.
 */
function randomizeList(List){
    List.randomize();
}


/**
 * 
 * ---------------------------------
 * Main assesment/scoring algorithms.
 * ---------------------------------
 * 
 */


/**
 * Given an ArrayList of shift objects and student objects, randomeScore() will return a package that dipicts the score for all shift to student pairs.
 * @param {ArrayList} shifts an arrayList of Shift objects.
 * @param {ArrayList} students an arrayList of Student objects.
 * @returns A mapping/package of the evaluation done in the following form: [ [cnt0 , [Shift, Score, Student] ] [cnt0 , [Shift, Score, Student] ] ... [ cnt0 , [Shift, Score, Student ] ]. 
 * cnt0 = the amount of times a score of a shift to student relation is 0.
 * score = the number of times a 30min chunks in a Shift's schedule matches with a Student's Schedule.
 * Each entry of [cnt0 , [Shift, Score, Student] will contain the same shift.
 * Each entry in the package is sorted by cnt0, from the most cnt0s to the least.
 * cnt0 directly correlates to how difficult the shift will be to cover.
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

    //Sort the shifts, reset the students.
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
        //Then create the array [count of 0s, the shift in question, {scoresWithThisShift}]
        let addToMapping = initList();
        addToMapping.add(cnt0);
        addToMapping.add(shifts.get(l));
        addToMapping.add(scoresWithThisShift);
        //Add to the mapping
        Mapping.add(addToMapping);
    }

    //Sort
    sortMapping(Mapping);

    //Returns
    return Mapping;
}

/**
 * Given a mapping, the mapping will assign the best possible student to each shift.
 * @param {ArrayList} Mapping 
 */
function setAssignmentsRandom(Mapping){
    let stackList = initList();
    let orderOfShift = initList();
    for(i = 0; i<Mapping.length(); i++){//For each entry in a mapping
        stack = new Stack(); //Init a stack corrolated to the shift
        stackList.add(stack);
    }

    for(i = 0; i<Mapping.length(); i++){ //For each entry in a mapping

        let corospondingStack = stackList.get(i); //Address the corrosponding stack of students to it's respective shift.
        let studentList = initList(); //Init where you will store the students
        let thisRelation = Mapping.get(i); //Get the specific [cnt0, shift, {Relations}] entry.
        let thisShift = thisRelation.get(1); //Get the specific shift

        orderOfShift.add(thisShift); //Add this shift to the list of shifts. We will needed for assigning shifts.

        for(j = 1; j<=thisShift.getNum30MinChunks(); j++){ //For each possible score of a shift, score, student relationship (including the very last score)
            studentList = relationWithScore(j,thisShift,Mapping); //Get the list of students that corrolate to a specific score.
            studentList.randomize(); //Randomize the list of students with that particular score.
            
            for(k = 0; k<studentList.length(); k++){ 
                corospondingStack.push(studentList.get(k)); //Then add each student to the corrosponding stack, one by one.
            }
        }
    }

    //Now that we have the stacks ordered: lets assign.
    for(let i = 0; i<orderOfShift.length(); i++){
        let thisShift = orderOfShift.get(i); //Shift in question
        let thisStack = stackList.get(i); //Stack of students that can take the shift.

        //The student at the top of the stack is the most compatable with the shift. But that student can be at max hours.
        for(let j=0; j<=thisStack.size(); j++){

            studentToAssign = thisStack.pop();

            if(!(studentToAssign.atMaxHours())){ //If student is not at max hours. give them the shift
                assign(thisShift,studentToAssign);
                break;
            }
            
            if(studentToAssign == undefined){
                console.log(thisShift);
                console.log("The above shift can't get a student assigned");
            }
        }
    }
}

/**
 * 
 */
function setAssignmentsPreferences(){

}

/**
 * Resets all assignments of students and shifts
 */
function resetAssignments(){

}

/**
 * 
 * -----------------
 * Helper Functions.
 * -----------------
 * 
 */


/**
 * Helper function that switches two entries of an arrayList object
 * @param {ArrayList} List The ArrayList inputted.
 * @param {Positive Integer} index1 the first index to swap. 
 * @param {Positive Integer} index2 the second index to swap.
 */
function swap(List,index1,index2){
    let element1 = List.get(index1);
    let element2 = List.get(index2);
    List.remove(index1);
    List.addAt(index1,element2);
    List.remove(index2);
    List.addAt(index2,element1);
}

/**
 * Given a list of sorted [Shift score Student] triplits, count how many of the scores were 0.
 * @param {ArrayList} Scores an ArrayList of the mentioned triplits discribing the compatability of a shift and student.
 * @returns a number for how many scores were 0.
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
 * Returns a score of compatability between a shift and student.
 * A score is how many 30 min chunks in a shift's schedule and a student's schedule match up.
 * @param {Shift} Shift shift object.
 * @param {Student} Student student object.
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
 * Finds and returns an ArrayList of students that corrolate to a specified shift and score.
 * @param {*} score A specific score.
 * @param {*} Shift A specific shift obj
 * @param {*} Mapping an Mapping that was computed.
 * @returns an arrrayList of students
 */
function relationWithScore(score, Shift, Mapping){
    //First, find the index of the relations for the specified shift
    let shiftEntry = undefined;
    for(p = 0; p<Mapping.length(); p++){
        Entry = Mapping.get(p).get(1);
        if(Shift.equals(Entry)){
            shiftEntry = Mapping.get(p).get(2);
            break;
        }
    }

    if(shiftEntry == undefined){ //If nothing was found, that means the shift that was entered was not in the Mapping, return undefined.
        return undefined;
    }
    else{
        let relationsWithScore = initList();
        for(p = 0; p<shiftEntry.length(); p++){
            let specificRelation = shiftEntry.get(p); //Get the specific shift,score,student relationship we are analyzing.
            let scoreOfRelation = specificRelation.at(1); //I forgot, these are arrays... Not sure if I should try to change them.
            if(scoreOfRelation == score){
                relationsWithScore.add(specificRelation.at(2));
            }
        }
        return relationsWithScore; //Return the found students.
    }

}


function assign(shift, student){
    shift.selectStudent(student);
    student.assignShift(shift);
    student.addHours(shift.getNum30MinChunks()/2);
}

function unassign(shift, student){
    shift.removeStudent(student);
    student.unassignShift(shift);
    student.reduceHours(shift.getNum30MinChunks()/2);
}


/**
 * 
 * ------------------------
 * Helper Functions for GUI
 * ------------------------
 * 
 */

function allRelationsOfShift(specificShift, Mapping){

}

function bestStudentsForShift(specificShift, Mapping){

}

function worstStudentsForShift(specificShift, Mapping){

}

function hardestShiftToFill(Mapping){

}

function easiestShiftToFill(Mapping){

}

/**
 * 
 * @param {*} Shift 
 * @returns 
 */
function assignedStudentsToShift(Shift){
    return Shift.assignedStudents();
}

/**
 * Gets the shifts that are assigned to a student
 */
function assignedShiftsToStudent(Student){
    return Student.assignedShifts();
}



/**
 * 
 * -------------------
 * Sorting Algorithms.
 * -------------------
 * 
 */


/**
 * Takes in a list of shifts stored in an ArrayList and sorts them.
 * @param {ArrayList} List ArrayList object containing shifts.
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

/**
 * Sorts a list of [Shift, Score, Student] triplits by score. triplist with smaller scores go first.
 * @param {ArrayList} Scores an ArrayList of the mentioned triplits discribing the compatability of a shift and student.
 */
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

/**
 * Sorts the final mapping/package of relations based on the number of cnt0 in each entry. Samller cnt0s go first.
 * @param {ArrayList} Map an ArrayList containing [cnt0,[Shift,Score,Student]] entries
 */
function sortMapping(Map){
    for(j = 0; j < Map.length(); j++){
        for(k = j; k < Map.length(); k++){
            let scoreCnt1 = Map.get(j).get(0);
            let scoreCnt2 = Map.get(k).get(0);
            if(scoreCnt1 < scoreCnt2){
                swap(Map,j,k);
            }
        }
    }
}


/**
 * 
 * ---------------------------
 * Tester Function/Debug Call.
 * ---------------------------
 * 
 */

function test(){
    const arrayShifts = new ArrayList();
    const arrayStudents = new ArrayList();
    
    // //Students Sample
    // const std1 = new Student('Dan');
    // const std2 = new Student('Ali');
    // const std3 = new Student('Sara');
    // const std4 = new Student('Billy');
    // const std5 = new Student('Mike');
    
    // std1.reduceAvailability("Mon",8.5,21.0);
    // std2.reduceAvailability("Tue",8.5,21.0);
    // std3.reduceAvailability("Wed",8.5,21.0);
    // std4.reduceAvailability("Thr",8.5,21.0);
    // std5.reduceAvailability("Fri",8.5,21.0);


    // arrayStudents.add(std1);
    // arrayStudents.add(std2);
    // arrayStudents.add(std3);
    // arrayStudents.add(std4);
    // arrayStudents.add(std5);


    //Students Sample
    const Baran = new Student('Baran Shajari');
    Baran.reduceAvailability("Thr",19.5,20.5);
    Baran.reduceAvailability("Fri",14.0,19.0);
    
    const Justin = new Student('Justin Balkisson');
    Justin.reduceAvailability("Mon",11.5,13.0);
    Justin.reduceAvailability("Mon",17.5,21.0);
    Justin.reduceAvailability("Tue",8.5,21.0);
    Justin.reduceAvailability("Wed",11.5,13.0);
    Justin.reduceAvailability("Wed",14.5,21.0);
    Justin.reduceAvailability("Thr",9.0,11.0);
    Justin.reduceAvailability("Thr",13.0,15.0);
    Justin.reduceAvailability("Thr",18.0,21.0);
    Justin.reduceAvailability("Fri",13.5,15.5);
    Justin.reduceAvailability("Fri",18.0,21.0);

    const Sara = new Student('Sara Malik Araibi');
    Sara.reduceAvailability("Mon",11.5,14.5);
    Sara.reduceAvailability("Tue",10.0,11.5);
    Sara.reduceAvailability("Tue",16.0,17.5);
    Sara.reduceAvailability("Wed",11.5,13.0);
    Sara.reduceAvailability("Wed",18.0,19.0);
    Sara.reduceAvailability("Thr",13.0,15.0);
    Sara.reduceAvailability("Thr",16.0,17.5);
    Sara.reduceAvailability("Fri",10.0,11.5);
    Sara.reduceAvailability("Fri",13.5,21.0);

    const Dan = new Student('Dan Stefan Voicu');
    Dan.reduceAvailability("Mon",8.5,10.5);
    Dan.reduceAvailability("Mon",11.5,12.5);
    Dan.reduceAvailability("Mon",16.0,19.0);
    Dan.reduceAvailability("Tue",10.0,11.5);
    Dan.reduceAvailability("Wed",8.5,9.5);
    Dan.reduceAvailability("Wed",11.5,12.5);
    Dan.reduceAvailability("Wed",16.0,17.5);
    Dan.reduceAvailability("Wed",19.0,20.0);
    Dan.reduceAvailability("Thr",10.0,11.5);
    Dan.reduceAvailability("Thr",16.0,17.5);
    Dan.reduceAvailability("Fri",8.5,8.5);
    Dan.reduceAvailability("Fri",11.5,12.5);

    // const Ali = new Student('Muhammad Ali');
    // Ali.reduceAvailability("Mon",9.0,10.5);
    // Ali.reduceAvailability("Mon",11.5,13.0);
    // Ali.reduceAvailability("Mon",14.5,17.5)

    arrayStudents.add(Dan);
    arrayStudents.add(Sara);
    arrayStudents.add(Justin);
    arrayStudents.add(Baran);


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

    sft = new Shift("WSC");
    sft.setTime(13.5,15.5);
    sft.setDate("Fri");
    arrayShifts.add(sft);

    //Testing Equalities
    // sftEqu1 = new Shift("WSC");
    // sftEqu2 = new Shift("WSC");
    // sftEqu1.setTime(8.5,9.0);
    // sftEqu1.setDate("Tue");
    // sftEqu2.setTime(8.5,9.0);
    // sftEqu2.setTime("Mon");
    
    // sftNon = new Shift("WSC");
    // sftNon.setTime(16.5,21.0);
    // sftNon.setDate("Tue");


    // console.log(sftEqu1.equals(sftEqu2));
    // console.log(sftEqu1.equals(sftNon));


    console.log("Starting computation");
    console.log(Dan.hourCap);

    Dan.reduceAvailability("Mon",8.5,18.5);
    Baran.reduceAvailability("Mon",8.5,18.5);
    Justin.reduceAvailability("Mon",8.5,18.5);
    Sara.reduceAvailability("Mon",8.5,18.5);

    sftMon = new Shift();
    sftMon.setDate("Mon");
    sftMon.setTime(8.5,18.5);

    arrayShifts.add(sftMon);

    let mapping = randomScore(arrayShifts,arrayStudents);
    setAssignmentsRandom(mapping);
    Dan.changeHourCap(25);
    console.log(arrayShifts);
    console.log(arrayStudents);
    console.log("end")



    /**
     * Testing stack data type
     */

    // let s = new Stack();
    // s.push(Dan);
    // console.log(s.size());
    // console.log(s.peak());
    // console.log(s.pop());
    // console.log(s.peak());
    // console.log(s.size());

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