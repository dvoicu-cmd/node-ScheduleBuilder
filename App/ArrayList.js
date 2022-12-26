/**
 * A simple ArrayList class.
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
     * @param {*} index specified index.
     * @param {*} element element to be added.
     */
    addAt(index,element){
        let prt1 = this.ArrayList.splice(index,0);
        let prt2 = this.ArrayList;
        prt1.push(element);
        this.ArrayList = prt1.concat(prt2);
    }

    /**
     * Removed at element at a specified index and returns it.
     * @param {*} index the specified index.
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
     * @param {*} element 
     * @returns 
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
     * a method to return the length of the arrayList
     * @returns The length of the arrayList
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