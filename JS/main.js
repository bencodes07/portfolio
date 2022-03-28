let camera;
let renderer;
let scene;
const heroCanvas = document.getElementById("canvas");
let primitive;
let shapeGroup = new THREE.Group();
let start = Date.now();

const darkTheme = new THREE.Color(0x292733);
const lightTheme = new THREE.Color(0xf4f4f4);

const darkerColor = 0x000000;

window.addEventListener("load", initAll, false);

function initAll() {
  initScene();
  createPrimitive();
  animation();
}

// Starten der Scene
function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x292733);

  let fov = 40;
  const nearLimit = 0.1;
  const farLimit = 1000;

  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    nearLimit,
    farLimit
  );
  camera.position.set(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);
}

//scrolling
function moveCamera() {
  const t = document.body.getBoundingClientRect().top - 1;

  camera.position.x = t * (0.000005 * window.innerWidth);
  camera.position.y = t * (0.000005 * window.innerHeight);
}

document.body.onscroll = moveCamera;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

let primitiveElement = function () {
  this.mesh = new THREE.Object3D();
  mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: {
        type: "f",
        value: 0.1,
      },
      pointscale: {
        type: "f",
        value: 0.2,
      },
      decay: {
        type: "f",
        value: 0.3,
      },
      size: {
        type: "f",
        value: 0.3,
      },
      displace: {
        type: "f",
        value: 0.3,
      },
      complex: {
        type: "f",
        value: 0.0,
      },
      waves: {
        type: "f",
        value: 0.1,
      },
      eqcolor: {
        type: "f",
        value: 0.0,
      },
      rcolor: {
        type: "f",
        value: 0.0,
      },
      gcolor: {
        type: "f",
        value: 0.0,
      },
      bcolor: {
        type: "f",
        value: 0.0,
      },
      fragment: {
        type: "i",
        value: true,
      },
      redhell: {
        type: "i",
        value: true,
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  });
  //---
  var wir_mat = new THREE.MeshBasicMaterial({ color: darkerColor });
  var geo = new THREE.IcosahedronBufferGeometry(2, 6);
  var wir = new THREE.IcosahedronBufferGeometry(2.3, 2);
  this.shape = new THREE.Mesh(geo, mat);
  this.point = new THREE.Points(wir, mat);
  //---
  shapeGroup.add(this.point);
  shapeGroup.add(this.shape);

  shapeGroup.position.set(5, 0, -20);
  scene.add(shapeGroup);
};

function createPrimitive() {
  primitive = new primitiveElement();
}

// Werte des Objektes
let options = {
  perlin: {
    speed: 0.4,
    size: 0.7,
    perlins: 1.0,
    decay: 1.2,
    displace: 1.0,
    complex: 0.2,
    waves: 3.7,
    eqcolor: 10.0,
    rcolor: 0,
    gcolor: 1,
    bcolor: 1.5,
    points: false,
    redhell: true,
  },
  perlinRandom: function () {
    TweenMax.to(this.perlin, 2, {
      //decay: Math.random() * 1.0,
      waves: Math.random() * 20.0,
      complex: Math.random() * 1.0,
      displace: Math.random() * 2.5,
      ease: Elastic.easeOut,
    });
  },
  random: function () {
    //this.perlin.redhell = Math.random() >= 0.5; // 10 1 0.1 1.2
    TweenMax.to(this.perlin, 1, {
      eqcolor: 11.0,
      rcolor: Math.random() * 1.5,
      gcolor: Math.random() * 0.5,
      bcolor: Math.random() * 1.5,
      ease: Quart.easeInOut,
    });
  },
  normal: function () {
    this.perlin.redhell = true; // 10 1 0.1 1.2
    TweenMax.to(this.perlin, 1, {
      //speed: 0.12,
      eqcolor: 10.0,
      rcolor: 1.5,
      gcolor: 1.5,
      bcolor: 1.5,
      ease: Quart.easeInOut,
    });
  },
};

window.addEventListener("resize", onWindowResize);

// Animation abspielen
function animation() {
  primitive.point.visible = options.perlin.points;
  //---
  mat.uniforms["time"].value =
    (options.perlin.speed / 1000) * (Date.now() - start);

  mat.uniforms["pointscale"].value = options.perlin.perlins;
  mat.uniforms["decay"].value = options.perlin.decay;
  mat.uniforms["size"].value = options.perlin.size;
  mat.uniforms["displace"].value = options.perlin.displace;
  mat.uniforms["complex"].value = options.perlin.complex;
  mat.uniforms["waves"].value = options.perlin.waves;
  mat.uniforms["fragment"].value = options.perlin.fragment;

  mat.uniforms["redhell"].value = options.perlin.redhell;
  mat.uniforms["eqcolor"].value = options.perlin.eqcolor;
  mat.uniforms["rcolor"].value = options.perlin.rcolor;
  mat.uniforms["gcolor"].value = options.perlin.gcolor;
  mat.uniforms["bcolor"].value = options.perlin.bcolor;
  //---

  localStorage.getItem("nightMode") === "true"
    ? (scene.background = lightTheme)
    : (scene.background = darkTheme);
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
}
