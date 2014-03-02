$(function(){
	var degToRad = 3.14/180.0;

	var camera, cameraO, scene, renderer;
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
    var SELECTED, projector, mouse = {x:0, y:0};
    var objects = [], joints=[];
    var selectedMaterial;
    var material; 
    var controls; 
    var ALT = false;
    var root, neck, lshoulder, lelbow, rshoulder, relbow;

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
       
        loadObject();


       if (window.WebGLRenderingContext){
         renderer = new THREE.WebGLRenderer({antialias: true});
       }else{
         renderer = new THREE.CanvasRenderer();
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

function loadObject(){
  var loader = new THREE.OBJLoader();
  loader.load("root.obj", function(rooter){
          root = rooter;
          root.scale.set(1,1,1);

          loader.load("torso.obj", function(torso){
            torso.position.y = 1.681;

          loader.load("neck.obj", function(necked){

          loader.load("head.obj", function(head){
            head.position.x = -0.009;
            head.position.y=0.843;
            head.position.z=0.121;

          loader.load("lshoulder.obj", function(lshouldered){

          loader.load("luarm.obj", function(luarm){
            luarm.position.x = .612;
            luarm.position.y = -.547;
            luarm.position.z=-.185;

          loader.load("lelbow.obj", function(lelbowed){

          loader.load("llarm.obj", function(llarm){
            llarm.position.x=.47;
            llarm.position.y=-.503;
            llarm.position.z=-.405;

          loader.load("lshoulder.obj", function(rshouldered){

          loader.load("luarm.obj", function(ruarm){
            ruarm.position.x = -.612;
            ruarm.position.y = .547;
            ruarm.position.z=-.185;
            ruarm.scale.x= -1;
            ruarm.scale.y=-1;

          loader.load("lelbow.obj", function(relbowed){

          loader.load("llarm.obj", function(rlarm){
            rlarm.position.x=-.47;
            rlarm.position.y=.503;
            rlarm.position.z=-.405;
            rlarm.scale.x= -1;
            rlarm.scale.y = -1;


            neck = necked;
            neck.position.y = 1.449;
            neck.position.z=0.12;

            lshoulder = lshouldered;
            lshoulder.position.x=1.12;
            lshoulder.position.y=.845;
            lshoulder.position.z=.12;

            lelbow=lelbowed;
            lelbow.position.x=1.076;
            lelbow.position.y=.555;
            lelbow.position.z=.213;

            rshoulder = rshouldered;
            rshoulder.position.x=-1.12;
            rshoulder.position.y=.845;
            rshoulder.position.z=.12;
            rshoulder.scale.x= 1;

            relbow=relbowed;
            relbow.position.x=1.076;
            relbow.position.y=.555;
            relbow.position.z=.213;
            relbow.scale.x= -1;
            relbow.scale.y= -1;


          neck.children.push(head);
          head.parent = neck;

        relbow.children.push(rlarm);
          rlarm.parent = relbow;

          ruarm.children.push(relbow);
          relbow.parent = ruarm;

          rshoulder.children.push(ruarm);
          ruarm.parent = rshoulder;

          torso.children.push(rshoulder);
          rshoulder.parent = torso;

          lelbow.children.push(llarm);
          llarm.parent = lelbow;

          luarm.children.push(lelbow);
          lelbow.parent = luarm;

          lshoulder.children.push(luarm);
          luarm.parent = lshoulder;

          torso.children.push(lshoulder);
          lshoulder.parent = torso;

          torso.children.push(neck);
          neck.parent = torso;

          root.children.push(torso);
          torso.parent = root;

         // scene.add(torso);
          //objects.push(torso);      
          
          joints.push(root);
          joints.push(neck);
          joints.push(lshoulder);
          joints.push(lelbow);
          joints.push(rshoulder);
          joints.push(relbow);

          scene.add(root);
          objects.push(root);
          });
        });
        });
        });
        });
        });
        });
        });
        });
        });
        });
        });
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
     if(SELECTED == root){
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
    SELECTED.rotateOnAxis(xAxis, -offset);
   }else if (ccwX){
       SELECTED.rotateOnAxis(xAxis, offset);
   }else if (cwY){
       SELECTED.rotateOnAxis(yAxis, offset);
   }else if (ccwY){
       SELECTED.rotateOnAxis(yAxis, -offset);
   }else if (cwZ){
       SELECTED.rotateOnAxis(zAxis, -offset);
   }else if (ccwZ){
      SELECTED.rotateOnAxis(zAxis, offset);
   }
   if (SELECTED._rotation._quaternion._y/degToRad >= 360){
            SELECTED._rotation._quaternion._y=0;
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
                if(ALT == true){
                event.preventDefault();
                mouse.x = (event.clientX/$("canvas").width()) *2 -1; 
                mouse.y = -((event.clientY- 42)/$("canvas").height()) *2 +1; 
                console.log("x: " + mouse.x + ", y: "+ mouse.y);
               //may need to change y to expect the shorter height;
              
               var vector = new THREE.Vector3(mouse.x, mouse.y, .5);
                  projector.unprojectVector(vector, camera);
                  var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                  var intersected = ray.intersectObjects(objects, true);
                  
                  if (intersected.length > 0){

                      var joint = contains(joints, intersected);
                    if (SELECTED){
                      if (SELECTED != intersected[0].object.parent){
                        if (joint){
                        SELECTED.children[0].material = material;
                        
                        SELECTED = joint;
                        SELECTED.children[0].material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } );
                        }
                      }
                    }
                    else{
                      if (joint){
                        SELECTED = joint;
                        SELECTED.children[0].material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } );
                        }
                    }

    console.log(SELECTED);
                 }
              }
            }

                function update(){
                  
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







