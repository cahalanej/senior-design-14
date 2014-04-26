var SELECTED, LAST_SELECTED=0;
var effector = false
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
        { color: 676767, opacity: 0.75 } ); 
    }
  }
  
  function blurX(e){
    console.log(e.target.value);
    var rotVal = e.target.value * degToRad;
    if (SELECTED){
      if (SELECTED.name == "root"){
        SELECTED.rotation.x = rotVal;
      }
       //KNEE LIMITATIONS
      if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee"){
        if (rotVal >= (-5*degToRad) && rotVal <= (150*degToRad)){
          SELECTED.rotation.x = rotVal;             
        }
      }

      //ELBOW LIMITATIONS
      if (SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow"){
      }
            


      //SHOULDER LIMITATIONS    
      if (SELECTED.name == "right-shoulder" || SELECTED.name == "left-shoulder"){
        if (rotVal <= (60*degToRad) && rotVal >= (-180*degToRad)){
          SELECTED.rotation.x = rotVal;   
        }
      }

      //HIP LIMITATIONS    
      if (SELECTED.name == "right-hip" || SELECTED.name == "left-hip"){
        if (rotVal <= (30*degToRad) && rotVal >= (-120*degToRad)){
          SELECTED.rotation.x = rotVal;   
        }
      }

      //NECK LIMITATIONS    
      if (SELECTED.name == "neck"){
        if (rotVal <= (70*degToRad) && rotVal >= (-55*degToRad)){
          SELECTED.rotation.x = rotVal;   
        }
      }

      //LOWER BACK LIMITATIONS    
      if (SELECTED.name == "lower-back"){
        if (rotVal <= (77*degToRad) && rotVal >= (-30*degToRad)){
          SELECTED.rotation.x = rotVal;   
        }
      }
    }

    update();

    $("#x-rot").val("")
  }

  function blurY(e){
    var rotVal = e.target.value * degToRad;
    if (SELECTED){
      if (SELECTED.name == "root"){
        SELECTED.rotation.y = rotVal;
      }
       //KNEE LIMITATIONS
      if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee"){

      }

      //ELBOW LIMITATIONS
      if (SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow"){
        if (rotVal < (10*degToRad) && rotVal > (-135*degToRad)){
          SELECTED.rotation.y = rotVal;               
        }
      }
            


      //SHOULDER LIMITATIONS    
      if (SELECTED.name == "right-shoulder" || SELECTED.name == "left-shoulder"){
        if (SELECTED.name == "right-shoulder"){
          if (rotVal > (-130*degToRad) && rotVal < (45*degToRad)){
            SELECTED.rotaion.y = rotVal;  
          }
        }
        if (SELECTED.name == "left-shoulder"){
          if (rotVal > (-45*degToRad) && rotVal < (89*degToRad)){
            SELECTED.rotation.y = rotVal;  
          }
        }
      }

      //HIP LIMITATIONS    
      if (SELECTED.name == "right-hip" || SELECTED.name == "left-hip"){
        if (SELECTED.name == "right-hip"){
          if (rotVal > (-40*degToRad) && rotVal < (45*degToRad)){
            SELECTED.rotation.y = rotVal;  
          }
        }
        if (SELECTED.name == "left-hip"){
          if (rotVal > (-45*degToRad) && rotVal < (40*degToRad)){
            SELECTED.rotation.y = rotVal; 
          }
        }
      }

      //NECK LIMITATIONS    
      if (SELECTED.name == "neck"){
        if (rotVal > (-70*degToRad) && rotVal < (70*degToRad)){
          SELECTED.rotation.y = rotVal;  
        }
      }

      //LOWER BACK LIMITATIONS    
      if (SELECTED.name == "lower-back"){
        if (rotVal > (-40*degToRad) && rotVal < (40*degToRad)){
          SELECTED.rotation.y = rotVal;  
        }
      }
    }

    update();

    $("#y-rot").val("")
  }

  function blurZ(e){
    var rotVal = e.target.value * degToRad;
    if (SELECTED){
      if (SELECTED.name == "root"){
        SELECTED.rotation.z = rotVal;
      }
       //KNEE LIMITATIONS
      if (SELECTED.name == "right-knee" || SELECTED.name == "left-knee"){
      }

      //ELBOW LIMITATIONS
      if (SELECTED.name == "right-elbow" || SELECTED.name == "left-elbow"){
      }
            


      //SHOULDER LIMITATIONS    
      if (SELECTED.name == "right-shoulder" || SELECTED.name == "left-shoulder"){
        if (SELECTED.name == "right-shoulder"){
          if (rotVal < (90*degToRad) && rotVal > (-135*degToRad)){
          SELECTED.rotation.z = rotVal;
          }
        }
        if (SELECTED.name == "left-shoulder"){
          if (rotVal > (-90*degToRad) && rotVal < (135*degToRad)){
            SELECTED.rotation.z = rotVal;
          }
        }
      }

      //HIP LIMITATIONS    
      if (SELECTED.name == "right-hip" || SELECTED.name == "left-hip"){
        if (SELECTED.name == "right-hip"){
          if (rotVal < (90*degToRad) && rotVal > (-20*degToRad)){
            SELECTED.rotation.z = rotVal;
          }
        }
        if (SELECTED.name == "left-hip"){
          if (rotVal > (-90*degToRad) && rotVal < (20*degToRad)){
            SELECTED.rotation.z = rotVal;
          }
        }
      }

      //NECK LIMITATIONS    
      if (SELECTED.name == "neck"){
        if (rotVal > (-35*degToRad) && rotVal < (35*degToRad)){
          SELECTED.rotation.z = rotVal;
        }
      }

      //LOWER BACK LIMITATIONS    
      if (SELECTED.name == "lower-back"){
        if (rotVal > (-35*degToRad) && rotVal < (35*degToRad)){
          SELECTED.rotation.z = rotVal;
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