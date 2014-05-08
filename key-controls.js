/* 
Jennifer Cahalane 
Senior Design - Spring 2014 
Contains: functions handling keyboard controls for joint rotation, and model zoom and translation.
Includes: functions to called when a key is pressed or depressed.  When pressed, values are set to true.  When depressed, values are reset to false.
*/  


/*
  _______  __        ______   .______        ___       __      
 /  _____||  |      /  __  \  |   _  \      /   \     |  |     
|  |  __  |  |     |  |  |  | |  |_)  |    /  ^  \    |  |     
|  | |_ | |  |     |  |  |  | |   _  <    /  /_\  \   |  |     
|  |__| | |  `----.|  `--'  | |  |_)  |  /  _____  \  |  `----.
 \______| |_______| \______/  |______/  /__/     \__\ |_______|
*/ 

 //translate -- when root selected
  var left = false;
  var right = false;
  var up = false;
  var down = false;
  
  //zoom  - don't think I use these
  var forward = false;
  var backward = false;
  
  //rotation
  var cwY = false;
  var ccwY = false;
  var cwX = false;
  var ccwX = false;
  var cwZ = false;
  var ccwZ = false;


/*
 _______  __    __  .__   __.   ______ .___________. __    ______   .__   __.      _______.
|   ____||  |  |  | |  \ |  |  /      ||           ||  |  /  __  \  |  \ |  |     /       |
|  |__   |  |  |  | |   \|  | |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
|   __|  |  |  |  | |  . `  | |  |         |  |     |  | |  |  |  | |  . `  |     \   \    
|  |     |  `--'  | |  |\   | |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |   
|__|      \______/  |__| \__|  \______|    |__|     |__|  \______/  |__| \__| |_______/    
*/


  //handle keypress (down) - sets corresponding value to true if key is pressed
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
          cwY = true;
        break;
      case 74: //j -- counterClockwise about y
          ccwY = true;
        break;
      case 73:  //i -- clockwise about x
          cwX=true;
        break; 
      case 75:  //k -- counterClockwise about x
          ccwX = true;
        break;
      case 85:  //u -- counterClockwise about z
        ccwZ = true;
        break;
      case 79:  //o -- clockwise about z
        cwZ = true;
        break;
    }
  }

  //handle keypress (up): resets values
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
    }
  }