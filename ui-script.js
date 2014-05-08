/* 
Jennifer Cahalane 
Senior Design - Spring 2014 
Contains: functions to handle resize, specific button clicks, and joint selection
*/  



/*
  _______  __        ______   .______        ___       __      
 /  _____||  |      /  __  \  |   _  \      /   \     |  |     
|  |  __  |  |     |  |  |  | |  |_)  |    /  ^  \    |  |     
|  | |_ | |  |     |  |  |  | |   _  <    /  /_\  \   |  |     
|  |__| | |  `----.|  `--'  | |  |_)  |  /  _____  \  |  `----.
 \______| |_______| \______/  |______/  /__/     \__\ |_______|
*/ 

var SELECTED, LAST_SELECTED=0;
var effector = false;
var ALT = false;
var degToRad = 3.14/180.0;

var mouseDown = false;
var effectorSelected = false;
var mouse = {x:0, y:0};
var lastmouse = {x: 0, y: 0};
var renderer;
var camera, cameraObject;
var projector;
var height;
var male=true;
var material;



/*
 _______  __    __  .__   __.   ______ .___________. __    ______   .__   __.      _______.
|   ____||  |  |  | |  \ |  |  /      ||           ||  |  /  __  \  |  \ |  |     /       |
|  |__   |  |  |  | |   \|  | |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
|   __|  |  |  |  | |  . `  | |  |         |  |     |  | |  |  |  | |  . `  |     \   \    
|  |     |  `--'  | |  |\   | |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |   
|__|      \______/  |__| \__|  \______|    |__|     |__|  \______/  |__| \__| |_______/    
*/

//resizes webGL renderer if the window is resized
function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  var infoHeight = window.innerHeight - $(".navbar").height();
  $(".dropdown").height(infoHeight);

}

//Toggles the information display
function toggleInfo(){
  if ($("#information").hasClass("hide")){
    if (!$("#help").hasClass("hide")){
      $("#help").addClass("hide");
    }
    $("#information").removeClass("hide");
  }else{
    $("#information").addClass("hide");
  }
}

//toggles the help display
function toggleHelp(){
  if ($("#help").hasClass("hide")){
    if (!$("#information").hasClass("hide")){
      $("#information").addClass("hide");
    }
    $("#help").removeClass("hide");
  }else{
    $("#help").addClass("hide");
  }
}

//toggles between Forward Kinematics and Inverse Kinematics
function toggleIK(e){
  if(e.target.value == "ik"){
    scene.add(effector_pt[0]);
    effector = true;
  }else{
    scene.remove(effector_pt[0]);
    effector = false;
  }
}

//Toggles between selecting a joint and selecting the entire model
function toggleRoot(){
  var material = new THREE.MeshPhongMaterial( { color: 0xe7eaed } );
  if (SELECTED && SELECTED.name == "root"){
    SELECTED.children[0].material = material;
    
    if (LAST_SELECTED != 0){

      SELECTED = scene.getObjectById(LAST_SELECTED,true);
      if (SELECTED){
        SELECTED.children[0].material = new THREE.MeshPhongMaterial( 
        { color: 0x5b6b7a, opacity: 1} ); 
      }
    }else{
     SELECTED = null;
    }
  }
  else{
    if (SELECTED){
      SELECTED.children[0].material = material;
      LAST_SELECTED = SELECTED.id;
    }
    SELECTED = scene.getObjectByName("root",true);
    SELECTED.children[0].material = new THREE.MeshPhongMaterial( 
      { color: 0x5b6b7a, opacity: 1 } ); 
  }
}

//handles joint selection
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

//Checks if a joint has been selected
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


