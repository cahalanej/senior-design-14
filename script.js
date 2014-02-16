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
    var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3(),
    INTERSECTED, SELECTED;
    var objects = [], plane;

    init();
    animate();

    function init() {
    	//scene
        projector = new THREE.Projector();
        container = $("#content");


        scene = new THREE.Scene();

        var height = (2*window.innerHeight/3);

    	//camera
    	//width, height, fov, near, far, orthonear, ortho far
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ height, 1, 10000);
        camera.position.z = 10;

        cameraO = new THREE.OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, height/2, height/-2, 1, 1000);

        cameraObject = new THREE.Object3D();
        cameraObject.add(camera);
       // cameraObject.add(cameraO);
       scene.add(cameraObject);

        //light
        var light = new THREE.DirectionalLight(0xff0000, 2.5);
        light.position.set(1, 2, 1.5);
        scene.add(light);

        var light2 = new THREE.DirectionalLight(0xffffff, 2.0);
        light2.position.set(-2, -1.5, -1);
        scene.add(light2);


        /*load object */

     
        var loader = new THREE.OBJLoader();
        var root = new THREE.Object3D();
        loader.load("root.obj", function(geometry){

            geometry.children.forEach(function(child){
                if (child.children.length == 1){
                    if (child.children[0] instanceof THREE.Mesh){
                        child.children[0].material = material;
                    }
                }
            });

            geometry.scale.set(1,1,1);
            geometry.rotation.x=0;

            root = geometry;

            objects.push( root );
            scene.add(root);
        });

       var torso=new THREE.Object3D();
        loader.load("torso.obj", function(geometry){

            geometry.children.forEach(function(child){
                if (child.children.length == 1){
                    if (child.children[0] instanceof THREE.Mesh){
                        child.children[0].material = material;
                    }
                }
            });

            geometry.scale.set(1,1,1);
            geometry.rotation.x=0;
           
            torso = geometry;
            scene.add(torso);
            objects.push( torso );
        });
        var neck=new THREE.Object3D();
        loader.load("neck.obj", function(geometry){

            geometry.children.forEach(function(child){
                if (child.children.length == 1){
                    if (child.children[0] instanceof THREE.Mesh){
                        child.children[0].material = material;
                    }
                }
            });

            geometry.scale.set(1,1,1);
            geometry.rotation.x=0;
           
            neck = geometry;
            scene.add(neck);
            objects.push( neck );
        });
        var head = new THREE.Object3D();
        loader.load("head.obj", function(geometry){

            geometry.children.forEach(function(child){
                if (child.children.length == 1){
                    if (child.children[0] instanceof THREE.Mesh){
                        child.children[0].material = material;
                    }
                }
            });

            geometry.scale.set(1,1,1);
            geometry.rotation.x=0;
           
            head = geometry;
            scene.add(head);
            objects.push( head );
        });
        
//            neck.add(head);
           // torso.add(rshoulder);
           // torso.add(lshoulder);
  //          torso.add(neck);
    //        root.add(torso);

      //     scene.add(root);

      plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
      plane.visible = false;
      scene.add( plane );


        //geometry = new THREE.CubeGeometry( 200, 200, 200 );
        //material = 
       // mesh = new THREE.Mesh( geometry, material );
       // scene.add( mesh );

     if (window.WebGLRenderingContext){
         renderer = new THREE.WebGLRenderer({antialias: true});
     }else{
         renderer = new THREE.CanvasRenderer();
     }
     renderer.setSize(window.innerWidth, 3*window.innerHeight/4 );
     $("#content").html( renderer.domElement );
     $("#content").css("margin-left", ""+ window.innerHeight/8+"px;");
     $(window).keydown(function(event){keyDown(event)}); 
     $(window).keyup(function(event){keyUp(event)});

     /*lets make jquery style*/
     renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
     renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
     renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
        //on keydown set values to true, on keyup, set values to false
        //in function that updates if values true;
    }

    function keyDown(e){
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
   console.log(e.which);
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
    	console.log("perspective: " + perspective);
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
     var xAxis = new THREE.Vector3(1, 0, 0);
     var yAxis = new THREE.Vector3(0, 1, 0);
     var zAxis = new THREE.Vector3(0, 0, 1);
     var offset = 1.0 * degToRad;
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        if (left){
        	cameraObject.translateX(.1);
        }else if (right){
        	cameraObject.translateX(-.1);
        }else if (up){
        	cameraObject.translateY(-.1);
        }else if (down){
        	cameraObject.translateY(.1);
        }else if (forward){
        	cameraObject.translateZ(-.1);
        }else if (backward){
        	cameraObject.translateZ(.1);
        }

        //rotate
        else if (cwX){
          cameraObject.rotateOnAxis(xAxis, -offset);
      }else if (ccwX){
       cameraObject.rotateOnAxis(xAxis, offset);
   }else if (cwY){
       cameraObject.rotateOnAxis(yAxis, offset);
   }else if (ccwY){
       cameraObject.rotateOnAxis(yAxis, -offset);
   }else if (cwZ){
       cameraObject.rotateOnAxis(zAxis, -offset);
   }else if (ccwZ){
       cameraObject.rotateOnAxis(zAxis, offset);
   }

   if (perspective){
       renderer.render( scene, camera );
   }else{
       renderer.render( scene, cameraO);
   }

}


/* borrowed intersect code */
function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

                //

                var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
                projector.unprojectVector( vector, camera );

                var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );


                if ( SELECTED ) {

                    var intersects = raycaster.intersectObject( plane );
                    SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
                    return;

                }


                var intersects = raycaster.intersectObjects( objects );

                if ( intersects.length > 0 ) {

                    if ( INTERSECTED != intersects[ 0 ].object ) {

                        if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

                        INTERSECTED = intersects[ 0 ].object;
                        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

                        plane.position.copy( INTERSECTED.position );
                        plane.lookAt( camera.position );

                    }

                    //container.style.cursor = 'pointer';

                } else {

                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

                    INTERSECTED = null;

                    //container.style.cursor = 'auto';

                }

            }

            function onDocumentMouseDown( event ) {

                event.preventDefault();

                var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
                projector.unprojectVector( vector, camera );

                var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

                var intersects = raycaster.intersectObjects( objects );

                if ( intersects.length > 0 ) {

                    controls.enabled = false;

                    SELECTED = intersects[ 0 ].object;

                    var intersects = raycaster.intersectObject( plane );
                    offset.copy( intersects[ 0 ].point ).sub( plane.position );

                    //container.style.cursor = 'move';

                }

            }

            function onDocumentMouseUp( event ) {

                event.preventDefault();

                controls.enabled = true;

                if ( INTERSECTED ) {

                    plane.position.copy( INTERSECTED.position );

                    SELECTED = null;

                }

                //container.style.cursor = 'auto';

            }

        });







