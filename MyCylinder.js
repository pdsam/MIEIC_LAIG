class MyCylinder extends CGFobject {

	constructor(scene, slices,stacks, radius_bot, radius_top, height) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.radius_bot = radius_bot;
		this.radius_top = radius_top;
		this.height = height;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let ang = 0;
		let ang_inc = 2*Math.PI/this.slices;
		let n_verts = (this.slices+1)*4;
		let heigh_inc = this.height/this.stacks;
		let radius = radius_bot;
		let h = 0;


		//Vertices
		//TODO check if < or if <=
		for(var j  = 0; j < this.stacks;j++){
			for (var i = 0; i < this.slices; i++) {
				
				var sa=Math.sin(ang);
            	var ca=Math.cos(ang);
				
				this.vertices.push(radius*ca,radius*sa,h);

				if(radius == 0){// TODO check if it's the tip of the cone, might not be needed
					break;
				}
				
				ang+= ang_inc;
			}
			ang = 0;
			radius = this.radius_bot*(this.stacks-j+1)/this.stacks + this.radius_top*((j+1)/this.stacks) // optimize this?
			h+= heigh_inc;
		}

		//INDICES

		for(var i = 0; i <this.stacks;i++ ){
			for(var j = 0; j < this.slices;j++){

				if(j +1 != slices){
				//does not work for the last slice
				   this.indices.push(i*this.slices+j);
				   this.indices.push(i*this.slices + j+1);
				   this.indices.push((i+1)*this.slices+j);

				   this.indices.push(i*this.slices + j +1);
				   this.indices.push((i+1)*this.slices+j+1);
				   this.indices.push((i+1)*this.slices+j);
				}
				else{
					
					this.indices.push(i*this.slices+j);
					this.indices.push(i*this.slices + j+1);
					this.indices.push((i+1)*this.slices+j);
 
					this.indices.push(i*this.slices + j +1);
					this.indices.push((i+1)*this.slices+j+1);
					this.indices.push((i+1)*this.slices+j);

				}
			
			}


		}


		// 	/* VERTICES */
        //     this.vertices.push(ca, 0, -sa);
        //     this.vertices.push(ca, 1, -sa);
        //     this.vertices.push(ca, 0, -sa);
        //     this.vertices.push(ca, 1, -sa);

        //     /* TEXTURE COORDS */
        //     this.texCoords.push(i*1.0/this.slices, 1);
		// 	this.texCoords.push(i*1.0/this.slices, 0);
		// 	this.texCoords.push(Math.cos(ang)/2 + 0.5, Math.sin(ang)/2 + 0.5);
		// 	this.texCoords.push(Math.cos(ang)/2 + 0.5, Math.sin(ang)/2 + 0.5);

        //     /* INDICES */
        //     this.indices.push(i*4, ((i+1)*4) % n_verts, (i*4+1) % n_verts);
        //     this.indices.push(((i+1)*4) % n_verts, ((i+1)*4+1) % n_verts, (i*4+1) % n_verts);
        //     this.indices.push(((i+1)*4+2) % n_verts, (i*4+2) % n_verts, n_verts);
        //     this.indices.push((i*4+3) % n_verts, ((i+1)*4+3) % n_verts, n_verts+1);

        //     /* NORMALS */
        //     this.normals.push(ca, 0,-sa);
		// 	this.normals.push(ca, 0,-sa);
		// 	this.normals.push(0,-1,0);
		// 	this.normals.push(0,1,0);

        //     ang += ang_inc;
		// }

		// this.vertices.push(0,0,0);
		// this.vertices.push(0,1,0);

		// this.texCoords.push(0.5,0.5);
		// this.texCoords.push(0.5,0.5);
		
		// this.normals.push(0,-1,0);
		// this.normals.push(0,1,0);

		

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	
	}

}