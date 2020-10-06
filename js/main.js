$ ( document ).ready( function(){
 console.log('DOM listo');



     var scene = new THREE.Scene();
     var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

     var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			$("body").append( renderer.domElement );

      let geometry = new THREE.IcosahedronGeometry( 2, 3);
      geometry.computeFlatVertexNormals();
			var material = new THREE.MeshPhongMaterial( { color: 0x00FFF0, flatShading:true } );
      let bola = new THREE.Mesh( geometry, material );

      // console.log(bola);

      scene.add( bola );
      camera.position.z = 5;

      let contenedor = new THREE.Object3D();
      scene.add( contenedor);

      for ( let i = 0; i < bola.geometry.vertices.length; i++){

        let geometry = new THREE.SphereGeometry(0.1, 0.1);
        let material = new THREE.MeshPhongMaterial({color: 0xf50161 });
        let cubo = new THREE.Mesh(geometry, material);
        cubo.position.set(bola.geometry.vertices[i].x , bola.geometry.vertices [i].y, bola.geometry.vertices[i].z);
        contenedor.add(cubo);
      }

      // var light = new THREE.AmbientLight( 0xFFFFFF); // soft white light
      // scene.add( light );

      var light = new THREE.PointLight( 0xffffff, 1, 100 );
      light.position.set( 0, 0, 5 );
      light.castShadow = true;
      scene.add( light );



      function animate(){
        requestAnimationFrame( animate );

        bola.rotation.y += -0.01;
        bola.rotation.x += -0.01;

        for( let i = 0; i < bola.geometry.vertices.length; i++){
            bola.geometry.vertices[i].x += (-0.01 + (Math.random() * 0.02) );
            bola.geometry.vertices[i].y += (-0.01 + (Math.random() * 0.02) );
            bola.geometry.vertices[i].z += (-0.01 + (Math.random() * 0.02) );
        }

     bola.geometry.verticesNeedUpdate = true;

        for( let i = 0; i < contenedor.children.length; i++){
          contenedor.children[i].position.x = bola.geometry.vertices[i].x;
          contenedor.children[i].position.y = bola.geometry.vertices[i].y;
          contenedor.children[i].position.z = bola.geometry.vertices[i].z;
        }
contenedor.rotation.y += -0.01;
contenedor.rotation.x += -0.01;

     renderer.render (scene, camera);

      };

animate();

});
