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
               let point =  Object.values(this.controlPoints[i*this.npointsV+j]);
               point.push(1);
                subBuffer.push(point);
            }
            controlPoints.push(subBuffer);
        }

        let surface = new CGFnurbsSurface(this.nPointsU-1,this.npointsV-1,controlPoints);
        this.nurbsPatch = new CGFobject(this.scene,this.npartsU,this.npartsV,surface);
    }

    display(){
        this.nurbsPatch.display();
    }
}