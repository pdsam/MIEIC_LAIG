class SceneTreeNode extends CGFobject {
    constructor(scene, tree, children = null, materials = null, texture = null, transformation = null) {
        super(scene);
        this.tree = tree;
        this.children = children;
        this.materials = materials;
        this.activeMaterialIndex = 0;
        this.texture = texture;
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
        if (this.texture != null) {
            this.tree.applyMaterial(this.texture);
        } else if (this.texture == -1) {
            this.scene.setDefaultAppearance();
        }
        
        for (let child of this.children) {
            child.display();
        }

        this.tree.popTexture();
        this.tree.popMaterial();
        this.scene.popMatrix();
    }
}