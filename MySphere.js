class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let dPhi = 2 * Math.PI / this.slices;
        let dTheta = Math.PI / (this.stacks * 2 - 1);

        //One Pole
        this.vertices.push(...[0,0,1]);
        this.normals.push(...[0,0,1]);

        for (let i = 1; i <= this.stacks * 2 - 1; i++) {
            for (let j = 0; j < this.slices; j++) {
                let x = Math.sin(dTheta*i) * Math.cos(dPhi*j);
                let y = Math.sin(dTheta*i) * Math.cos(dPhi*j);
                let z = Math.sin(dTheta*i) * Math.cos(dPhi*j);

                this.normals.push(...[x,y,z]);
                this.vertices.push(...[this.radius*x, this.radius*y, this.radius*z]);
            }
        }

        //Other pole
        this.vertices.push(...[0,0,-1]);
        this.normals.push(...[0,0,-1]);

        //Triangles on first pole
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(i + 1);
            this.indices.push(i + 2);
            this.indices.push(0);
        }

        let firstIndex = 1;
        for(let i = 0; i < this.stacks * 2 - 2; i++) {
            for(let j = 0; j < this.slices; j++) {
                //First triangle
                this.indices.push(firstIndex + j);
                this.indices.push(firstIndex + j + this.slices);
                this.indices.push(firstIndex + this.slices + ((j+1) % this.slices));

                //Second triangle
                this.indices.push(firstIndex + j);
                this.indices.push(firstIndex + this.slices + ((j+1) % this.slices));
                this.indices.push(firstIndex + ((j + 1) % this.slices));
            }

            firstIndex += this.slices;
        }

        //Triangles on second pole 
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(firstIndex + i);
            this.indices.push(firstIndex + (i + 1) % this.slices);
            this.indices.push(this.vertices.length / 3 - 1);
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}