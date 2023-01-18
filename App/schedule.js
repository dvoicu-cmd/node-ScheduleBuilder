/**
 * The schedule class is used in managing time frames of a day, where time is organized into 30 min chunks.
 * Properties:
 * - @param _selectedTime is an array of doubles initially containing the set: {8.5, 9, 9.5,...,20, 20.5, 21}. This list is the representation of 30 min chunks of a given work day.
 */
class Schedule {

    /**
     * Consructor method for the class.
     */
    constructor(){
        this._selectedTime = generateHours();
    }

    /**
     * Getter method for the class.
     */
    get selectedTime(){
        return this._selectedTime;
    }

    /**
     * Removes a subset of 30 min chunks from the current list.
     * Precondition: 1) Numbers from 8.5, 9.0, 9.5, ..., 21.0. are inputted. 2) when the method is repeatedly called, there is no overlap in past calls.
     * @param {*} from The starting boundry.
     * @param {*} till The ending boundry.
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
    
    /**
     * Selects a subset of 30 min chunks from the current list and removes all other elements outside the specified bounds.
     * Precondition: 1) Numbers from 8.5, 9.0, 9.5, ..., 21.0. are inputted. 2) when the method is repeatedly called, there is no overlap in past calls.
     * @param {*} from The starting boundry.
     * @param {*} till The ending boundry.
     */
    subSection(from,till){
        let startIndex = this._selectedTime.indexOf(from);
        let endIndex = this._selectedTime.indexOf(till);
        if(startIndex < endIndex){
            this._selectedTime.splice(0, startIndex);
            this._selectedTime.splice(endIndex-startIndex+1, this._selectedTime.length-1);
        }
    }

    /**
     * Resets the selectedTime property to it's default.
     */
    reset(){
        this._selectedTime = generateHours();
    }

    equal(otherSchedule){
        otherSchedule.selectedTime;
        let isEqual = true;

        if(this.selectedTime.length == 0){
            if(otherSchedule.selectedTime.length !== 0){
                isEqual = false;
                return isEqual;
            }
        }

        for(i = 0; i < this.selectedTime.length; i++){
            if(this.selectedTime[i] !== otherSchedule.selectedTime[i]){
                isEqual = false;
            }
        }
        return isEqual;
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