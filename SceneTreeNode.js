/**
 * The basic node in the scene tree.
 * SceneTreeNde is not supposed to be a tree leaf as it
 * is a representation of a scene component.
 * 
 * Tree leaves are represented by primitives.
 */
class SceneTreeNode extends CGFobject {
    constructor(scene, id, tree, children = null, materials = null, texture = null, transformation = null) {
        super(scene);
        this.id = id;
        this.tree = tree;
        this.children = children;
        this.materials = materials; //Will be set to null if it supposed to inherit from the parent
        this.activeMaterialIndex = 0;

        /* 
            The texture attribute can be of three types:
                - A CGFtexture
                - null if it is supposed to be inherited
                - -1 if the object has no texture
        */
        this.texture = texture;
        this.transformationMatrix = transformation;

        // These will be set to -1 when texture is set to be inherited
        // as the component will inherit the parents lengths.
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
        this.children.forEach(element => {
            element.updateScaleFactors(length_s, length_t);
        });
    }

    display() {
        this.scene.pushMatrix();
        if (this.transformationMatrix != null) {
            this.scene.multMatrix(this.transformationMatrix);
        }

        this.tree.pushMaterial();
        //Only apply material if it is not inheriting
        if (this.materials != null) {
            this.tree.applyMaterial(this.materials[this.activeMaterialIndex]);
        }
        
        this.tree.pushTexture();
        if (this.texture == -1) {
            //Object has no texture
            this.tree.applyTexture(null);
        } else if (this.texture != null) {
            //Object has its own texture
            this.tree.applyTexture(this.texture);
        }

        //Check if texture scale factors need to be applied
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