self["webpackHotUpdatepandemic_globe"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three_globe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three-globe */ "./node_modules/three-globe/dist/three-globe.module.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_glow_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three-glow-mesh */ "./node_modules/three-glow-mesh/dist/index.module.js");
/* harmony import */ var _files_globe_data_min_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./files/globe-data-min.json */ "./src/files/globe-data-min.json");
/* harmony import */ var _files_my_flights_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./files/my-flights.json */ "./src/files/my-flights.json");
/* harmony import */ var _files_my_airports_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./files/my-airports.json */ "./src/files/my-airports.json");








var renderer, camera, scene, controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var Globe;

// Globe rotation variables
let rotationTime = 0;
const rotationSpeed = 0.1; // Even slower rotation
const rotationRange = 0.3; // How far it rotates (in radians)
const indiaBaseRotation = -Math.PI * (5 / 9); // Base rotation to show India

// Pulsating animation variables
let pulsateTime = 0;
const pulsateSpeed = 0.02;

// Enhanced network connections data with supplier hub information
const networkConnections = [
  // India as central hub - connecting to major buyer countries
  { startLat: 28.6139, startLng: 77.2090, endLat: 40.7128, endLng: -74.0060, order: 0, name: "India-USA", volume: "$450M" }, // India to USA
  { startLat: 28.6139, startLng: 77.2090, endLat: 51.5074, endLng: -0.1278, order: 1, name: "India-UK", volume: "$320M" }, // India to UK
  { startLat: 28.6139, startLng: 77.2090, endLat: 35.6762, endLng: 139.6503, order: 2, name: "India-Japan", volume: "$280M" }, // India to Japan
  { startLat: 28.6139, startLng: 77.2090, endLat: -33.8688, endLng: 151.2093, order: 3, name: "India-Australia", volume: "$180M" }, // India to Australia
  { startLat: 28.6139, startLng: 77.2090, endLat: 52.5200, endLng: 13.4050, order: 4, name: "India-Germany", volume: "$390M" }, // India to Germany
  { startLat: 28.6139, startLng: 77.2090, endLat: 1.3521, endLng: 103.8198, order: 5, name: "India-Singapore", volume: "$150M" }, // India to Singapore
  { startLat: 28.6139, startLng: 77.2090, endLat: 25.2048, endLng: 55.2708, order: 6, name: "India-UAE", volume: "$220M" }, // India to UAE
  { startLat: 28.6139, startLng: 77.2090, endLat: 43.6532, endLng: -79.3832, order: 7, name: "India-Canada", volume: "$160M" }, // India to Canada
  { startLat: 28.6139, startLng: 77.2090, endLat: 55.7558, endLng: 37.6176, order: 8, name: "India-Russia", volume: "$120M" }, // India to Russia

  // Secondary connections between buyer countries
  { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278, order: 9, name: "USA-UK", volume: "$80M" }, // USA to UK
  { startLat: 51.5074, startLng: -0.1278, endLat: 52.5200, endLng: 13.4050, order: 10, name: "UK-Germany", volume: "$60M" }, // UK to Germany
  { startLat: 35.6762, startLng: 139.6503, endLat: 1.3521, endLng: 103.8198, order: 11, name: "Japan-Singapore", volume: "$40M" }, // Japan to Singapore
].map(conn => ({
  ...conn,
  arcAlt: 0.15 + Math.random() * 0.25, // Random altitude between 0.15-0.4
  status: Math.random() > 0.15, // 85% active connections
  isIndiaConnection: conn.startLat === 28.6139 || conn.endLat === 28.6139
}));

// Indian manufacturing hubs for enhanced visualization
const indianHubs = [
  { lat: 19.0760, lng: 72.8777, name: "Mumbai", industry: "Textiles & Chemicals", suppliers: 2500 },
  { lat: 28.7041, lng: 77.1025, name: "Delhi", industry: "Electronics & Auto", suppliers: 1800 },
  { lat: 13.0827, lng: 80.2707, name: "Chennai", industry: "Automotive & IT", suppliers: 1200 },
  { lat: 12.9716, lng: 77.5946, name: "Bangalore", industry: "Electronics & Pharma", suppliers: 1500 },
  { lat: 18.5204, lng: 73.8567, name: "Pune", industry: "Automotive & Engineering", suppliers: 900 },
  { lat: 22.5726, lng: 88.3639, name: "Kolkata", industry: "Jute & Leather", suppliers: 700 },
  { lat: 23.0225, lng: 72.5714, name: "Ahmedabad", industry: "Textiles & Chemicals", suppliers: 1100 },
  { lat: 17.3850, lng: 78.4867, name: "Hyderabad", industry: "Pharmaceuticals & IT", suppliers: 800 }
];

init();
initGlobe();
onWindowResize();
animate();

// SECTION Initializing core ThreeJS elements
function init() {
  // Initialize renderer
  renderer = new three__WEBPACK_IMPORTED_MODULE_5__.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  // renderer.outputEncoding = THREE.sRGBEncoding;

  // Set much larger fixed size for background globe
  const fixedWidth = 1800;
  const fixedHeight = 1400;
  renderer.setSize(fixedWidth, fixedHeight);

  const globeContainer = document.getElementById('globe-container');
  if (globeContainer) {
    globeContainer.appendChild(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }

  // Initialize scene, light
  scene = new three__WEBPACK_IMPORTED_MODULE_5__.Scene();
  scene.add(new three__WEBPACK_IMPORTED_MODULE_5__.AmbientLight(0xbbbbbb, 0.3));
  // Remove background for transparency
  // scene.background = new Color(0x040d21);

  // Initialize camera, light
  camera = new three__WEBPACK_IMPORTED_MODULE_5__.PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new three__WEBPACK_IMPORTED_MODULE_5__.DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new three__WEBPACK_IMPORTED_MODULE_5__.DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new three__WEBPACK_IMPORTED_MODULE_5__.PointLight(0x8566cc, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  camera.position.z = 250;
  camera.position.x = 0;
  camera.position.y = 0;

  scene.add(camera);

  // Additional effects - remove fog for cleaner hero look
  // scene.fog = new Fog(0x535ef3, 400, 2000);

  // Helpers
  // const axesHelper = new AxesHelper(800);
  // scene.add(axesHelper);
  // var helper = new DirectionalLightHelper(dLight);
  // scene.add(helper);
  // var helperCamera = new CameraHelper(dLight.shadow.camera);
  // scene.add(helperCamera);

  // Disable controls for non-responsive globe
  controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_6__.OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.enableDamping = false;
  controls.enablePan = false;
  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.autoRotate = false;

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove);
}

// SECTION Globe
function initGlobe() {
  // Initialize the Globe
  Globe = new three_globe__WEBPACK_IMPORTED_MODULE_0__.default({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .hexPolygonsData(_files_globe_data_min_json__WEBPACK_IMPORTED_MODULE_2__.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#3a228a")
    .atmosphereAltitude(0.25)
    .hexPolygonColor((e) => {
      if (
        ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
          e.properties.ISO_A3
        )
      ) {
        return "rgba(255,255,255, 1)";
      } else return "rgba(255,255,255, 0.7)";
    });

  // NOTE Arc animations with network connections and traveling pulses
  setTimeout(() => {
    Globe.arcsData(networkConnections)
      .arcColor((e) => {
        return e.status ? "#00ff88" : "#ff6b35"; // Green for active, orange for inactive
      })
      .arcAltitude((e) => {
        return e.arcAlt;
      })
      .arcStroke((e) => {
        const basePulse = Math.sin(pulsateTime + e.order * 0.5) * 0.4 + 0.6; // Individual pulse timing
        return e.status ? 0.8 * basePulse : 0.4 * basePulse;
      })
      .arcDashLength(0.3) // Shorter dashes for pulse effect
      .arcDashGap(0.1) // Smaller gaps
      .arcDashAnimateTime(3000) // Slower pulse travel
      .arcsTransitionDuration(2000)
      .arcDashInitialGap((e) => e.order * 0.2) // Staggered pulse starts
      .pointsData(_files_my_airports_json__WEBPACK_IMPORTED_MODULE_4__.airports)
      .pointColor(() => "#ffffff")
      .pointsMerge(true)
      .pointAltitude(0.07)
      .pointRadius(0.05);
  }, 1000);

  // Set initial rotation to show India (Z rotation for tilt)
  Globe.rotation.y = indiaBaseRotation;
  Globe.rotateZ(-Math.PI / 6);
  const globeMaterial = Globe.globeMaterial();
  globeMaterial.color = new three__WEBPACK_IMPORTED_MODULE_5__.Color(0x3a228a);
  globeMaterial.emissive = new three__WEBPACK_IMPORTED_MODULE_5__.Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  // NOTE Cool stuff
  // globeMaterial.wireframe = true;

  scene.add(Globe);
}

function onMouseMove(event) {
  // Disable mouse movement effects for non-responsive globe
  // mouseX = event.clientX - windowHalfX;
  // mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
  // Keep globe at much larger fixed size, don't make it responsive
  const fixedWidth = 1800;
  const fixedHeight = 1400;

  camera.aspect = fixedWidth / fixedHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(fixedWidth, fixedHeight);
}

function animate() {
  // Remove mouse-based camera movement for non-responsive globe
  // Keep camera in fixed position

  // Custom oscillating rotation around India
  if (Globe) {
    rotationTime += rotationSpeed * 0.01; // Very slow increment
    pulsateTime += pulsateSpeed; // Pulsating increment
    const oscillation = Math.sin(rotationTime) * rotationRange;
    Globe.rotation.y = indiaBaseRotation + oscillation;

    // Update arc strokes for traveling pulse effect
    Globe.arcStroke((e) => {
      const individualPulse = Math.sin(pulsateTime + e.order * 0.5) * 0.4 + 0.6;
      return e.status ? 0.8 * individualPulse : 0.4 * individualPulse;
    });

    // Update dash animation for traveling pulses with enhanced effects
    Globe.arcDashInitialGap((e) => {
      const speed = e.isIndiaConnection ? 0.15 : 0.08; // Faster for India connections
      const travelingPulse = (pulsateTime * speed + e.order * 0.2) % 1;
      return travelingPulse;
    });

    // Simplified - remove complex arc labels for now
  }

  camera.lookAt(scene.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "85fd3e48f5b6a2902f84"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRyx3SEFBd0g7QUFDM0gsR0FBRyxzSEFBc0g7QUFDekgsR0FBRywwSEFBMEg7QUFDN0gsR0FBRywrSEFBK0g7QUFDbEksR0FBRywySEFBMkg7QUFDOUgsR0FBRyw2SEFBNkg7QUFDaEksR0FBRyx1SEFBdUg7QUFDMUgsR0FBRywySEFBMkg7QUFDOUgsR0FBRywwSEFBMEg7O0FBRTdIO0FBQ0EsR0FBRyxvSEFBb0g7QUFDdkgsR0FBRyx3SEFBd0g7QUFDM0gsR0FBRyw4SEFBOEg7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEdBQUcsZ0dBQWdHO0FBQ25HLEdBQUcsNkZBQTZGO0FBQ2hHLEdBQUcsNEZBQTRGO0FBQy9GLEdBQUcsbUdBQW1HO0FBQ3RHLEdBQUcsaUdBQWlHO0FBQ3BHLEdBQUcsMEZBQTBGO0FBQzdGLEdBQUcsbUdBQW1HO0FBQ3RHLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0RBQWEsRUFBRSwrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsY0FBYyx3Q0FBSztBQUNuQixnQkFBZ0IsK0NBQVk7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLGVBQWUsb0RBQWlCO0FBQ2hDO0FBQ0E7O0FBRUEsbUJBQW1CLG1EQUFnQjtBQUNuQztBQUNBOztBQUVBLG9CQUFvQixtREFBZ0I7QUFDcEM7QUFDQTs7QUFFQSxvQkFBb0IsNkNBQVU7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1RkFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0RBQVU7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSCxxQkFBcUIsZ0VBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNkRBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3Q0FBSztBQUNqQywrQkFBK0Isd0NBQUs7QUFDcEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5QztBQUN6QyxnQ0FBZ0M7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O1dDcFFBLG9EIiwiZmlsZSI6Im1haW4uNDFiYmFjNjA3NGY0YjYzMmRhMjYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaHJlZUdsb2JlIGZyb20gXCJ0aHJlZS1nbG9iZVwiO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlciwgU2NlbmUgfSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7XG4gIFBlcnNwZWN0aXZlQ2FtZXJhLFxuICBBbWJpZW50TGlnaHQsXG4gIERpcmVjdGlvbmFsTGlnaHQsXG4gIENvbG9yLFxuICBGb2csXG4gIC8vIEF4ZXNIZWxwZXIsXG4gIC8vIERpcmVjdGlvbmFsTGlnaHRIZWxwZXIsXG4gIC8vIENhbWVyYUhlbHBlcixcbiAgUG9pbnRMaWdodCxcbiAgU3BoZXJlR2VvbWV0cnksXG59IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scy5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlR2xvd01lc2ggfSBmcm9tIFwidGhyZWUtZ2xvdy1tZXNoXCI7XG5pbXBvcnQgY291bnRyaWVzIGZyb20gXCIuL2ZpbGVzL2dsb2JlLWRhdGEtbWluLmpzb25cIjtcbmltcG9ydCB0cmF2ZWxIaXN0b3J5IGZyb20gXCIuL2ZpbGVzL215LWZsaWdodHMuanNvblwiO1xuaW1wb3J0IGFpcnBvcnRIaXN0b3J5IGZyb20gXCIuL2ZpbGVzL215LWFpcnBvcnRzLmpzb25cIjtcbnZhciByZW5kZXJlciwgY2FtZXJhLCBzY2VuZSwgY29udHJvbHM7XG5sZXQgbW91c2VYID0gMDtcbmxldCBtb3VzZVkgPSAwO1xubGV0IHdpbmRvd0hhbGZYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xubGV0IHdpbmRvd0hhbGZZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbnZhciBHbG9iZTtcblxuLy8gR2xvYmUgcm90YXRpb24gdmFyaWFibGVzXG5sZXQgcm90YXRpb25UaW1lID0gMDtcbmNvbnN0IHJvdGF0aW9uU3BlZWQgPSAwLjE7IC8vIEV2ZW4gc2xvd2VyIHJvdGF0aW9uXG5jb25zdCByb3RhdGlvblJhbmdlID0gMC4zOyAvLyBIb3cgZmFyIGl0IHJvdGF0ZXMgKGluIHJhZGlhbnMpXG5jb25zdCBpbmRpYUJhc2VSb3RhdGlvbiA9IC1NYXRoLlBJICogKDUgLyA5KTsgLy8gQmFzZSByb3RhdGlvbiB0byBzaG93IEluZGlhXG5cbi8vIFB1bHNhdGluZyBhbmltYXRpb24gdmFyaWFibGVzXG5sZXQgcHVsc2F0ZVRpbWUgPSAwO1xuY29uc3QgcHVsc2F0ZVNwZWVkID0gMC4wMjtcblxuLy8gRW5oYW5jZWQgbmV0d29yayBjb25uZWN0aW9ucyBkYXRhIHdpdGggc3VwcGxpZXIgaHViIGluZm9ybWF0aW9uXG5jb25zdCBuZXR3b3JrQ29ubmVjdGlvbnMgPSBbXG4gIC8vIEluZGlhIGFzIGNlbnRyYWwgaHViIC0gY29ubmVjdGluZyB0byBtYWpvciBidXllciBjb3VudHJpZXNcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogNDAuNzEyOCwgZW5kTG5nOiAtNzQuMDA2MCwgb3JkZXI6IDAsIG5hbWU6IFwiSW5kaWEtVVNBXCIsIHZvbHVtZTogXCIkNDUwTVwiIH0sIC8vIEluZGlhIHRvIFVTQVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiA1MS41MDc0LCBlbmRMbmc6IC0wLjEyNzgsIG9yZGVyOiAxLCBuYW1lOiBcIkluZGlhLVVLXCIsIHZvbHVtZTogXCIkMzIwTVwiIH0sIC8vIEluZGlhIHRvIFVLXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDM1LjY3NjIsIGVuZExuZzogMTM5LjY1MDMsIG9yZGVyOiAyLCBuYW1lOiBcIkluZGlhLUphcGFuXCIsIHZvbHVtZTogXCIkMjgwTVwiIH0sIC8vIEluZGlhIHRvIEphcGFuXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IC0zMy44Njg4LCBlbmRMbmc6IDE1MS4yMDkzLCBvcmRlcjogMywgbmFtZTogXCJJbmRpYS1BdXN0cmFsaWFcIiwgdm9sdW1lOiBcIiQxODBNXCIgfSwgLy8gSW5kaWEgdG8gQXVzdHJhbGlhXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDUyLjUyMDAsIGVuZExuZzogMTMuNDA1MCwgb3JkZXI6IDQsIG5hbWU6IFwiSW5kaWEtR2VybWFueVwiLCB2b2x1bWU6IFwiJDM5ME1cIiB9LCAvLyBJbmRpYSB0byBHZXJtYW55XG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDEuMzUyMSwgZW5kTG5nOiAxMDMuODE5OCwgb3JkZXI6IDUsIG5hbWU6IFwiSW5kaWEtU2luZ2Fwb3JlXCIsIHZvbHVtZTogXCIkMTUwTVwiIH0sIC8vIEluZGlhIHRvIFNpbmdhcG9yZVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiAyNS4yMDQ4LCBlbmRMbmc6IDU1LjI3MDgsIG9yZGVyOiA2LCBuYW1lOiBcIkluZGlhLVVBRVwiLCB2b2x1bWU6IFwiJDIyME1cIiB9LCAvLyBJbmRpYSB0byBVQUVcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogNDMuNjUzMiwgZW5kTG5nOiAtNzkuMzgzMiwgb3JkZXI6IDcsIG5hbWU6IFwiSW5kaWEtQ2FuYWRhXCIsIHZvbHVtZTogXCIkMTYwTVwiIH0sIC8vIEluZGlhIHRvIENhbmFkYVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiA1NS43NTU4LCBlbmRMbmc6IDM3LjYxNzYsIG9yZGVyOiA4LCBuYW1lOiBcIkluZGlhLVJ1c3NpYVwiLCB2b2x1bWU6IFwiJDEyME1cIiB9LCAvLyBJbmRpYSB0byBSdXNzaWFcblxuICAvLyBTZWNvbmRhcnkgY29ubmVjdGlvbnMgYmV0d2VlbiBidXllciBjb3VudHJpZXNcbiAgeyBzdGFydExhdDogNDAuNzEyOCwgc3RhcnRMbmc6IC03NC4wMDYwLCBlbmRMYXQ6IDUxLjUwNzQsIGVuZExuZzogLTAuMTI3OCwgb3JkZXI6IDksIG5hbWU6IFwiVVNBLVVLXCIsIHZvbHVtZTogXCIkODBNXCIgfSwgLy8gVVNBIHRvIFVLXG4gIHsgc3RhcnRMYXQ6IDUxLjUwNzQsIHN0YXJ0TG5nOiAtMC4xMjc4LCBlbmRMYXQ6IDUyLjUyMDAsIGVuZExuZzogMTMuNDA1MCwgb3JkZXI6IDEwLCBuYW1lOiBcIlVLLUdlcm1hbnlcIiwgdm9sdW1lOiBcIiQ2ME1cIiB9LCAvLyBVSyB0byBHZXJtYW55XG4gIHsgc3RhcnRMYXQ6IDM1LjY3NjIsIHN0YXJ0TG5nOiAxMzkuNjUwMywgZW5kTGF0OiAxLjM1MjEsIGVuZExuZzogMTAzLjgxOTgsIG9yZGVyOiAxMSwgbmFtZTogXCJKYXBhbi1TaW5nYXBvcmVcIiwgdm9sdW1lOiBcIiQ0ME1cIiB9LCAvLyBKYXBhbiB0byBTaW5nYXBvcmVcbl0ubWFwKGNvbm4gPT4gKHtcbiAgLi4uY29ubixcbiAgYXJjQWx0OiAwLjE1ICsgTWF0aC5yYW5kb20oKSAqIDAuMjUsIC8vIFJhbmRvbSBhbHRpdHVkZSBiZXR3ZWVuIDAuMTUtMC40XG4gIHN0YXR1czogTWF0aC5yYW5kb20oKSA+IDAuMTUsIC8vIDg1JSBhY3RpdmUgY29ubmVjdGlvbnNcbiAgaXNJbmRpYUNvbm5lY3Rpb246IGNvbm4uc3RhcnRMYXQgPT09IDI4LjYxMzkgfHwgY29ubi5lbmRMYXQgPT09IDI4LjYxMzlcbn0pKTtcblxuLy8gSW5kaWFuIG1hbnVmYWN0dXJpbmcgaHVicyBmb3IgZW5oYW5jZWQgdmlzdWFsaXphdGlvblxuY29uc3QgaW5kaWFuSHVicyA9IFtcbiAgeyBsYXQ6IDE5LjA3NjAsIGxuZzogNzIuODc3NywgbmFtZTogXCJNdW1iYWlcIiwgaW5kdXN0cnk6IFwiVGV4dGlsZXMgJiBDaGVtaWNhbHNcIiwgc3VwcGxpZXJzOiAyNTAwIH0sXG4gIHsgbGF0OiAyOC43MDQxLCBsbmc6IDc3LjEwMjUsIG5hbWU6IFwiRGVsaGlcIiwgaW5kdXN0cnk6IFwiRWxlY3Ryb25pY3MgJiBBdXRvXCIsIHN1cHBsaWVyczogMTgwMCB9LFxuICB7IGxhdDogMTMuMDgyNywgbG5nOiA4MC4yNzA3LCBuYW1lOiBcIkNoZW5uYWlcIiwgaW5kdXN0cnk6IFwiQXV0b21vdGl2ZSAmIElUXCIsIHN1cHBsaWVyczogMTIwMCB9LFxuICB7IGxhdDogMTIuOTcxNiwgbG5nOiA3Ny41OTQ2LCBuYW1lOiBcIkJhbmdhbG9yZVwiLCBpbmR1c3RyeTogXCJFbGVjdHJvbmljcyAmIFBoYXJtYVwiLCBzdXBwbGllcnM6IDE1MDAgfSxcbiAgeyBsYXQ6IDE4LjUyMDQsIGxuZzogNzMuODU2NywgbmFtZTogXCJQdW5lXCIsIGluZHVzdHJ5OiBcIkF1dG9tb3RpdmUgJiBFbmdpbmVlcmluZ1wiLCBzdXBwbGllcnM6IDkwMCB9LFxuICB7IGxhdDogMjIuNTcyNiwgbG5nOiA4OC4zNjM5LCBuYW1lOiBcIktvbGthdGFcIiwgaW5kdXN0cnk6IFwiSnV0ZSAmIExlYXRoZXJcIiwgc3VwcGxpZXJzOiA3MDAgfSxcbiAgeyBsYXQ6IDIzLjAyMjUsIGxuZzogNzIuNTcxNCwgbmFtZTogXCJBaG1lZGFiYWRcIiwgaW5kdXN0cnk6IFwiVGV4dGlsZXMgJiBDaGVtaWNhbHNcIiwgc3VwcGxpZXJzOiAxMTAwIH0sXG4gIHsgbGF0OiAxNy4zODUwLCBsbmc6IDc4LjQ4NjcsIG5hbWU6IFwiSHlkZXJhYmFkXCIsIGluZHVzdHJ5OiBcIlBoYXJtYWNldXRpY2FscyAmIElUXCIsIHN1cHBsaWVyczogODAwIH1cbl07XG5cbmluaXQoKTtcbmluaXRHbG9iZSgpO1xub25XaW5kb3dSZXNpemUoKTtcbmFuaW1hdGUoKTtcblxuLy8gU0VDVElPTiBJbml0aWFsaXppbmcgY29yZSBUaHJlZUpTIGVsZW1lbnRzXG5mdW5jdGlvbiBpbml0KCkge1xuICAvLyBJbml0aWFsaXplIHJlbmRlcmVyXG4gIHJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUsIGFscGhhOiB0cnVlIH0pO1xuICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweDAwMDAwMCwgMCk7XG4gIC8vIHJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nO1xuXG4gIC8vIFNldCBtdWNoIGxhcmdlciBmaXhlZCBzaXplIGZvciBiYWNrZ3JvdW5kIGdsb2JlXG4gIGNvbnN0IGZpeGVkV2lkdGggPSAxODAwO1xuICBjb25zdCBmaXhlZEhlaWdodCA9IDE0MDA7XG4gIHJlbmRlcmVyLnNldFNpemUoZml4ZWRXaWR0aCwgZml4ZWRIZWlnaHQpO1xuXG4gIGNvbnN0IGdsb2JlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dsb2JlLWNvbnRhaW5lcicpO1xuICBpZiAoZ2xvYmVDb250YWluZXIpIHtcbiAgICBnbG9iZUNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICB9XG5cbiAgLy8gSW5pdGlhbGl6ZSBzY2VuZSwgbGlnaHRcbiAgc2NlbmUgPSBuZXcgU2NlbmUoKTtcbiAgc2NlbmUuYWRkKG5ldyBBbWJpZW50TGlnaHQoMHhiYmJiYmIsIDAuMykpO1xuICAvLyBSZW1vdmUgYmFja2dyb3VuZCBmb3IgdHJhbnNwYXJlbmN5XG4gIC8vIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgQ29sb3IoMHgwNDBkMjEpO1xuXG4gIC8vIEluaXRpYWxpemUgY2FtZXJhLCBsaWdodFxuICBjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoKTtcbiAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gIHZhciBkTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMC44KTtcbiAgZExpZ2h0LnBvc2l0aW9uLnNldCgtODAwLCAyMDAwLCA0MDApO1xuICBjYW1lcmEuYWRkKGRMaWdodCk7XG5cbiAgdmFyIGRMaWdodDEgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgweDc5ODJmNiwgMSk7XG4gIGRMaWdodDEucG9zaXRpb24uc2V0KC0yMDAsIDUwMCwgMjAwKTtcbiAgY2FtZXJhLmFkZChkTGlnaHQxKTtcblxuICB2YXIgZExpZ2h0MiA9IG5ldyBQb2ludExpZ2h0KDB4ODU2NmNjLCAwLjUpO1xuICBkTGlnaHQyLnBvc2l0aW9uLnNldCgtMjAwLCA1MDAsIDIwMCk7XG4gIGNhbWVyYS5hZGQoZExpZ2h0Mik7XG5cbiAgY2FtZXJhLnBvc2l0aW9uLnogPSAyNTA7XG4gIGNhbWVyYS5wb3NpdGlvbi54ID0gMDtcbiAgY2FtZXJhLnBvc2l0aW9uLnkgPSAwO1xuXG4gIHNjZW5lLmFkZChjYW1lcmEpO1xuXG4gIC8vIEFkZGl0aW9uYWwgZWZmZWN0cyAtIHJlbW92ZSBmb2cgZm9yIGNsZWFuZXIgaGVybyBsb29rXG4gIC8vIHNjZW5lLmZvZyA9IG5ldyBGb2coMHg1MzVlZjMsIDQwMCwgMjAwMCk7XG5cbiAgLy8gSGVscGVyc1xuICAvLyBjb25zdCBheGVzSGVscGVyID0gbmV3IEF4ZXNIZWxwZXIoODAwKTtcbiAgLy8gc2NlbmUuYWRkKGF4ZXNIZWxwZXIpO1xuICAvLyB2YXIgaGVscGVyID0gbmV3IERpcmVjdGlvbmFsTGlnaHRIZWxwZXIoZExpZ2h0KTtcbiAgLy8gc2NlbmUuYWRkKGhlbHBlcik7XG4gIC8vIHZhciBoZWxwZXJDYW1lcmEgPSBuZXcgQ2FtZXJhSGVscGVyKGRMaWdodC5zaGFkb3cuY2FtZXJhKTtcbiAgLy8gc2NlbmUuYWRkKGhlbHBlckNhbWVyYSk7XG5cbiAgLy8gRGlzYWJsZSBjb250cm9scyBmb3Igbm9uLXJlc3BvbnNpdmUgZ2xvYmVcbiAgY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICBjb250cm9scy5lbmFibGVkID0gZmFsc2U7XG4gIGNvbnRyb2xzLmVuYWJsZURhbXBpbmcgPSBmYWxzZTtcbiAgY29udHJvbHMuZW5hYmxlUGFuID0gZmFsc2U7XG4gIGNvbnRyb2xzLmVuYWJsZVJvdGF0ZSA9IGZhbHNlO1xuICBjb250cm9scy5lbmFibGVab29tID0gZmFsc2U7XG4gIGNvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvbldpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbn1cblxuLy8gU0VDVElPTiBHbG9iZVxuZnVuY3Rpb24gaW5pdEdsb2JlKCkge1xuICAvLyBJbml0aWFsaXplIHRoZSBHbG9iZVxuICBHbG9iZSA9IG5ldyBUaHJlZUdsb2JlKHtcbiAgICB3YWl0Rm9yR2xvYmVSZWFkeTogdHJ1ZSxcbiAgICBhbmltYXRlSW46IHRydWUsXG4gIH0pXG4gICAgLmhleFBvbHlnb25zRGF0YShjb3VudHJpZXMuZmVhdHVyZXMpXG4gICAgLmhleFBvbHlnb25SZXNvbHV0aW9uKDMpXG4gICAgLmhleFBvbHlnb25NYXJnaW4oMC43KVxuICAgIC5zaG93QXRtb3NwaGVyZSh0cnVlKVxuICAgIC5hdG1vc3BoZXJlQ29sb3IoXCIjM2EyMjhhXCIpXG4gICAgLmF0bW9zcGhlcmVBbHRpdHVkZSgwLjI1KVxuICAgIC5oZXhQb2x5Z29uQ29sb3IoKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgW1wiS0daXCIsIFwiS09SXCIsIFwiVEhBXCIsIFwiUlVTXCIsIFwiVVpCXCIsIFwiSUROXCIsIFwiS0FaXCIsIFwiTVlTXCJdLmluY2x1ZGVzKFxuICAgICAgICAgIGUucHJvcGVydGllcy5JU09fQTNcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBcInJnYmEoMjU1LDI1NSwyNTUsIDEpXCI7XG4gICAgICB9IGVsc2UgcmV0dXJuIFwicmdiYSgyNTUsMjU1LDI1NSwgMC43KVwiO1xuICAgIH0pO1xuXG4gIC8vIE5PVEUgQXJjIGFuaW1hdGlvbnMgd2l0aCBuZXR3b3JrIGNvbm5lY3Rpb25zIGFuZCB0cmF2ZWxpbmcgcHVsc2VzXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIEdsb2JlLmFyY3NEYXRhKG5ldHdvcmtDb25uZWN0aW9ucylcbiAgICAgIC5hcmNDb2xvcigoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5zdGF0dXMgPyBcIiMwMGZmODhcIiA6IFwiI2ZmNmIzNVwiOyAvLyBHcmVlbiBmb3IgYWN0aXZlLCBvcmFuZ2UgZm9yIGluYWN0aXZlXG4gICAgICB9KVxuICAgICAgLmFyY0FsdGl0dWRlKChlKSA9PiB7XG4gICAgICAgIHJldHVybiBlLmFyY0FsdDtcbiAgICAgIH0pXG4gICAgICAuYXJjU3Ryb2tlKChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2VQdWxzZSA9IE1hdGguc2luKHB1bHNhdGVUaW1lICsgZS5vcmRlciAqIDAuNSkgKiAwLjQgKyAwLjY7IC8vIEluZGl2aWR1YWwgcHVsc2UgdGltaW5nXG4gICAgICAgIHJldHVybiBlLnN0YXR1cyA/IDAuOCAqIGJhc2VQdWxzZSA6IDAuNCAqIGJhc2VQdWxzZTtcbiAgICAgIH0pXG4gICAgICAuYXJjRGFzaExlbmd0aCgwLjMpIC8vIFNob3J0ZXIgZGFzaGVzIGZvciBwdWxzZSBlZmZlY3RcbiAgICAgIC5hcmNEYXNoR2FwKDAuMSkgLy8gU21hbGxlciBnYXBzXG4gICAgICAuYXJjRGFzaEFuaW1hdGVUaW1lKDMwMDApIC8vIFNsb3dlciBwdWxzZSB0cmF2ZWxcbiAgICAgIC5hcmNzVHJhbnNpdGlvbkR1cmF0aW9uKDIwMDApXG4gICAgICAuYXJjRGFzaEluaXRpYWxHYXAoKGUpID0+IGUub3JkZXIgKiAwLjIpIC8vIFN0YWdnZXJlZCBwdWxzZSBzdGFydHNcbiAgICAgIC5wb2ludHNEYXRhKGFpcnBvcnRIaXN0b3J5LmFpcnBvcnRzKVxuICAgICAgLnBvaW50Q29sb3IoKCkgPT4gXCIjZmZmZmZmXCIpXG4gICAgICAucG9pbnRzTWVyZ2UodHJ1ZSlcbiAgICAgIC5wb2ludEFsdGl0dWRlKDAuMDcpXG4gICAgICAucG9pbnRSYWRpdXMoMC4wNSk7XG4gIH0sIDEwMDApO1xuXG4gIC8vIFNldCBpbml0aWFsIHJvdGF0aW9uIHRvIHNob3cgSW5kaWEgKFogcm90YXRpb24gZm9yIHRpbHQpXG4gIEdsb2JlLnJvdGF0aW9uLnkgPSBpbmRpYUJhc2VSb3RhdGlvbjtcbiAgR2xvYmUucm90YXRlWigtTWF0aC5QSSAvIDYpO1xuICBjb25zdCBnbG9iZU1hdGVyaWFsID0gR2xvYmUuZ2xvYmVNYXRlcmlhbCgpO1xuICBnbG9iZU1hdGVyaWFsLmNvbG9yID0gbmV3IENvbG9yKDB4M2EyMjhhKTtcbiAgZ2xvYmVNYXRlcmlhbC5lbWlzc2l2ZSA9IG5ldyBDb2xvcigweDIyMDAzOCk7XG4gIGdsb2JlTWF0ZXJpYWwuZW1pc3NpdmVJbnRlbnNpdHkgPSAwLjE7XG4gIGdsb2JlTWF0ZXJpYWwuc2hpbmluZXNzID0gMC43O1xuXG4gIC8vIE5PVEUgQ29vbCBzdHVmZlxuICAvLyBnbG9iZU1hdGVyaWFsLndpcmVmcmFtZSA9IHRydWU7XG5cbiAgc2NlbmUuYWRkKEdsb2JlKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgLy8gRGlzYWJsZSBtb3VzZSBtb3ZlbWVudCBlZmZlY3RzIGZvciBub24tcmVzcG9uc2l2ZSBnbG9iZVxuICAvLyBtb3VzZVggPSBldmVudC5jbGllbnRYIC0gd2luZG93SGFsZlg7XG4gIC8vIG1vdXNlWSA9IGV2ZW50LmNsaWVudFkgLSB3aW5kb3dIYWxmWTtcbn1cblxuZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gIC8vIEtlZXAgZ2xvYmUgYXQgbXVjaCBsYXJnZXIgZml4ZWQgc2l6ZSwgZG9uJ3QgbWFrZSBpdCByZXNwb25zaXZlXG4gIGNvbnN0IGZpeGVkV2lkdGggPSAxODAwO1xuICBjb25zdCBmaXhlZEhlaWdodCA9IDE0MDA7XG5cbiAgY2FtZXJhLmFzcGVjdCA9IGZpeGVkV2lkdGggLyBmaXhlZEhlaWdodDtcbiAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgcmVuZGVyZXIuc2V0U2l6ZShmaXhlZFdpZHRoLCBmaXhlZEhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIC8vIFJlbW92ZSBtb3VzZS1iYXNlZCBjYW1lcmEgbW92ZW1lbnQgZm9yIG5vbi1yZXNwb25zaXZlIGdsb2JlXG4gIC8vIEtlZXAgY2FtZXJhIGluIGZpeGVkIHBvc2l0aW9uXG5cbiAgLy8gQ3VzdG9tIG9zY2lsbGF0aW5nIHJvdGF0aW9uIGFyb3VuZCBJbmRpYVxuICBpZiAoR2xvYmUpIHtcbiAgICByb3RhdGlvblRpbWUgKz0gcm90YXRpb25TcGVlZCAqIDAuMDE7IC8vIFZlcnkgc2xvdyBpbmNyZW1lbnRcbiAgICBwdWxzYXRlVGltZSArPSBwdWxzYXRlU3BlZWQ7IC8vIFB1bHNhdGluZyBpbmNyZW1lbnRcbiAgICBjb25zdCBvc2NpbGxhdGlvbiA9IE1hdGguc2luKHJvdGF0aW9uVGltZSkgKiByb3RhdGlvblJhbmdlO1xuICAgIEdsb2JlLnJvdGF0aW9uLnkgPSBpbmRpYUJhc2VSb3RhdGlvbiArIG9zY2lsbGF0aW9uO1xuXG4gICAgLy8gVXBkYXRlIGFyYyBzdHJva2VzIGZvciB0cmF2ZWxpbmcgcHVsc2UgZWZmZWN0XG4gICAgR2xvYmUuYXJjU3Ryb2tlKChlKSA9PiB7XG4gICAgICBjb25zdCBpbmRpdmlkdWFsUHVsc2UgPSBNYXRoLnNpbihwdWxzYXRlVGltZSArIGUub3JkZXIgKiAwLjUpICogMC40ICsgMC42O1xuICAgICAgcmV0dXJuIGUuc3RhdHVzID8gMC44ICogaW5kaXZpZHVhbFB1bHNlIDogMC40ICogaW5kaXZpZHVhbFB1bHNlO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIGRhc2ggYW5pbWF0aW9uIGZvciB0cmF2ZWxpbmcgcHVsc2VzIHdpdGggZW5oYW5jZWQgZWZmZWN0c1xuICAgIEdsb2JlLmFyY0Rhc2hJbml0aWFsR2FwKChlKSA9PiB7XG4gICAgICBjb25zdCBzcGVlZCA9IGUuaXNJbmRpYUNvbm5lY3Rpb24gPyAwLjE1IDogMC4wODsgLy8gRmFzdGVyIGZvciBJbmRpYSBjb25uZWN0aW9uc1xuICAgICAgY29uc3QgdHJhdmVsaW5nUHVsc2UgPSAocHVsc2F0ZVRpbWUgKiBzcGVlZCArIGUub3JkZXIgKiAwLjIpICUgMTtcbiAgICAgIHJldHVybiB0cmF2ZWxpbmdQdWxzZTtcbiAgICB9KTtcblxuICAgIC8vIFNpbXBsaWZpZWQgLSByZW1vdmUgY29tcGxleCBhcmMgbGFiZWxzIGZvciBub3dcbiAgfVxuXG4gIGNhbWVyYS5sb29rQXQoc2NlbmUucG9zaXRpb24pO1xuICBjb250cm9scy51cGRhdGUoKTtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiBcIjg1ZmQzZTQ4ZjViNmEyOTAyZjg0XCIiXSwic291cmNlUm9vdCI6IiJ9