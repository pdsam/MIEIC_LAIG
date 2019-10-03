class SceneTreeNode extends CGFobject {
    constructor(scene, tree, children = null, materials = null, textures = null, transformation = null) {
        super(scene);
        this.tree = tree;
        this.children = children;
        this.materials = materials;
        this.activeMaterialIndex = 0;
        this.textures = textures;
        this.activeTextureIndex = 0;
        this.transformationMatrix = transformation;
    }

    rotateMaterials() {
        if (this.materials) {
            this.activeMaterialIndex++;
            this.activeMaterialIndex %= this.materials.children;
        }
    }

    display() {
        this.scene.pushMatrix();
        if (this.transformationMatrix != null) {
            this.scene.multMatrix(this.transformationMatrix);
        }
        this.tree.pushMaterial();
        if (this.materials != null) {
            this.tree.applyMaterial(this.materials[this.activeMaterialIndex]);
        }
        this.tree.pushTexture();
        if (this.textures != null) {
            this.tree.applyMaterial(this.textures[this.activeTextureIndex]);
        }
        
        for (let child of this.children) {
            child.display();
        }

        this.tree.popTexture();
        this.tree.popMaterial();
        this.scene.popMatrix();
    }
}