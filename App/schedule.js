
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
        let endIndex = this._selectedTime.indexOf(till);

        //If the indexes don't find an element, it will try to find the next best one
        if(startIndex == -1){
            if(this._selectedTime.length <= 0){ //Check if there is any elements in the array
                throw Error('Schedule.trim: there is no allocated time');
            }
            else{ //Try finding the next best index
                let nextBestFrom = from;
                while(startIndex == -1){
                    nextBestFrom += 0.5;
                    startIndex = this._selectedTime.indexOf(nextBestFrom);
                }
            }
        }
        //If the indexes don't find an element, it will try to find the next best one
        if(endIndex == -1){
            if(this._selectedTime.length <= 0){ //Check if there is any elements in the array
                throw Error('Schedule.trim: there is no allocated time');
            }
            else{ //Try finding the next best index
                let nextBestTo= till;
                while(endIndex == -1){
                    nextBestTo -= 0.5;
                    endIndex = this._selectedTime.indexOf(nextBestTo);
                }
            }
        }
        //Only perform this operation if it make sense to do so
        if(startIndex < endIndex){
            let prt1 = this._selectedTime.splice(0, startIndex);
            let prt2 = this._selectedTime.splice(endIndex-startIndex+1, this._selectedTime.length-1); //When splice is called, ._selectedTime takes on the other half of the array. This index needs to be compensated here
            this._selectedTime = prt1.concat(prt2);
        }
    }
    
    subSection(from,till){
        let startIndex = this._selectedTime.indexOf(from);
        let endIndex = this._selectedTime.indexOf(till)-1;
        if(startIndex < endIndex){
            
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