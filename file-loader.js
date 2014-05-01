var objects = [], joints=[], scene, joints_female=[], objects_female=[], effector_pt=[];

function loadMale(){
  var loader = new THREE.OBJLoader();
  loader.load("m_lower_back.obj", function(rooter){
    var root = rooter;
    root.scale.set(1,1,1);
    root.name = "lower-back";
    root.children[0].material = new THREE.MeshPhongMaterial( 
      { color: 0xe7eaed, opacity: 1 } );

    loader.load("m_torso.obj", function(torso){
      torso.position.y = .912;
      torso.children[0].material = new THREE.MeshPhongMaterial( 
        { color: 0xe7eaed, opacity: 1 } );

      loader.load("m_neck.obj", function(necked){

        loader.load("m_head.obj", function(head){
          head.position.x = 0;
          head.position.y=0.643;
          head.position.z=0.073;
          head.children[0].material = new THREE.MeshPhongMaterial( 
            { color: 0xe7eaed, opacity: 1 } );

          loader.load("m_rshoulder.obj", function(lshouldered){

            loader.load("m_luarm.obj", function(luarm){
              luarm.position.x = .55;
              luarm.position.y = -.011;
              luarm.position.z= -.012;
              luarm.scale.x = 1;
              luarm.scale.y = -1;
              luarm.children[0].material = new THREE.MeshPhongMaterial( 
                { color: 0xe7eaed, opacity: 1 } );

              loader.load("m_relbow.obj", function(lelbowed){

                loader.load("m_rlarm.obj", function(llarm){
                  llarm.position.x=.663;
                  llarm.position.y=0.126;
                  llarm.position.z=-.009;
                  llarm.scale.x = -1;
                  llarm.scale.y = -1;
                  llarm.children[0].material = new THREE.MeshPhongMaterial( 
                    { color: 0xe7eaed, opacity: 1 } );

                  loader.load("m_rshoulder.obj", function(rshouldered){

                    loader.load("m_ruarm.obj", function(ruarm){
                      ruarm.position.x = -0.55;
                      ruarm.position.y = -0.011;
                      ruarm.position.z=-0.012;
                      ruarm.scale.x= 1;
                      ruarm.scale.y=1;
                      ruarm.children[0].material = new THREE.MeshPhongMaterial(
                        { color: 0xe7eaed, opacity: 1 } );

                      loader.load("m_relbow.obj", function(relbowed){

                        loader.load("m_rlarm.obj", function(rlarm){
                          rlarm.position.x=-0.663;
                          rlarm.position.y=-0.126;
                          rlarm.position.z=-0.009;
                          rlarm.scale.x= 1;
                          rlarm.scale.y =1;
                          rlarm.children[0].material = new THREE.MeshPhongMaterial( 
                            { color: 0xe7eaed, opacity: 1 } );

                          loader.load("m_pelvis.obj", function(pelvis_obj){
                           var pelvis = pelvis_obj;
                            pelvis.position.x=0;
                            pelvis.position.y=-0;
                            pelvis.position.z=.0;;
                            pelvis.children[0].material = new THREE.MeshPhongMaterial( 
                              { color: 0xe7eaed, opacity: 1 } );

                            root.position.y = .427;
                            root.position.x= 0;//-1.503;

                            loader.load("m_rhip.obj", function(lhip){

                              loader.load("m_rhip.obj", function(rhip){

                                loader.load("m_luleg.obj", function(luleg){
                                  luleg.position.x=0;
                                  luleg.position.y=-0.753;
                                  luleg.position.z=0.126;
                                  luleg.scale.x = 1;
                                  luleg.children[0].material = new THREE.MeshPhongMaterial( 
                                    { color: 0xe7eaed, opacity: 1 } );

                                  loader.load("m_ruleg.obj", function(ruleg){
                                    ruleg.position.x=0;
                                    ruleg.position.y=-0.753;
                                    ruleg.position.z=0.126;
                                    ruleg.scale.x = -1;
                                    ruleg.scale.y = 1;
                                    ruleg.children[0].material = new THREE.MeshPhongMaterial( { color: 0xe7eaed, opacity: 1 } );


                                    loader.load("m_knee.obj", function(lknee){

                                      loader.load("m_knee.obj", function(rknee){

                                        loader.load("m_rlleg.obj", function(llleg){
                                          llleg.position.x=.058;
                                          llleg.position.y=-1.007;
                                          llleg.position.z=0;
                                          llleg.children[0].material = new THREE.MeshPhongMaterial( 
                                            { color: 0xe7eaed, opacity: 1 } );

                                          loader.load("m_rlleg.obj", function(rlleg){
                                            rlleg.position.x=0.058;
                                            rlleg.position.y=-1.007;
                                            rlleg.position.z=0;
                                            //rlleg.scale.x = -1;
                                            //rlleg.scale.y = -1;
                                            rlleg.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var neck = necked;
                                            neck.position.y = .643;
                                            neck.position.z=-.10;
                                            neck.name = "neck";
                                            neck.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var lshoulder = lshouldered;
                                            lshoulder.position.x=0.853;
                                            lshoulder.position.y=.219;
                                            lshoulder.position.z=-0.158;
                                            lshoulder.name = "right-shoulder";
                                            lshoulder.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var lelbow=lelbowed;
                                            lelbow.position.x=0.369;
                                            lelbow.position.y=0;
                                            lelbow.position.z=0.04;
                                            lelbow.scale.y = -1;
                                            lelbow.name= "right-elbow";
                                            lelbow.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var rshoulder = rshouldered;
                                            rshoulder.position.x=-0.853;
                                            rshoulder.position.y=.219;
                                            rshoulder.position.z=-0.158;
                                            rshoulder.scale.x= 1;
                                            rshoulder.name = "left-shoulder";
                                            rshoulder.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var relbow=relbowed;
                                            relbow.position.x=-0.369;
                                            relbow.position.y=0;
                                            relbow.position.z=0.04;
                                            relbow.scale.x= 1;
                                            relbow.scale.y= 1;
                                            relbow.name ="left-elbow";
                                            relbow.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            lhip.position.x=0.402;
                                            lhip.position.y=-0.231;
                                            lhip.position.z=-0.011;
                                            lhip.name = "right-hip";
                                            lhip.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            rhip.position.x=-0.402;
                                            rhip.position.y=-0.231;
                                            rhip.position.z=-0.011;
                                            rhip.scale.x = 1;
                                            rhip.scale.y = 1;
                                            rhip.name = "left-hip";
                                            rhip.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            lknee.position.x=0.115;
                                            lknee.position.y=-0.691;
                                            lknee.position.z=0.032;
                                            lknee.name = "right-knee";
                                            lknee.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            rknee.position.x=-.115;
                                            rknee.position.y=-.691;
                                            rknee.position.z=.032;
                                            rknee.scale.x = -1;
                                            rknee.name = "left-knee";
                                            rknee.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

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
  loader.load("f_lower_back.obj", function(rooter){
    var root = rooter;
    root.scale.set(1,1,1);
    root.name = "lower-back";
    root.children[0].material = new THREE.MeshPhongMaterial( 
      { color: 0xe7eaed, opacity: 1 } );

    loader.load("f_torso.obj", function(torso){
      torso.position.y = .912;
      torso.children[0].material = new THREE.MeshPhongMaterial( 
        { color: 0xe7eaed, opacity: 1 } );

      loader.load("f_neck.obj", function(necked){

        loader.load("f_head.obj", function(head){
          head.position.x = 0;
          head.position.y=0.643;
          head.position.z=0.073;
          head.children[0].material = new THREE.MeshPhongMaterial( 
            { color: 0xe7eaed, opacity: 1 } );

          loader.load("f_rshoulder.obj", function(lshouldered){

            loader.load("f_ruarm.obj", function(luarm){
              luarm.position.x = .55;
              luarm.position.y = -.011;
              luarm.position.z= -.012;
              luarm.scale.x = 1;
              luarm.scale.y = -1;
              luarm.children[0].material = new THREE.MeshPhongMaterial( 
                { color: 0xe7eaed, opacity: 1 } );

              loader.load("f_relbow.obj", function(lelbowed){

                loader.load("f_rlarm.obj", function(llarm){
                  llarm.position.x=.663;
                  llarm.position.y=0.126;
                  llarm.position.z=-.009;
                  llarm.scale.x = -1;
                  llarm.scale.y = -1;
                  llarm.children[0].material = new THREE.MeshPhongMaterial( 
                    { color: 0xe7eaed, opacity: 1 } );

                  loader.load("f_rshoulder.obj", function(rshouldered){

                    loader.load("f_ruarm.obj", function(ruarm){
                      ruarm.position.x = -0.55;
                      ruarm.position.y = -0.011;
                      ruarm.position.z=-0.012;
                      ruarm.scale.x= 1;
                      ruarm.scale.y=1;
                      ruarm.children[0].material = new THREE.MeshPhongMaterial(
                        { color: 0xe7eaed, opacity: 1 } );

                      loader.load("f_relbow.obj", function(relbowed){

                        loader.load("f_rlarm.obj", function(rlarm){
                          rlarm.position.x=-0.663;
                          rlarm.position.y=-0.126;
                          rlarm.position.z=-0.009;
                          rlarm.scale.x= 1;
                          rlarm.scale.y =1;
                          rlarm.children[0].material = new THREE.MeshPhongMaterial( 
                            { color: 0xe7eaed, opacity: 1 } );

                          loader.load("f_pelvis.obj", function(pelvis_obj){
                            var pelvis = pelvis_obj;
                            pelvis.position.x=0;
                            pelvis.position.y=-0;
                            pelvis.position.z=.0;;
                            pelvis.children[0].material = new THREE.MeshPhongMaterial( 
                              { color: 0xe7eaed, opacity: 1 } );

                            root.position.y = .427;
                            root.position.x= 0;//-1.503;

                            loader.load("f_rhip.obj", function(lhip){

                              loader.load("f_rhip.obj", function(rhip){

                                loader.load("f_ruleg.obj", function(luleg){
                                  luleg.position.x=0;
                                  luleg.position.y=-0.753;
                                  luleg.position.z=0.126;
                                  luleg.scale.x = 1;
                                  luleg.children[0].material = new THREE.MeshPhongMaterial( 
                                    { color: 0xe7eaed, opacity: 1 } );

                                  loader.load("f_ruleg.obj", function(ruleg){
                                    ruleg.position.x=0;
                                    ruleg.position.y=-0.753;
                                    ruleg.position.z=0.126;
                                    ruleg.scale.x = -1;
                                    ruleg.scale.y = 1;
                                    ruleg.children[0].material = new THREE.MeshPhongMaterial( { color: 0xe7eaed, opacity: 1 } );


                                    loader.load("f_knee.obj", function(lknee){

                                      loader.load("f_knee.obj", function(rknee){

                                        loader.load("f_rlleg.obj", function(llleg){
                                          llleg.position.x=.058;
                                          llleg.position.y=-1.007;
                                          llleg.position.z=0;
                                          llleg.children[0].material = new THREE.MeshPhongMaterial( 
                                            { color: 0xe7eaed, opacity: 1 } );

                                          loader.load("f_rlleg.obj", function(rlleg){
                                            rlleg.position.x=0.058;
                                            rlleg.position.y=-1.007;
                                            rlleg.position.z=0;
                                            //rlleg.scale.x = -1;
                                            //rlleg.scale.y = -1;
                                            rlleg.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var neck = necked;
                                            neck.position.y = .643;
                                            neck.position.z=-.10;
                                            neck.name = "neck";
                                            neck.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var lshoulder = lshouldered;
                                            lshoulder.position.x=0.853;
                                            lshoulder.position.y=.219;
                                            lshoulder.position.z=-0.158;
                                            lshoulder.name = "right-shoulder";
                                            lshoulder.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var lelbow=lelbowed;
                                            lelbow.position.x=0.369;
                                            lelbow.position.y=0;
                                            lelbow.position.z=0.04;
                                            lelbow.scale.y = -1;
                                            lelbow.name= "right-elbow";
                                            lelbow.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var rshoulder = rshouldered;
                                            rshoulder.position.x=-0.853;
                                            rshoulder.position.y=.219;
                                            rshoulder.position.z=-0.158;
                                            rshoulder.scale.x= 1;
                                            rshoulder.name = "left-shoulder";
                                            rshoulder.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            var relbow=relbowed;
                                            relbow.position.x=-0.369;
                                            relbow.position.y=0;
                                            relbow.position.z=0.04;
                                            relbow.scale.x= 1;
                                            relbow.scale.y= 1;
                                            relbow.name ="left-elbow";
                                            relbow.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            lhip.position.x=0.402;
                                            lhip.position.y=-0.231;
                                            lhip.position.z=-0.011;
                                            lhip.name = "right-hip";
                                            lhip.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            rhip.position.x=-0.402;
                                            rhip.position.y=-0.231;
                                            rhip.position.z=-0.011;
                                            rhip.scale.x = 1;
                                            rhip.scale.y = 1;
                                            rhip.name = "left-hip";
                                            rhip.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            lknee.position.x=0.115;
                                            lknee.position.y=-0.691;
                                            lknee.position.z=0.032;
                                            lknee.name = "right-knee";
                                            lknee.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

                                            rknee.position.x=-.115;
                                            rknee.position.y=-.691;
                                            rknee.position.z=.032;
                                            rknee.scale.x = -1;
                                            rknee.name = "left-knee";
                                            rknee.children[0].material = new THREE.MeshPhongMaterial( 
                                              { color: 0xe7eaed, opacity: 1 } );

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


                                            joints_female.push(root);
                                            joints_female.push(lhip);
                                            joints_female.push(rhip);
                                            joints_female.push(lknee);
                                            joints_female.push(rknee);
                                            joints_female.push(neck);
                                            joints_female.push(rshoulder);
                                            joints_female.push(lshoulder);
                                            joints_female.push(relbow);
                                            joints_female.push(lelbow);

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