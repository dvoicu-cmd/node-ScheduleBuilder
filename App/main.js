
/**
 * Initalizes the list of shifts
 */
function initShiftList(){

}

function randomizeList(){

}

function test(){
    const arrayL = new ArrayList();
    const std1 = new Student('Dan');
    const std2 = new Student('Ali');
    const std3 = new Student('Sara');
    const std4 = new Student('Billy');
    arrayL.add(std1);
    arrayL.add(std2);
    arrayL.add(std3);
    arrayL.add(std4);
    console.log(arrayL.ArrayList);
    arrayL.randomize();
    console.log(arrayL.ArrayList);
}