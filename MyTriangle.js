class MyTriangle extends CGFobject{
    constructor(scene, id, x1,x2,x3,y1,y2,y3){
        super(scene);
        this.slices = slices;
        this.initBuffers();

    }

    initBuffers(){
        this.vertices = [
            this.x1,this.y1,0,
            this.x2,this.y2,0,
            this.x3, this.y3,0

        ];

        this.indices = [
            0,1,2,
        ];


    }



}