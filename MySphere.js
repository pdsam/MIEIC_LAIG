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
        this.texCoords = [];

        console.log(Math.PI);
        console.log(this.slices);
        console.log(this.stacks);

        let dPhi = 2 * Math.PI / this.slices;
        let dTheta = Math.PI / (this.stacks * 2 - 1);

        this.vertices.push(...[0,0,1]);
        this.normals.push(...[0,0,1]);

        let lastIndex = 1;
        for (let i = 1; i <= this.stacks * 2 - 1; i++) {
            for (let j = 0; j < this.slices; j++) {
                let x = Math.sin(dTheta*i) * Math.cos(dPhi*j);
                let y = Math.sin(dTheta*i) * Math.cos(dPhi*j);
                let z = Math.sin(dTheta*i) * Math.cos(dPhi*j);

                this.normals.push(...[x,y,z]);
                this.vertices.push(...[this.radius*x, this.radius*y, this.radius*z]);

                lastIndex++;
            }
        }

        this.vertices.push(...[0,0,-1]);
        this.normals.push(...[0,0,-1]);
        lastIndex++;

        for (let i = 0; i < this.slices; i++) {
            this.indices.push(i + 1);
            this.indices.push(i + 2);
            this.indices.push(0);
        }

        let firstIndex = 1 + this.slices;
        for(let i = 0; i < this.stacks * 2 - 2; i++) {
            for(let j = 0; i < this.slices; j++) {
                let base = firstIndex + j; 
                //First triangle
                this.indices.push(base);
                this.indices.push(base - this.slices + 1);
                this.indices.push(base - this.slices);

                //Second triangle
                this.indices.push(base);
                this.indices.push(base + 1);
                this.indices.push(base - this.slices + 1);
            }

            firstIndex += this.slices;
        }

        for (let i = 0; i < this.slices; i++) {
            this.indices.push(firstIndex + i);
            this.indices.push(firstIndex + i + 1);
            this.indices.push(lastIndex);
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}