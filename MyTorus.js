class MyTorus extends CGFobject{
    constructor(scene,id,inner,outter,slices,loops){
        super(scene);
        this.inner = inner;
        this.outter = outter;
        this.slices = slices;
        this.loops = loops;

        this.initBuffers();

    }



    initBuffers(){
        this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];


        let slice_angle = 2*Math.PI/this.slices;
		let loop_angle = 2*Math.PI/this.loops;

        for(let i = 0;i <= this.slices;i++){
            for(let j = 0; j <=this.loops; j++){
                
                this.vertices.push(
                    (this.outer_radius + this.inner_radius*Math.cos(loop_angle*j)) * Math.cos(slice_angle*i), 
					(this.outer_radius + this.inner_radius*Math.cos(loop_angle*j)) * Math.sin(slice_angle*i), 
					this.inner_radius * Math.sin(loop_angle*j)

                );



            }
        }

        for (let i = 0; i < this.slices; i++) {
			for(let j = 0; j < this.loops; j++) {
				this.indices.push(
					(i+1)*(this.loops+1) + j, i*(this.loops+1) + j+1, i*(this.loops+1) + j,
					i*(this.loops+1) + j+1, (i+1)*(this.loops+1) + j, (i+1)*(this.loops+1) + j+1
				);
			}
        }


    }

}