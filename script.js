$(function(){
	var camera, cameraO, renderer;
  var geometry, material, mesh;

  var cameraObject;
	//translate 
  var left = false;
  var right = false;
  var up = false;
  var down = false;
 	//zoom
  var forward = false;
  var backward = false;
  //rotate
  var cwY = false;
  var ccwY = false;
  var cwX = false;
  var ccwX = false;
  var cwZ = false;
  var ccwZ = false;
  var perspective = true;
  var view = "front";
  var projector, mouse = {x:0, y:0};

  var selectedMaterial;
  var controls; 
  var ALT = false;
  var pelvis;
  var male=true;
  var height;

  init();
  animate();

  function init() {
  	//scene
   
    scene = new THREE.Scene();
    height = window.innerHeight-42;
  	//camera
  	//width, height, fov, near, far, orthonear, ortho far
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ height, 1, 1000);
    camera.position.z = 10;

    //cameraO = new THREE.OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, height/2, height/-2, 1, 1000);

    cameraObject = new THREE.Object3D();
    cameraObject.add(camera);
    // cameraObject.add(cameraO);
    scene.add(cameraObject);
    camera.lookAt(scene.position);

    //light
    var light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(1, 2, 1.5);
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff, 2.0);
    light2.position.set(-2, -1.5, -1);
    scene.add(light2);

    material = new THREE.MeshLambertMaterial( { color: 0xbbbbbb } );

    /*load object */
   
    loadMale();
    loadFemale();
    loadEffector();

    if (window.WebGLRenderingContext){
      console.log("before call");
      renderer = new THREE.WebGLRenderer({antialias: true});
      console.log("after call");
    }else{
      console.log("before canvas");
      renderer = new THREE.CanvasRenderer();
      console.log("canvas render");
    }
    renderer.setSize(window.innerWidth, height );
    $("#content").html( renderer.domElement );
    // $("#content").css("margin-left", ""+ window.innerHeight/2+"px;");
   
    projector = new THREE.Projector();
    mouse.x = 0;
    mouse.y = 0;
    $(window).keydown(function(event){keyDown(event)}); 
    $(window).keyup(function(event){keyUp(event)});

    /*lets make jquery style*/
    //renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown);
    window.addEventListener( 'resize', onWindowResize);
    $("#select-root").on('click', function(){
      toggleRoot();

    });
    $("#x-rot").blur(function(e){
      blurX(e);
    });
    $("#y-rot").blur(function(e){
      blurY(e);
    });
      $("#z-rot").blur(function(e){
      blurZ(e);
    });

      $("#gender").click(function(){
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
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    //on keydown set values to true, on keyup, set values to false
    //in function that updates if values true;
  }

  function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function keyDown(e){
    ALT = e.altKey;
    switch (e.which){
    	case 87:	//w
        up = true;
        break;
    	case 83: 	//s
        down = true;
        break;
		  case 65:	//a
        left = true;
        break;
    	case 68:	//d
        right = true;
        break;
    	case 81:	//q
        backward = true;
        break;
		  case 69:	//e
        forward = true;
        break;

    	//rotate
    	case 76:	//l -- clockwise about y
        if (!perspective  && (view == "front" || view == "bottom")){
          cwY = false;
        }else {
          cwY = true;
        }
        break;
		  case 74: //j -- counterClockwise about y
        if (!perspective  && (view == "front" || view == "bottom")){
          ccwY = false;
        }else{
          ccwY = true;
        }
        break;
    	case 73:	//i -- clockwise about x
        if (!perspective  && (view == "front" || view == "bottom")){
          cwX = false;
        }else{
          cwX=true;
        }
        break; 
    	case 75:	//k -- counterClockwise about x
        if (!perspective  && (view == "front" || view == "bottom")){
          ccwX = false;
        }else{
          ccwX = true;
        }
        break;
    	case 85:	//u -- counterClockwise about z
        ccwZ = true;
        break;
    	case 79:	//o -- clockwise about z
        cwZ = true;
        break;
    }
  }

  function keyUp(e){
    ALT = e.altKey;
    switch (e.which){
    	case 87:	//w
        up = false;
        break;
    	case 83: 	//s
        down = false;
        break;
	   	case 65:	//a
        left = false;
        break;
    	case 68:	//d
        right = false;
        break;
    	case 81:	//q
        backward = false;
        break;
		  case 69:	//e
        forward = false;
        break;

    	//rotate
    	case 76:	//l -- clockwise about y
        cwY = false;
        break;
		  case 74: //j -- counterClockwise about y
        ccwY = false;
        break;
    	case 73:	//i -- clockwise about x
        cwX = false;
        break; 
    	case 75:	//k -- counterClockwise about x
        ccwX = false;
        break;
    	case 85:	//u -- counterClockwise about z
        ccwZ = false;
        break;
    	case 79:	//o -- clockwise about z
        cwZ = false;
        break;
    	//toggle perspective
    	case 80:
        if (perspective){
          perspective = false;
    			/*let's also change the text in the controls div to alert users
          that in orthographic mode*/
        }else{
          perspective = true;
    			//change controls div to say perspective
    		}
    		break;
    }
  }

  function animate() {
    controls.update();
    var xAxis = new THREE.Vector3(1, 0, 0);
    var yAxis = new THREE.Vector3(0, 1, 0);
    var zAxis = new THREE.Vector3(0, 0, 1);
    var offset = 1.0 * degToRad;
      // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );
    if(SELECTED && SELECTED.name == "root"){
    //for (var i=0; i< )
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
        if (SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow")
        {}
        else{  
          SELECTED.rotation.x -= offset;
        }
      }else if (ccwX){
        if (SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow")
        {}
        else{  
           SELECTED.rotation.x += offset;
        }
      }else if (cwY){
        if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee")
        {}
        else{  
            SELECTED.rotation.y += offset;
        }
      }else if (ccwY){
        if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee")
          {}
        else{  
          SELECTED.rotation.y -= offset;
        }
      }else if (cwZ){
        if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee" || SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow")
        {}
        else{  
          SELECTED.rotation.z -= offset;
        }
      }else if (ccwZ){
        if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee"|| SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow")
        {}
        else{  
          SELECTED.rotation.z += offset;
        }
      }
      /*if (SELECTED._rotation._quaternion._y >= 360){
          SELECTED._rotation._quaternion._y=0;
      }*/
    


       //KNEE LIMITATIONS
      if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee"){
        if (SELECTED._rotation._x < (-5*degToRad)){
          SELECTED.rotation.x = (-5*degToRad);             
        }
        if (SELECTED._rotation._x > (150*degToRad)){
          SELECTED.rotation.x = (150*degToRad);             
        }
      }

      //ELBOW LIMITATIONS
      if (SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow"){
        if (SELECTED._rotation._y > (10*degToRad)){
          SELECTED.rotation.y = (10*degToRad);               
        }
        if (SELECTED._rotation._y < (-135*degToRad)){
          SELECTED.rotation.y = (-135*degToRad);              
        }
      }
            


      //SHOULDER LIMITATIONS    
      if (SELECTED.name == "right-shoulder" || SELECTED.name == "left-shoulder"){
        if (SELECTED._rotation._x > (60*degToRad)){
          SELECTED.rotation.x = (60*degToRad);   
        }
        if (SELECTED._rotation._x < (-180*degToRad)){
          SELECTED.rotation.x = (-180*degToRad);  
        }
        if (SELECTED.name == "right-shoulder"){
          if (SELECTED.rotation.y < (-130*degToRad)){
            SELECTED.rotation.y = (-130*degToRad);  
          }
          if (SELECTED.rotation.y > (45*degToRad)){
            SELECTED.rotateOnAxis(yAxis, -offset);         
          }
          if (SELECTED._rotation._z > (90*degToRad)){
          SELECTED.rotateOnAxis(zAxis, -offset);
          }
          if (SELECTED._rotation._z < (-135*degToRad)){
            SELECTED.rotateOnAxis(zAxis, offset);  
          }
        }
        if (SELECTED.name == "left-shoulder"){
          if (SELECTED._rotation._y < (-45*degToRad)){
            SELECTED.rotation.y = (-45*degToRad);  
          }
          if (SELECTED._rotation._y > (135*degToRad)){
            SELECTED.rotation.y = (135*degToRad);     
          }
          if (SELECTED._rotation._z < (-90*degToRad)){
            SELECTED.rotation.z = (-90*degToRad);
          }
          if (SELECTED._rotation._z > (135*degToRad)){
            SELECTED.rotation.z = (135*degToRad);  
          }
        }
      }

      //HIP LIMITATIONS    
      if (SELECTED.name == "right-hip" || SELECTED.name == "left-hip"){
        if (SELECTED._rotation._x > (30*degToRad)){
          SELECTED.rotation.x = (30*degToRad);   
        }
        if (SELECTED._rotation._x < (-120*degToRad)){
          SELECTED.rotation.x = (-120*degToRad);  
        }
        if (SELECTED.name == "right-hip"){
          if (SELECTED._rotation._z > (170*degToRad)){
            SELECTED.rotation.z = (170*degToRad);
          }
          if (SELECTED._rotation._z < (-20*degToRad)){
            SELECTED.rotation.z = (-20*degToRad);  
          }
          if (SELECTED._rotation._y < (-40*degToRad)){
            SELECTED.rotation.y = (-40*degToRad);  
          }
          if (SELECTED._rotation._y > (45*degToRad)){
            SELECTED.rotation.y = (45*degToRad);       
          }
        }
        if (SELECTED.name == "left-hip"){
          if (SELECTED._rotation._z < (-170*degToRad)){
            SELECTED.rotation.z = (-170*degToRad);
          }
          if (SELECTED._rotation._z > (20*degToRad)){
            SELECTED.rotation.z = (20*degToRad);  
          }
          if (SELECTED._rotation._y < (-45*degToRad)){
            SELECTED.rotation.y = (-45*degToRad); 
          }
          if (SELECTED._rotation._y > (40*degToRad)){
            SELECTED.rotation.y = (40*degToRad);    
          }
        }
      }

      //NECK LIMITATIONS    
      if (SELECTED.name == "neck"){
        if (SELECTED._rotation._x > (70*degToRad)){
          SELECTED.rotation.x = (70*degToRad);   
        }
        if (SELECTED._rotation._x < (-55*degToRad)){
          SELECTED.rotation.x = (-55*degToRad);
        }
        if (SELECTED._rotation._z < (-35*degToRad)){
          SELECTED.rotation.z = (-35*degToRad);
        }
        if (SELECTED._rotation._z > (35*degToRad)){
          SELECTED.rotation.z = (35*degToRad); 
        }
        if (SELECTED._rotation._y < (-70*degToRad)){
          SELECTED.rotation.y = (-70*degToRad);  
        }
        if (SELECTED._rotation._y > (70*degToRad)){
          SELECTED.rotation.y = (70*degToRad); 
        }
      }

      //LOWER BACK LIMITATIONS    
      if (SELECTED.name == "lower-back"){
        if (SELECTED._rotation._x > (77*degToRad)){
          SELECTED.rotation.x = (77*degToRad);   
        }
        if (SELECTED._rotation._x < (-30*degToRad)){
          SELECTED.rotation.x =  (-30*degToRad);
        }
        if (SELECTED._rotation._z < (-35*degToRad)){
          SELECTED.rotation.z = (-35*degToRad);
        }
        if (SELECTED._rotation._z > (35*degToRad)){
          SELECTED.rotation.z = (35*degToRad);  
        }
        if (SELECTED._rotation._y < (-40*degToRad)){
          SELECTED.rotation.y = (-40*degToRad);  
        }
        if (SELECTED._rotation._y > (40*degToRad)){
          SELECTED.rotation.y = (40*degToRad);     
        }
      }

    }

    update();

    if (perspective){
      renderer.render( scene, camera );
    }/*else{
       renderer.render( scene, cameraO);
     }*/

  }


  function onDocumentMouseDown( event ) {
    var joint_selector, object_selector;
    if(ALT == true){
      event.preventDefault();
      mouse.x = (event.clientX/$("canvas").width()) *2 -1; 
      mouse.y = -((event.clientY- 42)/$("canvas").height()) *2 +1; 
      console.log("x: " + mouse.x + ", y: "+ mouse.y);
     //may need to change y to expect the shorter height;

      var vector = new THREE.Vector3(mouse.x, mouse.y, .5);
      projector.unprojectVector(vector, camera);
      var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      if (male){
          joint_selector = joints;
          object_selector = objects;
        }else{
          joint_selector = joints_female;
          object_selector = objects_female;
        }
      var intersected = ray.intersectObjects(object_selector, true);
        
      if (intersected.length > 0){

        var joint = contains(joint_selector, intersected);
        if (SELECTED){
          if (SELECTED != intersected[0].object.parent){
            if (joint){
            SELECTED.children[0].material = material;
            SELECTED = joint;
            SELECTED.children[0].material = new THREE.MeshPhongMaterial( 
              { color: 676767, opacity: 0.75 } ); 
            }
          }
        }
        else{
          if (joint){
            SELECTED = joint;
            SELECTED.children[0].material = new THREE.MeshPhongMaterial( 
              { color: 676767, opacity: 0.75 } );
          }
        }
      }
    }
  }



  function contains(array, obj_array){
    for (var i=0; i<array.length; i++){
      for(var j=0; j<obj_array.length; j++){
        if (array[i] == obj_array[j].object.parent){
          return obj_array[j].object.parent;
        }
      }
    } 
    return false;
  }

});







