$(function(){
	var degToRad = 3.14/180.0;

	var cameraP, cameraO, scene, renderer;
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

    init();
    animate();

    function init() {
    	//scene
    	scene = new THREE.Scene();

    	var height = (2*window.innerHeight/3);

    	//camera
    	//width, height, fov, near, far, orthonear, ortho far
        cameraP = new THREE.PerspectiveCamera( 75, window.innerWidth/ height, 1, 10000);
        cameraP.position.z = 1000;

        cameraO = new THREE.OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, height/2, height/-2, 1, 1000);

        cameraObject = new THREE.Object3D();
        cameraObject.add(cameraP);
       // cameraObject.add(cameraO);
        scene.add(cameraObject);

        //light
        var light = new THREE.DirectionalLight(0xff0000, 2.5);
        light.position.set(1, 2, 1.5);
        scene.add(light);

        var light2 = new THREE.DirectionalLight(0xffffff, 2.0);
        light2.position.set(-2, -1.5, -1);
        scene.add(light2);

        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshPhongMaterial( { color: 0x3b3b3b, wireframe: false } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

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
        	cameraObject.translateX(1);
        }else if (right){
        	cameraObject.translateX(-1);
        }else if (up){
        	cameraObject.translateY(-1);
        }else if (down){
        	cameraObject.translateY(1);
        }else if (forward){
        	cameraObject.translateZ(-1);
        }else if (backward){
        	cameraObject.translateZ(1);
        }

        //rotate
        else if (cwX){
         	cameraObject.rotateOnAxis(xAxis, offset);
        }else if (ccwX){
        	cameraObject.rotateOnAxis(xAxis, -offset);
        }else if (cwY){
        	cameraObject.rotateOnAxis(yAxis, -offset);
        }else if (ccwY){
        	cameraObject.rotateOnAxis(yAxis, offset);
        }else if (cwZ){
        	cameraObject.rotateOnAxis(zAxis, offset);
        }else if (ccwZ){
        	cameraObject.rotateOnAxis(zAxis, -offset);
        }

        if (perspective){
       		renderer.render( scene, cameraP );
       	}else{
       		renderer.render( scene, cameraO);
       	}

    }

});







