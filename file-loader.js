var objects = [], joints=[], scene, joints_female=[], objects_female=[], effector_pt=[];

function loadMale(){
  var loader = new THREE.OBJLoader();
  loader.load("root.obj", function(rooter){
    var root = rooter;
    root.scale.set(1,1,1);
    root.name = "lower-back";

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
                          rlarm.scale.y =-1;

                          loader.load("pelvis.obj", function(pelvis_obj){
                            pelvis = pelvis_obj;
                            pelvis.position.x=.019;
                            pelvis.position.y=-.66;
                            pelvis.position.z=.035;

                            root.position.y = .67;
                            root.position.x= 0;//-1.503;

                            loader.load("lhip.obj", function(lhip){

                              loader.load("lhip.obj", function(rhip){

                                loader.load("luleg.obj", function(luleg){
                                  luleg.position.x=.643;
                                  luleg.position.y=-.635;
                                  luleg.position.z=-.215;

                                  loader.load("luleg.obj", function(ruleg){
                                    ruleg.position.x=-.643;
                                    ruleg.position.y=.635;
                                    ruleg.position.z=-.215;
                                    ruleg.scale.x = -1;
                                    ruleg.scale.y = -1;


                                    loader.load("lknee.obj", function(lknee){

                                      loader.load("lknee.obj", function(rknee){
                            
                                        loader.load("llleg.obj", function(llleg){
                                          llleg.position.x=.626;
                                          llleg.position.y=-.555;
                                          llleg.position.z=-.198;

                                          loader.load("llleg.obj", function(rlleg){
                                            rlleg.position.x=-.626;
                                            rlleg.position.y=.555;
                                            rlleg.position.z=-.198;
                                            rlleg.scale.x = -1;
                                            rlleg.scale.y = -1;

                                            var neck = necked;
                                            neck.position.y = 1.449;
                                            neck.position.z=0.12;
                                            neck.name = "neck";

                                            var lshoulder = lshouldered;
                                            lshoulder.position.x=1.12;
                                            lshoulder.position.y=.845;
                                            lshoulder.position.z=.12;
                                            lshoulder.name = "right-shoulder";

                                            var lelbow=lelbowed;
                                            lelbow.position.x=1.076;
                                            lelbow.position.y=.555;
                                            lelbow.position.z=.213;
                                            lelbow.name= "right-elbow";

                                            var rshoulder = rshouldered;
                                            rshoulder.position.x=-1.12;
                                            rshoulder.position.y=.845;
                                            rshoulder.position.z=.12;
                                            rshoulder.scale.x= 1;
                                            rshoulder.name = "left-shoulder";

                                            var relbow=relbowed;
                                            relbow.position.x=1.076;
                                            relbow.position.y=.555;
                                            relbow.position.z=.213;
                                            relbow.scale.x= -1;
                                            relbow.scale.y= -1;
                                            relbow.name ="left-elbow";

                                            lhip.position.x=.459;
                                            lhip.position.y=-.738;
                                            lhip.position.z=-.059;
                                            lhip.name = "right-hip";

                                            rhip.position.x=-.459;
                                            rhip.position.y=-.738;
                                            rhip.position.z=-.059;
                                            rhip.scale.x = -1;
                                            rhip.scale.y = -1;
                                            rhip.name = "left-hip";

                                            lknee.position.x=-.63;
                                            lknee.position.y=-1.479;
                                            lknee.position.z=.206;
                                            lknee.name = "right-knee";

                                            rknee.position.x=-.63;
                                            rknee.position.y=-1.479;
                                            rknee.position.z=.206;
                                            rknee.scale.x = -1;
                                            rknee.scale.y = -1;
                                            rknee.name = "left-knee";

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

                                            lknee.children.push(llleg);
                                            llleg.parent = lknee;

                                            rknee.children.push(rlleg)
                                            rlleg.parent = rknee;

                                            luleg.children.push(lknee);
                                            lknee.parent = luleg;

                                            ruleg.children.push(rknee)
                                            rknee.parent = ruleg;

                                            lhip.children.push(luleg);
                                            luleg.parent = lhip;

                                            rhip.children.push(ruleg)
                                            ruleg.parent = rhip;

                                            pelvis.children.push(lhip);
                                            lhip.parent = pelvis;

                                            pelvis.children.push(rhip);
                                            rhip.parent = pelvis;

                                            root.parent=pelvis;
                                            pelvis.children.push(root);
                                            pelvis.name ="root";
                                           // scene.add(torso);
                                            //objects.push(torso);      
                                            
                                            joints.push(root);
                                            joints.push(lhip);
                                            joints.push(rhip);
                                            joints.push(lknee);
                                            joints.push(rknee);
                                            //joints.push(root);
                                            joints.push(neck);
                                            joints.push(lshoulder);
                                            joints.push(lelbow);
                                            joints.push(rshoulder);
                                            joints.push(relbow);

                                            scene.add(pelvis);
                                            objects.push(pelvis);
                                          
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

function loadFemale(){
  //FEMALE
  var loader = new THREE.OBJLoader();
  loader.load("root.obj", function(rooter){
    var root = rooter;
    root.scale.set(1,1,1);
    root.name = "lower-back";

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
                          rlarm.scale.y =-1;

                          loader.load("pelvis.obj", function(pelvis_obj){
                            var pelvis = pelvis_obj;
                            pelvis.position.x=.019;
                            pelvis.position.y=-.66;
                            pelvis.position.z=.035;

                            root.position.y = .67;
                            root.position.x= 0;

                            var neck = necked;
                            neck.position.y = 1.449;
                            neck.position.z=0.12;
                            neck.name = "neck";

                            var lshoulder = lshouldered;
                            lshoulder.position.x=1.12;
                            lshoulder.position.y=.845;
                            lshoulder.position.z=.12;
                            lshoulder.name = "right-shoulder";

                            var lelbow=lelbowed;
                            lelbow.position.x=1.076;
                            lelbow.position.y=.555;
                            lelbow.position.z=.213;
                            lelbow.name= "right-elbow";

                            var rshoulder = rshouldered;
                            rshoulder.position.x=-1.12;
                            rshoulder.position.y=.845;
                            rshoulder.position.z=.12;
                            rshoulder.scale.x= 1;
                            rshoulder.name = "left-shoulder";

                            var relbow=relbowed;
                            relbow.position.x=1.076;
                            relbow.position.y=.555;
                            relbow.position.z=.213;
                            relbow.scale.x= -1;
                            relbow.scale.y= -1;
                            relbow.name ="left-elbow";

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

                            root.parent=pelvis;
                            pelvis.children.push(root);
                            pelvis.name ="root";  
                            
                            joints_female.push(root);
                            joints_female.push(root);
                            joints_female.push(neck);
                            joints_female.push(lshoulder);
                            joints_female.push(lelbow);
                            joints_female.push(rshoulder);
                            joints_female.push(relbow);

                            objects_female.push(pelvis);
                                          
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
  });
}

function loadEffector(){
  var loader = new THREE.OBJLoader();
  loader.load("neck.obj", function(effector){
    effector.name = "effector";
    effector.position.x = 4;
    effector.children[0].material = new THREE.MeshPhongMaterial( 
      { color: 0x077684, opacity: 1 } ); 
    effector_pt.push(effector);
  });
}