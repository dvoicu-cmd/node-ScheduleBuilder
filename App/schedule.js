class Schedule {
    /**
     * This is the default constructor for a Schedule object
     * It assigns a time
     */


    constructor(){
        let hourVal = 8.5
        let temp = [hourVal];
        for(let i = 0; i <= 24; i++){ //25 timeValues
            temp.push(hourVal+0.5);
        }
        this.Time = temp;

    }

}