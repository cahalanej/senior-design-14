$(function(){
	var camera, cameraO, renderer;
  var geometry, material, mesh, plane;
  var offset = 1.0 * degToRad;

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
  var lastmouse = {x: 0, y: 0};
var longitudinal=0, latitudinal =0;
var theta = 0, phi = 0;

  var selectedMaterial;
  var controls; 

  var pelvis;
  var male=true;
  var height;
  var mouseDown = false;

  var effectorSelected = false;

  init();
  animate();

  function init() {
  	//scene
   
    scene = new THREE.Scene();
    height = window.innerHeight-42;
  	//camera
  	//width, height, fov, near, far, orthonear, ortho far
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ height, 1, 1000);
    camera.position.z = 7;

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

    material = new THREE.MeshPhongMaterial( { color: 0xe7eaed } );


    plane = new THREE.Plane();
    plane.normal.x = 0;
    plane.normal.y = 0;
    plane.normal.z = 1;
    scene.add(plane);

    /*load object */
   
    loadMale();
    loadFemale();
    loadEffector();

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
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp);

   //sets variable to false
    window.addEventListener( 'resize', onWindowResize);
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
    

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    

    //mouse down sets variable to true if effector clicked
    //mouse up checks if variable is true, then runs through ik algorithm and 
    renderer.domElement.addEventListener( 'mousedown', effectorClicked);
    renderer.domElement.addEventListener("mousemove", effectorMove );
   // renderer.domElement.addEventListener("mousemove", rotateCamera );
    

    //on keydown set values to true, on keyup, set values to false
    //in function that updates if values true;
    $("#info-btn").on("click", function(){
      toggleInfo();
    });
    $("#help-btn").on("click", function(){
      toggleHelp();
    });

    onWindowResize();
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
    
      // note: three.js includes requestAnimationFrame shim
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

    if (perspective){
      renderer.render( scene, camera );
    }

  }

  function effectorMove(event){
    if (effectorSelected){
      event.preventDefault();
      mouse.x = (event.clientX/$("canvas").width()) *2 -1; 
      mouse.y = -((event.clientY - 42)/$("canvas").height()) *2 +1; 

      var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
      projector.unprojectVector( vector, camera );
      var dir = vector.sub( camera.position ).normalize();

      var distance = - camera.position.z / dir.z;

      var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

      var e_pt = effector_pt[0];
      e_pt.position.x = pos.x;
      e_pt.position.y = pos.y;
      e_pt.position.z = pos.z;

      var point = new THREE.Vector3( e_pt.position.x, e_pt.position.y, e_pt.position.z);
     
      var e_pt = effector_pt[0];
      var eff_pt = new THREE.Vector3();
      eff_pt = getGlobalLoc(e_pt);
      ccd(eff_pt);
    }
  }

  function ccd(effectPoint){
    if (SELECTED){
      var selectedPt = new THREE.Vector3();
      selectedPt = getGlobalLoc(SELECTED);
        var dist = new THREE.Vector3(effectPoint.x - selectedPt.x, effectPoint.y - selectedPt.y, effectPoint.z - selectedPt.z);
        
        // console.log("<" +effectPoint.x + ", " + effectPoint.y + ", " + effectPoint.z + ">");
        if (dist.length() > 0.004){
         for (var i = 0; i < 10; i++){  


          var curJoint = SELECTED.parent;
          while (curJoint.name != "root"){
            if (curJoint.name == ""){
              curJoint = curJoint.parent;
            }else{
              var curJointPt = new THREE.Vector3();
              curJointPt = getGlobalLoc(curJoint);
              // console.log("<<" +curJointPt.x + ", " + curJointPt.y + ", " + curJointPt.z + ">>");
              var pc = new THREE.Vector3(selectedPt.x - curJointPt.x, selectedPt.y - curJointPt.y, selectedPt.z - curJointPt.z);
              var pt = new THREE.Vector3(effectPoint.x - curJointPt.x, effectPoint.y - curJointPt.y, effectPoint.z - curJointPt.z);
              
              var leftUnitV = new THREE.Vector3(pc.normalize().x, pc.normalize().y, pc.normalize().z);
              var rightUnitV = new THREE.Vector3(pt.normalize().x, pt.normalize().y, pt.normalize().z);;

              var dot = leftUnitV.dot(rightUnitV);
              var cross = new THREE.Vector3(leftUnitV.cross(rightUnitV).x, leftUnitV.cross(rightUnitV).y, leftUnitV.cross(rightUnitV).z);

              var theta = Math.acos(dot);

              var axisDiv = cross.length();
              if (axisDiv < 0.001 && axisDiv > -0.001){
                continue;
              }

              var crossU = new THREE.Vector3(cross.normalize().x, cross.normalize().y, cross.normalize().z);
              var xrot = crossU.x * dot;
              var yrot = crossU.y * dot;
              var zrot = crossU.z * dot;
              
              blurX(curJoint, xrot);
              blurY(curJoint, yrot);
              blurZ(curJoint, zrot);

              curJoint = curJoint.parent;
              update();
            }
          }
        }
      }
    }
  }

  /*function rotateCamera(){
    if (ALT){

      if ( mouseDown ) {

        theta = - ( ( event.clientX - mouse.x ) * 0.5 )
                + lastmouse.x;
        phi = ( ( event.clientY - mouse.y ) * 0.5 )
              + lastmouse.y;

        phi = Math.min( 180, Math.max( 0, phi ) );

        camera.position.x = 10 * Math.sin( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.position.y = 10 * Math.sin( phi * Math.PI / 360 );
        camera.position.z = 10 * Math.cos( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.updateMatrix();

        console.log(camera)
    }

   /* mouse3D = projector.unprojectVector(
        new THREE.Vector3(
            ( event.clientX / renderer.domElement.width ) * 2 - 1,
            - ( event.clientY / renderer.domElement.height ) * 2 + 1,
            0.5
        ),
        camera
    ); 

    update();
   // ray.direction = mouse3D.subSelf( camera.position ).normalize();

    //interact();
    //render();

    //   event.preventDefault();
    //   mouse.x = (event.clientX/$("canvas").width()) *2 -1; 
    //   mouse.y = -((event.clientY- 42)/$("canvas").height()) *2 +1; 

    //   var difx = mouse.x - lastmouse.x;
    //   var dify = mouse.y - lastmouse.y;

      
    //   console.log(camera);
    //   if (difx > 0){
    //     //rotate to the right
    //     longitudinal = 1;
    //     if (longitudinal > 360 || longitudinal < 0){
    //       longitudinal = 0;
    //     }
    //   }
    //   if (difx < 0){
    //     //rotate to the left
    //     longitudinal = -1;
    //     // if (longitudinal > 360 || longitudinal < 0){
    //     //   longitudinal = 0;
    //     // }
    //   }
    //   if (dify > 0){
    //     //rotate up
    //     latitudinal = 1;
    //     if (latitudinal > 360 || latitudinal < 0){
    //       latitudinal = 0;
    //     }
    //   }
    //   if (dify < 0){
    //     //rotate down
    //     latitudinal = -1;
    //       // if (latitudinal > 360 || latitudinal < 0){
    //       //   latitudinal = 0;
    //       // }
    //   }
    //   //camera.position.z=0;
    //   //update();
    //   camera.rotateOnAxis (new THREE.Vector3( 0, 1, 0),longitudinal * degToRad);//Math.cos(longitudinal * degToRad) * Math.cos(latitudinal * degToRad);
    //   camera.rotateOnAxis (new THREE.Vector3( 1, 0, 0),latitudinal * degToRad);//Math.sin(longitudinal * degToRad) * Math.cos(latitudinal * degToRad);
    //   camera.rotation.z = 0;//10 + Math.sin(latitudinal * degToRad);
    //   camera.position.z = 10;

    //   lastmouse.x = mouse.x;
    //   lastmouse.y = mouse.y;
    }
  }
*/
  function getGlobalLoc(joint){
    var retVect = new THREE.Vector3();
    retVect.x = 0;
    retVect.y = 0;
    retVect.z = 0;
    if (joint && joint.name != "root"){
      var parent = joint;
      while (parent && parent.name != "root"){
        if (parent.name == ""){
          parent = parent.parent;
        }else{
          var x = parent._rotation._x;
          var y = parent._rotation._y;
          var z = parent._rotation._z;

          var mat4 = new THREE.Matrix4();
          mat4[0] = Math.cos(y)*Math.cos(z);
          mat4[1] = -Math.cos(y)*Math.sin(z);
          mat4[2] = Math.sin(y);
          mat4[3] = 0;

          mat4[4] = Math.cos(x)*Math.sin(z) + Math.cos(z)*Math.sin(x)*Math.sin(y);
          mat4[5] = Math.cos(x)*Math.cos(z) - Math.sin(x)*Math.sin(y)*Math.sin(z);
          mat4[6] = -Math.cos(y)*Math.sin(x);
          mat4[7] = 0;

          mat4[8] = Math.sin(x)*Math.sin(z) - Math.cos(x)*Math.cos(z)*Math.sin(y);
          mat4[9] = Math.cos(z)*Math.sin(z) + Math.cos(z)*Math.sin(y)*Math.sin(z);
          mat4[10] = Math.cos(x)*Math.cos(y);
          mat4[11] = 0;

          mat4[12] = 0;
          mat4[13] = 0;
          mat4[14] = 0;
          mat4[15] = 1;

          var pos = new THREE.Vector4(parent.position.x, parent.position.y, parent.position.z,1);
          retVect.x += pos.applyMatrix4(mat4).x;
          retVect.y += pos.applyMatrix4(mat4).y;
          retVect.z += pos.applyMatrix4(mat4).z;
          parent = parent.parent;
        }
      }
    }
   return retVect;
 }

  function effectorClicked(event){
    event.preventDefault();
      mouse.x = (event.clientX/$("canvas").width()) *2 -1; 
      mouse.y = -((event.clientY- 42)/$("canvas").height()) *2 +1; 


    if (ALT){
      lastmouse.x = mouse.x;
      lastmouse.y = mouse.y;
      mouseDown = true;
    }
    if (effector && !ALT){
      
      var vector = new THREE.Vector3(mouse.x, mouse.y, .5);
      projector.unprojectVector(vector, camera);
      var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      
      var intersected = ray.intersectObjects(effector_pt, true);
        
      if (intersected.length > 0){

        var joint = intersected[0].object.parent;
        if (joint){
          joint.children[0].material = new THREE.MeshPhongMaterial( 
          { color: 0xFF0000, opacity: 1 } ); 
          effectorSelected = true;
        }
      }
    }
  }

  function onDocumentMouseUp( event ) {
    mouseDown = false;
    var joint_selector, object_selector;
    if (effectorSelected){
      
      effectorSelected = false;
      effector_pt[0].children[0].material = new THREE.MeshPhongMaterial( 
      { color: 0x077684, opacity: 1 } ); 
      
    }
    else if (!ALT){
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
        { color: 0x5b6b7a, opacity: 1 } ); 
            }
          }
        }
        else{
          if (joint){
            SELECTED = joint;
            SELECTED.children[0].material = new THREE.MeshPhongMaterial( 
        { color: 0x5b6b7a, opacity: 1 } ); 
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


  function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    var infoHeight = window.innerHeight - $(".navbar").height();
    $(".dropdown").height(infoHeight);

  }

    function keyDown(e){
    ALT = e.altKey;
    switch (e.which){
      case 87:  //w
        up = true;
        break;
      case 83:  //s
        down = true;
        break;
      case 65:  //a
        left = true;
        break;
      case 68:  //d
        right = true;
        break;
      case 81:  //q
        backward = true;
        break;
      case 69:  //e
        forward = true;
        break;

      //rotate
      case 76:  //l -- clockwise about y
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
      case 73:  //i -- clockwise about x
        if (!perspective  && (view == "front" || view == "bottom")){
          cwX = false;
        }else{
          cwX=true;
        }
        break; 
      case 75:  //k -- counterClockwise about x
        if (!perspective  && (view == "front" || view == "bottom")){
          ccwX = false;
        }else{
          ccwX = true;
        }
        break;
      case 85:  //u -- counterClockwise about z
        ccwZ = true;
        break;
      case 79:  //o -- clockwise about z
        cwZ = true;
        break;
    }
  }

  function keyUp(e){
    ALT = e.altKey;
    switch (e.which){
      case 87:  //w
        up = false;
        break;
      case 83:  //s
        down = false;
        break;
      case 65:  //a
        left = false;
        break;
      case 68:  //d
        right = false;
        break;
      case 81:  //q
        backward = false;
        break;
      case 69:  //e
        forward = false;
        break;

      //rotate
      case 76:  //l -- clockwise about y
        cwY = false;
        break;
      case 74: //j -- counterClockwise about y
        ccwY = false;
        break;
      case 73:  //i -- clockwise about x
        cwX = false;
        break; 
      case 75:  //k -- counterClockwise about x
        ccwX = false;
        break;
      case 85:  //u -- counterClockwise about z
        ccwZ = false;
        break;
      case 79:  //o -- clockwise about z
        cwZ = false;
        break;
      //toggle perspective
     /* case 80:
        if (perspective){
          perspective = false;
          /*let's also change the text in the controls div to alert users
          that in orthographic mode /
        }else{
          perspective = true;
          //change controls div to say perspective
        }
        break;*/
    }
  }


});







