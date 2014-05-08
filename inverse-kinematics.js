/* 
Jennifer Cahalane 
Senior Design - Spring 2014 
Contains: functions responsible for inverse kinematics functionality:
Includes: selecting and moving the effector, calculating the global position of a joint, and running the cyclic coordinate descent algorithm to position each joint
*/                           


  //moves the effector (based on mouse movement) if it has been selected
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

  //runs the cyclic coordinate descent algorithm to position each joint
  function ccd(effectPoint){
    if (SELECTED){
      var selectedPt = new THREE.Vector3();
      selectedPt = getGlobalLoc(SELECTED);
        var dist = new THREE.Vector3(effectPoint.x - selectedPt.x, effectPoint.y - selectedPt.y, effectPoint.z - selectedPt.z);
        
        if (dist.length() > 0.004){
         for (var i = 0; i < 10; i++){  


          var curJoint = SELECTED.parent;
          while (curJoint.name != "root"){
            if (curJoint.name == ""){
              curJoint = curJoint.parent;
            }else{
              var curJointPt = new THREE.Vector3();
              curJointPt = getGlobalLoc(curJoint);

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

  //calculate the global position of a joint
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

  //if clicked, select the effector point
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