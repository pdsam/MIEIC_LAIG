class Animation {

    constructor(){
        if(this.constructor === Animation){
            throw new TypeError('Abstract class "Animation" cannot be instantiated directly.');
        }
    }

    update(){
        throw new TypeError('Cannot use update() from Abstract class "Animation".');
    }
    display(){
        throw new TypeError('Cannot use display() from Abstract class "Animation".');
    }



}