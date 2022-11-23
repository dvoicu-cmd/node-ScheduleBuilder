class ArrayList {
    constructor(){
        this.ArrayList = [];
    }

    /**
     * Adds an element to the end of the ArrayList
     * @param {*} element
     */
    add(element){
        this.ArrayList.push(element);
    }

    addAt(index,element){
        let prt1 = this.ArrayList.splice(index,0);
        let prt2 = this.ArrayList;
        prt1.push(element);
        this.ArrayList = prt1.concat(prt2);
    }

    remove(index){
        let prt1 = this.ArrayList.splice(index,1);
        let prt2 = this.ArrayList;
        let output = prt1.pop();
        this.ArrayList = prt1.concat(prt2);
        return output;
    }

    clear(){
        this.ArrayList = [];
    }

    indexOf(element){
        return this.ArrayList.indexOf(element);
    }

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