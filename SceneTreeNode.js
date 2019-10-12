class SceneTreeNode extends CGFobject {
    constructor(scene, id, tree, children = null, materials = null, texture = null, transformation = null) {
        super(scene);
        this.id = id;
        this.tree = tree;
        this.children = children;
        this.materials = materials;
        this.activeMaterialIndex = 0;
        this.texture = texture;
        this.transformationMatrix = transformation;

        this.length_s = 1;
        this.length_t = 1;
    }

    rotateMaterials() {
        if (this.materials) {
            this.activeMaterialIndex++;
            this.activeMaterialIndex %= this.materials.length;
        }
    }

    updateScaleFactors(length_s, length_t) {
        return;
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
        if (this.texture == -1) {
            this.tree.applyTexture(null);
        } else if (this.texture != null) {
            this.tree.applyTexture(this.texture);
        }

        let update = this.length_s > 0 && this.length_t > 0;
        for (let child of this.children) {
            if (update) {
                child.updateScaleFactors(this.length_s, this.length_t);
            }
            child.display();
        }

        this.tree.popTexture();

        this.tree.popMaterial();

        this.scene.popMatrix();
    }
}