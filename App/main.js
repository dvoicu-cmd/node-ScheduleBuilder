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
 * Please don't mix students and shift lists
 * @param {*} List
 * @param {*} Element 
 * @returns List
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


function randomAssign(Shifts,Students){

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