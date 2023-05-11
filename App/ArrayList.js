/**
 * A simple ArrayList class that mimics the arrayList object in Java.
 */
class ArrayList {
    constructor(){
        this.ArrayList = [];
    }

    /**
     * Adds an element to the end of the ArrayList.
     * @param {*} element element to be added.
     */
    add(element){
        this.ArrayList.push(element);
    }

    /**
     * Adds an element at a specified index.
     * @param {positive integer} index specified index.
     * @param {*} element element to be added.
     */
    addAt(index,element){
        let prt1 = this.ArrayList.slice(0,index);
        let prt2 = this.ArrayList.slice(index,this.ArrayList.length);
        prt1.push(element);
        this.ArrayList = prt1.concat(prt2);
    }

    /**
     * Removed at element at a specified index and returns it.
     * @param {positive integer} index the specified index.
     * @returns the element that is removed.
     */
    remove(index){
        let prt1 = this.ArrayList.splice(index,1);
        let prt2 = this.ArrayList;
        let output = prt1.pop();
        this.ArrayList = prt1.concat(prt2);
        return output;
    }

    /**
     * Clears all contents of the arrayList.
     */
    clear(){
        this.ArrayList = [];
    }

    /**
     * Returns the index of a specified element.
     * @param {*} element the specified index.
     * @returns The element at the specified index.
     */
    indexOf(element){
        return this.ArrayList.indexOf(element);
    }

    /**
     * Gets the element at a specified index.
     * @param {*} index 
     * @returns 
     */
    get(index){
        return this.ArrayList.at(index);
    }

    /**
     * a method to return the length of the arrayList.
     * @returns The length of the arrayList.
     */
    length(){
        return this.ArrayList.length;
    }

    /**
     * Randomizes the arrayList's contents.
     */
    randomize(){ //Thanks BroCode on YT
        let currentIndex = this.ArrayList.length-1;
        while(currentIndex >= 0){
            let randomIndex = Math.floor(Math.random()*this.ArrayList.length);
            let temp = this.ArrayList[currentIndex];
            this.ArrayList[currentIndex] = this.ArrayList[randomIndex];
            this.ArrayList[randomIndex] = temp;            
            currentIndex--;
        }
    }

}
//Export the class
module.exports = ArrayList;