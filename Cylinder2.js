class Cylinder2 extends CGFobject{
    constructor(scene,base,top,height,slices,stacks){
        super(scene);
        this.base = base;
        this.top = top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.createSurface();
    }

    createSurface(){

        let controlPoints = [
                                [//u= 0 , v= 0..1
                                    [],
                                    []

                                ],


                                [//u= 1 , v= 0..1
                                    [],
                                    []

                                ],

                                
                                [//u= 2 , v= 0..1
                                    [],
                                    []

                                ]

        ];

        let surface = new CGFnurbsSurface(2,1)
        this.Nurbscylinder = new CGFobject()
        //this.nurbsPlane = new CGFnurbsObject(this.scene,this.uDivisions,this.vDivisions,nurbsSurface);

    }

}