
/**
 * The schedule class is used in managing time frames of a day.
 * Time is organized into 30 min chunks.
 */
class Schedule {

    constructor(){
        this._selectedTime = generateHours();
    }

    get selectedTime(){
        return this._selectedTime;
    }

    /**
     * Cuts a subset of 30 min chunks from the current list
     * Precondition: 1) Numbers from 8.5, 9.0, 9.5, ..., 21.0. 2) when the method is repeatedly called, there is no overlap in past calls.
     * @param {*A Number that selects the element to start at} from 
     * @param {*A Number that selects the element to end at} till 
     */
    trim(from, till){
        let startIndex = this._selectedTime.indexOf(from);
        let endIndex = this._selectedTime.indexOf(till)-1;
        if(startIndex < endIndex){
            let prt1 = this._selectedTime.splice(0, startIndex);
            let prt2 = this._selectedTime.splice(endIndex, this._selectedTime.length-1);
            this._selectedTime = prt1.concat(prt2);
        }
    }

    reset(){
        this._selectedTime = generateHours();
    }

}

/**     
 * Generates and returns the array [8.5, 9.0, 9.5, ... , 21.0].
 */
function generateHours(){
    let i = 0;
    let chunk = 8.5;
    const output = [];
    while(i<=25){
        output.push(chunk);
        chunk += 0.5;
        i++;
    }
    return output;
}