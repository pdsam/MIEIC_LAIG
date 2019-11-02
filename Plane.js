class Plane extends CGFobject {
    constructor(scene, uDivisions, vDivisions) {
        super(scene);
        this.uDivisions = uDivisions;
        this.vDivisions = vDivisions;
        this.createSurface();


    }

    createSurface() {
        var nurbsSurface = new CGFnurbsSurface(1, 1,
            [
                [
                    [-0.5, 0.0, 0.5, 1],
                    [-0.5, 0.0, -0.5, 1]
                ],
                [
                    [0.5, 0.0, 0.5, 1],
                    [0.5, 0.0, -0.5, 1]
                ]
            ]


        );

        this.nurbsPlane = new CGFnurbsObject(this.scene,this.uDivisions,this.vDivisions,nurbsSurface);


    }


    display(){
        this.nurbsPlane.display();
    }

}