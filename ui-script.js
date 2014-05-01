var SELECTED, LAST_SELECTED=0;
var effector = false;
var ALT = false;
var degToRad = 3.14/180.0;



function toggleIK(e){
  if(e.target.value == "ik"){
    scene.add(effector_pt[0]);
    effector = true;
  }else{
    scene.remove(effector_pt[0]);
    effector = false;
  }
}

function toggleRoot(){
  var material = new THREE.MeshLambertMaterial( { color: 0xbbbbbb } );
    if (SELECTED && SELECTED.name == "root"){
      SELECTED.children[0].material = material;
      
      if (LAST_SELECTED != 0){

        SELECTED = scene.getObjectById(LAST_SELECTED,true);
        console.log(SELECTED);
        if (SELECTED){
          SELECTED.children[0].material = new THREE.MeshPhongMaterial( 
          { color: 0x676767, opacity: 0.75 } ); 
        }
      }else{
       SELECTED = null;
      }
    }
    else{
      if (SELECTED){
        SELECTED.children[0].material = material;
        LAST_SELECTED = SELECTED.id;
        console.log(LAST_SELECTED);
      }
      SELECTED = scene.getObjectByName("root",true);
      SELECTED.children[0].material = new THREE.MeshPhongMaterial( 
        { color: 0x676767, opacity: 0.75 } ); 
    }
  }
  
  function blurX(joint, rotVal){
    if (joint){
      if (joint.name == "root"){
        joint.rotation.x = rotVal;
      }
       //KNEE LIMITATIONS
      if (joint.name == "right-knee" || joint.name == "left-knee"){
        if (rotVal < (-5*degToRad)){
          joint.rotation.x = -5*degToRad;  
        }
        else if (rotVal > (150*degToRad)){
          joint.rotation.x = 150 * degToRad;
        }
        else{
          joint.rotation.x = rotVal;             
        }
      }

      //ELBOW LIMITATIONS
      if (joint.name == "right-elbow" || joint.name == "left-elbow"){
      }
            
      //SHOULDER LIMITATIONS    
      if (joint.name == "right-shoulder" || joint.name == "left-shoulder"){
        if (rotVal > (60*degToRad)){
          joint.rotation.x = 60*degToRad;
        }
        else if (rotVal < (-180*degToRad)){
          joint.rotation.x = -180*degToRad;
        }
        else{
          joint.rotation.x = rotVal;   
        }
      }

      //HIP LIMITATIONS    
      if (joint.name == "right-hip" || joint.name == "left-hip"){
        if (rotVal > (30 * degToRad)){
          joint.rotation.x = 30 * degToRad;
        }
        else if (rotVal < (-120 * degToRad)){
          joint.rotation.x = -120 * degToRad;
        }
        else{
          joint.rotation.x = rotVal;   
        }
      }

      //NECK LIMITATIONS    
      if (joint.name == "neck"){
        if (rotVal > (70 * degToRad)){
          joint.rotation.x = 70 * degToRad;
        }
        else if (rotVal < (-55 * degToRad)){
          joint.rotation.x = -55 * degToRad;
        }
        else{
          joint.rotation.x = rotVal;   
        }
      }

      //LOWER BACK LIMITATIONS    
      if (joint.name == "lower-back"){
        if (rotVal > (77*degToRad)){
          joint.rotation.x = 77 * degToRad;
        }
        else if (rotVal < (-30 * degToRad)){
          joint.rotation.x = -30 * degToRad;
        }
        else{
          joint.rotation.x = rotVal;   
        }
      }
    }

    update();

    $("#x-rot").val("")
  }

  function blurY(joint, rotVal){
    if (joint){
      if (joint.name == "root"){
        joint.rotation.y = rotVal;
      }
       //KNEE LIMITATIONS
      if (joint.name == "right-knee" || joint.name == "left-knee"){
      }

      //ELBOW LIMITATIONS
      if (joint.name == "right-elbow" || joint.name == "left-elbow"){
        if (rotVal > (10 * degToRad)){
          joint.rotation.y = 10 * degToRad;
        }
        else if (rotVal < (-135 * degToRad)){
          joint.rotation.y = -135 * degToRad;
        }
        else{
          joint.rotation.y = rotVal;               
        }
      }
            


      //SHOULDER LIMITATIONS    
      if (joint.name == "right-shoulder" || joint.name == "left-shoulder"){
        if (joint.name == "right-shoulder"){
          if (rotVal < (-130 * degToRad)){
            joint.rotation.y = -130 * degToRad; 
          }
          else if (rotVal > (45 * degToRad)){
            joint.rotation.y = 45 * degToRad;
          }
          else{
            joint.rotation.y = rotVal;  
          }
        }
        if (joint.name == "left-shoulder"){
          if (rotVal < (-45 * degToRad)){
            joint.rotation.y = -45 * degToRad; 
          }
          else if (rotVal > (89 * degToRad)){
            joint.rotation.y = 89 * degToRad;
          }
          else{
            joint.rotation.y = rotVal;  
          }
        }
      }

      //HIP LIMITATIONS    
      if (joint.name == "right-hip" || joint.name == "left-hip"){
        if (joint.name == "right-hip"){
          if (rotVal < (-40 * degToRad)){
            joint.rotation.y = -40 * degToRad;
          }
          else if (rotVal > (45 * degToRad)){
            joint.rotation.y = 45 * degToRad;
          }
          else{
            joint.rotation.y = rotVal;  
          }
        }
        if (joint.name == "left-hip"){
          if (rotVal < (-45 * degToRad)){
            joint.rotation.y = -45 * degToRad;
          }
          else if (rotVal > (40 * degToRad)){
            joint.rotation.y = 40 * degToRad;
          }
          else{
            joint.rotation.y = rotVal;  
          }
        }
      }

      //NECK LIMITATIONS    
      if (joint.name == "neck"){
        if (rotVal < (-70 * degToRad)){
          joint.rotation.y = -70 * degToRad;
        }
        else if (rotVal > (70 * degToRad)){
          joint.rotation.y = 70 * degToRad;
        }
        else{
          joint.rotation.y = rotVal;  
        }
      }

      //LOWER BACK LIMITATIONS    
      if (joint.name == "lower-back"){
        if (rotVal < (-40 * degToRad)){
          joint.rotation.y = -40 * degToRad;
        }
        else if (rotVal > (40 * degToRad)){
          joint.rotation.y = 40 * degToRad;
        }
        else{
          joint.rotation.y = rotVal;  
        }
      }
    }

    update();

    $("#y-rot").val("")
  }

  function blurZ(joint, rotVal){
    if (joint){
      if (joint.name == "root"){
        joint.rotation.z = rotVal;
      }
       //KNEE LIMITATIONS
      if (joint.name == "right-knee" || joint.name == "left-knee"){
      }

      //ELBOW LIMITATIONS
      if (joint.name == "right-elbow" || joint.name == "left-elbow"){
      }
            
      //SHOULDER LIMITATIONS    
      if (joint.name == "right-shoulder" || joint.name == "left-shoulder"){
        if (joint.name == "right-shoulder"){
          if (rotVal > (90 * degToRad)){
            joint.rotation.z = 90 * degToRad;
          }
          else if (rotVal < (-135 * degToRad)){
            joint.rotation.z = -135 * degToRad;
          }
          else{
            joint.rotation.z = rotVal;
          }
        }
        if (joint.name == "left-shoulder"){
          if (rotVal < (-90 * degToRad)){
            joint.rotation.z = -90 * degToRad;
          }
          else if (rotVal > (135 * degToRad)){
            joint.rotation.z = 135 * degToRad;
          }
          else{
            joint.rotation.z = rotVal;
          }
        }
      }

      //HIP LIMITATIONS    
      if (joint.name == "right-hip" || joint.name == "left-hip"){
        if (joint.name == "right-hip"){
          if (rotVal > (90 * degToRad)){
            joint.rotation.z = 90 * degToRad;
          }
          else if (rotVal < (-20 * degToRad)){
            joint.rotation.z = -20 * degToRad;
          }
          else{
            joint.rotation.z = rotVal;
          }
        }
        if (joint.name == "left-hip"){
          if (rotVal < (-90 * degToRad)){
            joint.rotation.z = -90 * degToRad;
          }
          else if (rotVal > (20 * degToRad)){
            joint.rotation.z = 20 * degToRad;
          }
          else{
            joint.rotation.z = rotVal;
          }
        }
      }

      //NECK LIMITATIONS    
      if (joint.name == "neck"){
        if (rotVal < (-35 * degToRad)){
          joint.rotation.z = -35 * degToRad;
        }
        else if (joint.rotation.z > (35 * degToRad)){
          joint.rotation.z = 35 * degToRad;
        }
        else{
          joint.rotation.z = rotVal;
        }
      }

      //LOWER BACK LIMITATIONS    
      if (joint.name == "lower-back"){
        if (rotVal < (-35 * degToRad)){
          joint.rotation.z = -35 * degToRad;
        }
        else if (rotVal > (35 * degToRad)){
          joint.rotation.z = 35 * degToRad;
        }
        else{
          joint.rotation.z = rotVal;
        }
      }
    }

    update();
    $("#z-rot").val("")
  }

    function update(){
    if (SELECTED){
      $("#joint").html(SELECTED.name);

      var x_rot = SELECTED._rotation._x / degToRad;
      $("#x-rot").attr("placeholder", x_rot.toFixed(2));
      var y_rot = SELECTED._rotation._y / degToRad;
      $("#y-rot").attr("placeholder", y_rot.toFixed(2));
      var z_rot = SELECTED._rotation._z / degToRad;
      $("#z-rot").attr("placeholder", z_rot.toFixed(2));
    }else{
      $("#joint").html("none");

      $("#x-rot").attr("placeholder","n/a");
      $("#y-rot").attr("placeholder","n/a");
      $("#z-rot").attr("placeholder","n/a");
    }
  }

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


