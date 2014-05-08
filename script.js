/* 
Jennifer Cahalane 
Senior Design - Spring 2014 
Initializes the WebGL scene, and updates it
*/  

$(function(){

/*
  _______  __        ______   .______        ___       __      
 /  _____||  |      /  __  \  |   _  \      /   \     |  |     
|  |  __  |  |     |  |  |  | |  |_)  |    /  ^  \    |  |     
|  | |_ | |  |     |  |  |  | |   _  <    /  /_\  \   |  |     
|  |__| | |  `----.|  `--'  | |  |_)  |  /  _____  \  |  `----.
 \______| |_______| \______/  |______/  /__/     \__\ |_______|
*/             

  //angle offset
  var offset = 1.0 * degToRad;

  //camera controls
  var controls; 




/*
 _______  __    __  .__   __.   ______ .___________. __    ______   .__   __.      _______.
|   ____||  |  |  | |  \ |  |  /      ||           ||  |  /  __  \  |  \ |  |     /       |
|  |__   |  |  |  | |   \|  | |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
|   __|  |  |  |  | |  . `  | |  |         |  |     |  | |  |  |  | |  . `  |     \   \    
|  |     |  `--'  | |  |\   | |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |   
|__|      \______/  |__| \__|  \______|    |__|     |__|  \______/  |__| \__| |_______/    
*/

  init();
  animate();

  function init() {
  	//scene
    scene = new THREE.Scene();
    height = window.innerHeight-42;

  	//camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ height, 1, 1000);
    camera.position.z = 7;

    cameraObject = new THREE.Object3D();
    cameraObject.add(camera);
    scene.add(cameraObject);
    camera.lookAt(scene.position);

    //lights
    var light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(1, 2, 1.5);
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff, 2.0);
    light2.position.set(-2, -1.5, -1);
    scene.add(light2);

    //material
    material = new THREE.MeshPhongMaterial( { color: 0xe7eaed } );

    //load objects
    loadMale();
    loadFemale();
    loadEffector();

    //initialize renderer
    if (window.WebGLRenderingContext){
      renderer = new THREE.WebGLRenderer({antialias: true});
    }else{
      renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(window.innerWidth, height );
    $("#content").html( renderer.domElement );
   
    projector = new THREE.Projector();

    onWindowResize();

    //set camera controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    //Event Listeners
    $(window).on("keydown", function(event){keyDown(event);}); 
    $(window).on("keyup", function(event){keyUp(event);});

    $("canvas").on( 'mouseup', function(event){
      onDocumentMouseUp(event);
    });

    $(window).on( 'resize', function(){
      onWindowResize();
    });

    $("#select-root").on('click', function(){
      toggleRoot();

    });
    $("#x-rot").blur(function(e){
      var rotVal = e.target.value * degToRad;
      blurX(SELECTED, rotVal);
    });
    $("#x-back").click(function(){
      var xRot = SELECTED.rotation.x + offset;
        blurX(SELECTED, xRot);
    });
    $("#x-forward").click(function(){
        var xRot = SELECTED.rotation.x - offset;
        blurX(SELECTED, xRot);
    });

    $("#y-rot").blur(function(e){
      var rotVal = e.target.value * degToRad;
      blurY(SELECTED, rotVal);
    });
    $("#y-back").click(function(){
      var yRot = SELECTED.rotation.y - offset;
        blurY(SELECTED, yRot);
    });
    $("#y-forward").click(function(){
        var yRot = SELECTED.rotation.y + offset;
        blurY(SELECTED, yRot);
    });

    $("#z-rot").blur(function(e){
      var rotVal = e.target.value * degToRad;
      blurZ(SELECTED, rotVal);
    });
    $("#z-back").click(function(){
      var zRot = SELECTED.rotation.z + offset;
        blurZ(SELECTED, zRot);
    });
    $("#z-forward").click(function(){
        var zRot = SELECTED.rotation.z - offset;
        blurZ(SELECTED, zRot);
    });

    $(".ik_fk").click(function(e){
      toggleIK(e);
    })

    $("#gender").click(function(){
       console.log(SELECTED);
      if (male){

        scene.remove(objects[0]);
        animate();
        scene.add(objects_female[0]);
        male=false;
      }else{
        scene.remove(objects_female[0]);
        animate();
        scene.add(objects[0]);
        male=true;
      }
    })

    renderer.domElement.addEventListener( 'mousedown', effectorClicked);
    renderer.domElement.addEventListener("mousemove", effectorMove );
    
    $("#info-btn").on("click", function(){
      toggleInfo();
    });
    $("#help-btn").on("click", function(){
      toggleHelp();
    });
  }


  function animate() {
    if (!ALT){
      controls.enabled = false;
    }
    else{
      controls.enabled = true;
    }
    controls.update();

    var xAxis = new THREE.Vector3(1, 0, 0);
    var yAxis = new THREE.Vector3(0, 1, 0);
    var zAxis = new THREE.Vector3(0, 0, 1);
    
    // note: three.js includes requestAnimationFrame
    requestAnimationFrame( animate );
    if(SELECTED && SELECTED.name == "root"){
      if (left){
      	SELECTED.position.x-=.1;
      }else if (right){
      	SELECTED.position.x+=.1;
      }else if (up){
      	SELECTED.position.y+=.1;
      }else if (down){
      	SELECTED.position.y-=.1;
      }else if (forward){
      	SELECTED.position.z+=.1;
      }else if (backward){
      	SELECTED.position.z-=.1;
      }
    }
    if (SELECTED){
            //rotate
      if (cwX){
        var cwxRot = SELECTED.rotation.x - offset;
        blurX(SELECTED, cwxRot);
      }else if (ccwX){
        var ccwxRot = SELECTED.rotation.x + offset;
        blurX(SELECTED, ccwxRot);
      }else if (cwY){
        var cwyRot = SELECTED.rotation.y + offset;
        blurY(SELECTED, cwyRot);
      }else if (ccwY){
        var ccwyRot = SELECTED.rotation.y - offset;
        blurY(SELECTED, ccwyRot);
      }else if (cwZ){
        var cwzRot = SELECTED.rotation.z - offset;
        blurZ(SELECTED, cwzRot);
      }else if (ccwZ){
        var ccwzRot = SELECTED.rotation.z + offset;
        blurZ(SELECTED, ccwzRot);
      }
    }

    update();

    renderer.render( scene, camera );
  }

});







