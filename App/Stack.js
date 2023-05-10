/**
 * Stack data type
 */
class Stack{
    
    /**
     * Constructor method for stack.
     */
    constructor(){
        this.stack = new ArrayList();
    }

    /**
     * Pushes elements onto the stack.
     */
    push(element){
        this.stack.add(element);
    }

    /**
     * Removes/Pops an element off the stack
     * @returns element removed.
     */
    pop(){
        if(this.stack.length() > 0){
            return this.stack.remove(this.stack.length()-1);
        }
    }

    /**
     * Checks the first element in the stack.
     * @returns element on the top of the stack.
     */
    peak(){
        if(this.stack.length() > 0){
            let output = this.stack.get(this.stack.length()-1);
            return output;
        }
        else return undefined; 
    }

    /**
     * Shows the number of elements stored in the stack
     * @returns number of elements in the stack.
     */
    size(){
        return this.stack.length();
    }

}