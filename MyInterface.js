/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    build(graph) {
        console.log("Building interface");
        let mapper = {};
        let keys =Object.keys(graph.views);
        for (let key of keys) {
            mapper[key] = key;
        }
        this.gui.add(graph, 'activeView', mapper)
        .name("Camera")
        .onChange(graph.changeCamera.bind(graph));
        
        var folder = this.gui.addFolder('Lights');
        
        for(let i = 0; i < graph.numberOfLights; i++) {
            folder.add(this.scene.lights[i], 'enabled')
            .name("Light: " + i)
            .onChange(console.log("changed"));
        }
      //  this.gui.add(this.scene, 'bruh').name('Display Diamond');
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
        if(event.code == "KeyM"){
            this.scene.graph.updateMaterials();
            console.log("M");
            console.log(this.scene.lights[0]);
        }
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}