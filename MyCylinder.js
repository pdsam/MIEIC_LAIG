class MyCylinder extends CGFobject {

	constructor(scene, id, slices, stacks, radius_bot, radius_top, height) {
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
		let ang_inc = 2 * Math.PI / this.slices;
		let n_verts = (this.slices + 1) * 4;
		let heigh_inc = this.height / this.stacks;
		let radius = this.radius_bot;
		let h = 0;


		//Vertices
		//TODO check if < or if <=
		for (var j = 0; j < this.stacks; j++) {
			for (var i = 0; i < this.slices; i++) {

				var sa = Math.sin(ang);
				var ca = Math.cos(ang);

				this.vertices.push(radius * ca, radius * sa, h);

				if (radius == 0) { // TODO check if it's the tip of the cone, might not be needed
					break;
				}

				ang += ang_inc;
			}
			ang = 0;
			radius = this.radius_bot * (this.stacks - j + 1) / this.stacks + this.radius_top * ((j + 1) / this.stacks) // optimize this?
			h += heigh_inc;
		}

		console.log("vertices: " + this.vertices.length);

		//INDICES

		for (var j = 0; j < this.slices; j++) {



			for (var i = 1; i < this.stacks - 1; i++) {
				for (var j = 0; j < this.slices; j++) {

					let index = i * this.slices + j;
					let upper = (i + 1) * this.slices + j;




					this.indices.push(index, index + 1, upper);
					this.indices.push(index + 1, upper + 1, upper);
				}






			}




			this.primitiveType = this.scene.gl.TRIANGLES;
			this.initGLBuffers();

		}

	}
}