class Patch extends CGFobject{
    constructor(scene,npointsU,npointsV,npartsU,npartsV,controlPoints){
        super(scene);
        this.npointsU = npointsU;
        this.npointsV = npointsV;
        this.npartsU = npartsU;
        this.npartsV = npartsV;
        this.controlPoints = controlPoints;
        /*
        if(controlPoints.length != npointsU*npointsV){
            console.error("wrong number of points");
        }
        */
       this.createSurface();
    }


    createSurface(){
        let controlPoints = [];
        for(let i = 0; i <this.nPointsU;i++ ){
            let subBuffer = [];
            for(let j = 0; j < this.npointsV;j++){
                subBuffer.push(this.controlPoints[i*this.npointsV+j]);
                point.push(1);

            }
            controlPoints.push(subBuffer);
        }


    }

    display(){
        console.log("displayed");
    }
}