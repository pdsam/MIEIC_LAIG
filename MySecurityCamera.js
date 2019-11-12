class MySecurityCamera extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

	initBuffers() {
		this.vertices = [
            0.5, -0.5, 0,
            1, -0.5, 0,
            0.5, -1, 0,
            1, -1, 0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 3, 1,
            0, 2, 3
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		
		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

}