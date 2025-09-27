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

// Network connections data - create connected lines between major countries
const networkConnections = [
  // India as central hub
  { startLat: 28.6139, startLng: 77.2090, endLat: 40.7128, endLng: -74.0060, order: 0 }, // India to USA
  { startLat: 28.6139, startLng: 77.2090, endLat: 51.5074, endLng: -0.1278, order: 1 }, // India to UK
  { startLat: 28.6139, startLng: 77.2090, endLat: 35.6762, endLng: 139.6503, order: 2 }, // India to Japan
  { startLat: 28.6139, startLng: 77.2090, endLat: -33.8688, endLng: 151.2093, order: 3 }, // India to Australia
  { startLat: 28.6139, startLng: 77.2090, endLat: 55.7558, endLng: 37.6176, order: 4 }, // India to Russia
  { startLat: 28.6139, startLng: 77.2090, endLat: 39.9042, endLng: 116.4074, order: 5 }, // India to China
  { startLat: 28.6139, startLng: 77.2090, endLat: 52.5200, endLng: 13.4050, order: 6 }, // India to Germany
  { startLat: 28.6139, startLng: 77.2090, endLat: 1.3521, endLng: 103.8198, order: 7 }, // India to Singapore
  { startLat: 28.6139, startLng: 77.2090, endLat: 25.2048, endLng: 55.2708, order: 8 }, // India to UAE

  // Cross connections between other major hubs
  { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278, order: 9 }, // USA to UK
  { startLat: 40.7128, startLng: -74.0060, endLat: 35.6762, endLng: 139.6503, order: 10 }, // USA to Japan
  { startLat: 51.5074, startLng: -0.1278, endLat: 52.5200, endLng: 13.4050, order: 11 }, // UK to Germany
  { startLat: 35.6762, startLng: 139.6503, endLat: 1.3521, endLng: 103.8198, order: 12 }, // Japan to Singapore
  { startLat: 39.9042, startLng: 116.4074, endLat: 35.6762, endLng: 139.6503, order: 13 }, // China to Japan
].map(conn => ({
  ...conn,
  arcAlt: 0.1 + Math.random() * 0.2, // Random altitude between 0.1-0.3
  status: Math.random() > 0.2 // 80% active connections
}));

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

    // Update dash animation for traveling pulses
    Globe.arcDashInitialGap((e) => {
      const travelingPulse = (pulsateTime * 0.1 + e.order * 0.2) % 1;
      return travelingPulse;
    });
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
/******/ 		__webpack_require__.h = () => "cfe97d4a1cfa9e88f33e"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRyxvRkFBb0Y7QUFDdkYsR0FBRyxtRkFBbUY7QUFDdEYsR0FBRyxvRkFBb0Y7QUFDdkYsR0FBRyxxRkFBcUY7QUFDeEYsR0FBRyxtRkFBbUY7QUFDdEYsR0FBRyxvRkFBb0Y7QUFDdkYsR0FBRyxtRkFBbUY7QUFDdEYsR0FBRyxtRkFBbUY7QUFDdEYsR0FBRyxtRkFBbUY7O0FBRXRGO0FBQ0EsR0FBRyxvRkFBb0Y7QUFDdkYsR0FBRyxzRkFBc0Y7QUFDekYsR0FBRyxvRkFBb0Y7QUFDdkYsR0FBRyxxRkFBcUY7QUFDeEYsR0FBRyxzRkFBc0Y7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnREFBYSxFQUFFLCtCQUErQjtBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLHdDQUFLO0FBQ25CLGdCQUFnQiwrQ0FBWTtBQUM1QjtBQUNBOztBQUVBO0FBQ0EsZUFBZSxvREFBaUI7QUFDaEM7QUFDQTs7QUFFQSxtQkFBbUIsbURBQWdCO0FBQ25DO0FBQ0E7O0FBRUEsb0JBQW9CLG1EQUFnQjtBQUNwQztBQUNBOztBQUVBLG9CQUFvQiw2Q0FBVTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHVGQUFhO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnREFBVTtBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNILHFCQUFxQixnRUFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2REFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdDQUFLO0FBQ2pDLCtCQUErQix3Q0FBSztBQUNwQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLGdDQUFnQztBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztXQ3RQQSxvRCIsImZpbGUiOiJtYWluLjFhMmY5YmQ3ZjEwYzYyYjQ1M2IxLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGhyZWVHbG9iZSBmcm9tIFwidGhyZWUtZ2xvYmVcIjtcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXIsIFNjZW5lIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQge1xuICBQZXJzcGVjdGl2ZUNhbWVyYSxcbiAgQW1iaWVudExpZ2h0LFxuICBEaXJlY3Rpb25hbExpZ2h0LFxuICBDb2xvcixcbiAgRm9nLFxuICAvLyBBeGVzSGVscGVyLFxuICAvLyBEaXJlY3Rpb25hbExpZ2h0SGVscGVyLFxuICAvLyBDYW1lcmFIZWxwZXIsXG4gIFBvaW50TGlnaHQsXG4gIFNwaGVyZUdlb21ldHJ5LFxufSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdsb3dNZXNoIH0gZnJvbSBcInRocmVlLWdsb3ctbWVzaFwiO1xuaW1wb3J0IGNvdW50cmllcyBmcm9tIFwiLi9maWxlcy9nbG9iZS1kYXRhLW1pbi5qc29uXCI7XG5pbXBvcnQgdHJhdmVsSGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1mbGlnaHRzLmpzb25cIjtcbmltcG9ydCBhaXJwb3J0SGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1haXJwb3J0cy5qc29uXCI7XG52YXIgcmVuZGVyZXIsIGNhbWVyYSwgc2NlbmUsIGNvbnRyb2xzO1xubGV0IG1vdXNlWCA9IDA7XG5sZXQgbW91c2VZID0gMDtcbmxldCB3aW5kb3dIYWxmWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbmxldCB3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG52YXIgR2xvYmU7XG5cbi8vIEdsb2JlIHJvdGF0aW9uIHZhcmlhYmxlc1xubGV0IHJvdGF0aW9uVGltZSA9IDA7XG5jb25zdCByb3RhdGlvblNwZWVkID0gMC4xOyAvLyBFdmVuIHNsb3dlciByb3RhdGlvblxuY29uc3Qgcm90YXRpb25SYW5nZSA9IDAuMzsgLy8gSG93IGZhciBpdCByb3RhdGVzIChpbiByYWRpYW5zKVxuY29uc3QgaW5kaWFCYXNlUm90YXRpb24gPSAtTWF0aC5QSSAqICg1IC8gOSk7IC8vIEJhc2Ugcm90YXRpb24gdG8gc2hvdyBJbmRpYVxuXG4vLyBQdWxzYXRpbmcgYW5pbWF0aW9uIHZhcmlhYmxlc1xubGV0IHB1bHNhdGVUaW1lID0gMDtcbmNvbnN0IHB1bHNhdGVTcGVlZCA9IDAuMDI7XG5cbi8vIE5ldHdvcmsgY29ubmVjdGlvbnMgZGF0YSAtIGNyZWF0ZSBjb25uZWN0ZWQgbGluZXMgYmV0d2VlbiBtYWpvciBjb3VudHJpZXNcbmNvbnN0IG5ldHdvcmtDb25uZWN0aW9ucyA9IFtcbiAgLy8gSW5kaWEgYXMgY2VudHJhbCBodWJcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogNDAuNzEyOCwgZW5kTG5nOiAtNzQuMDA2MCwgb3JkZXI6IDAgfSwgLy8gSW5kaWEgdG8gVVNBXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDUxLjUwNzQsIGVuZExuZzogLTAuMTI3OCwgb3JkZXI6IDEgfSwgLy8gSW5kaWEgdG8gVUtcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogMzUuNjc2MiwgZW5kTG5nOiAxMzkuNjUwMywgb3JkZXI6IDIgfSwgLy8gSW5kaWEgdG8gSmFwYW5cbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogLTMzLjg2ODgsIGVuZExuZzogMTUxLjIwOTMsIG9yZGVyOiAzIH0sIC8vIEluZGlhIHRvIEF1c3RyYWxpYVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiA1NS43NTU4LCBlbmRMbmc6IDM3LjYxNzYsIG9yZGVyOiA0IH0sIC8vIEluZGlhIHRvIFJ1c3NpYVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiAzOS45MDQyLCBlbmRMbmc6IDExNi40MDc0LCBvcmRlcjogNSB9LCAvLyBJbmRpYSB0byBDaGluYVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiA1Mi41MjAwLCBlbmRMbmc6IDEzLjQwNTAsIG9yZGVyOiA2IH0sIC8vIEluZGlhIHRvIEdlcm1hbnlcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogMS4zNTIxLCBlbmRMbmc6IDEwMy44MTk4LCBvcmRlcjogNyB9LCAvLyBJbmRpYSB0byBTaW5nYXBvcmVcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogMjUuMjA0OCwgZW5kTG5nOiA1NS4yNzA4LCBvcmRlcjogOCB9LCAvLyBJbmRpYSB0byBVQUVcblxuICAvLyBDcm9zcyBjb25uZWN0aW9ucyBiZXR3ZWVuIG90aGVyIG1ham9yIGh1YnNcbiAgeyBzdGFydExhdDogNDAuNzEyOCwgc3RhcnRMbmc6IC03NC4wMDYwLCBlbmRMYXQ6IDUxLjUwNzQsIGVuZExuZzogLTAuMTI3OCwgb3JkZXI6IDkgfSwgLy8gVVNBIHRvIFVLXG4gIHsgc3RhcnRMYXQ6IDQwLjcxMjgsIHN0YXJ0TG5nOiAtNzQuMDA2MCwgZW5kTGF0OiAzNS42NzYyLCBlbmRMbmc6IDEzOS42NTAzLCBvcmRlcjogMTAgfSwgLy8gVVNBIHRvIEphcGFuXG4gIHsgc3RhcnRMYXQ6IDUxLjUwNzQsIHN0YXJ0TG5nOiAtMC4xMjc4LCBlbmRMYXQ6IDUyLjUyMDAsIGVuZExuZzogMTMuNDA1MCwgb3JkZXI6IDExIH0sIC8vIFVLIHRvIEdlcm1hbnlcbiAgeyBzdGFydExhdDogMzUuNjc2Miwgc3RhcnRMbmc6IDEzOS42NTAzLCBlbmRMYXQ6IDEuMzUyMSwgZW5kTG5nOiAxMDMuODE5OCwgb3JkZXI6IDEyIH0sIC8vIEphcGFuIHRvIFNpbmdhcG9yZVxuICB7IHN0YXJ0TGF0OiAzOS45MDQyLCBzdGFydExuZzogMTE2LjQwNzQsIGVuZExhdDogMzUuNjc2MiwgZW5kTG5nOiAxMzkuNjUwMywgb3JkZXI6IDEzIH0sIC8vIENoaW5hIHRvIEphcGFuXG5dLm1hcChjb25uID0+ICh7XG4gIC4uLmNvbm4sXG4gIGFyY0FsdDogMC4xICsgTWF0aC5yYW5kb20oKSAqIDAuMiwgLy8gUmFuZG9tIGFsdGl0dWRlIGJldHdlZW4gMC4xLTAuM1xuICBzdGF0dXM6IE1hdGgucmFuZG9tKCkgPiAwLjIgLy8gODAlIGFjdGl2ZSBjb25uZWN0aW9uc1xufSkpO1xuXG5pbml0KCk7XG5pbml0R2xvYmUoKTtcbm9uV2luZG93UmVzaXplKCk7XG5hbmltYXRlKCk7XG5cbi8vIFNFQ1RJT04gSW5pdGlhbGl6aW5nIGNvcmUgVGhyZWVKUyBlbGVtZW50c1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy8gSW5pdGlhbGl6ZSByZW5kZXJlclxuICByZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlLCBhbHBoYTogdHJ1ZSB9KTtcbiAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHgwMDAwMDAsIDApO1xuICAvLyByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZztcblxuICAvLyBTZXQgbXVjaCBsYXJnZXIgZml4ZWQgc2l6ZSBmb3IgYmFja2dyb3VuZCBnbG9iZVxuICBjb25zdCBmaXhlZFdpZHRoID0gMTgwMDtcbiAgY29uc3QgZml4ZWRIZWlnaHQgPSAxNDAwO1xuICByZW5kZXJlci5zZXRTaXplKGZpeGVkV2lkdGgsIGZpeGVkSGVpZ2h0KTtcblxuICBjb25zdCBnbG9iZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnbG9iZS1jb250YWluZXInKTtcbiAgaWYgKGdsb2JlQ29udGFpbmVyKSB7XG4gICAgZ2xvYmVDb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgc2NlbmUsIGxpZ2h0XG4gIHNjZW5lID0gbmV3IFNjZW5lKCk7XG4gIHNjZW5lLmFkZChuZXcgQW1iaWVudExpZ2h0KDB4YmJiYmJiLCAwLjMpKTtcbiAgLy8gUmVtb3ZlIGJhY2tncm91bmQgZm9yIHRyYW5zcGFyZW5jeVxuICAvLyBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IENvbG9yKDB4MDQwZDIxKTtcblxuICAvLyBJbml0aWFsaXplIGNhbWVyYSwgbGlnaHRcbiAgY2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICB2YXIgZExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDAuOCk7XG4gIGRMaWdodC5wb3NpdGlvbi5zZXQoLTgwMCwgMjAwMCwgNDAwKTtcbiAgY2FtZXJhLmFkZChkTGlnaHQpO1xuXG4gIHZhciBkTGlnaHQxID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHg3OTgyZjYsIDEpO1xuICBkTGlnaHQxLnBvc2l0aW9uLnNldCgtMjAwLCA1MDAsIDIwMCk7XG4gIGNhbWVyYS5hZGQoZExpZ2h0MSk7XG5cbiAgdmFyIGRMaWdodDIgPSBuZXcgUG9pbnRMaWdodCgweDg1NjZjYywgMC41KTtcbiAgZExpZ2h0Mi5wb3NpdGlvbi5zZXQoLTIwMCwgNTAwLCAyMDApO1xuICBjYW1lcmEuYWRkKGRMaWdodDIpO1xuXG4gIGNhbWVyYS5wb3NpdGlvbi56ID0gMjUwO1xuICBjYW1lcmEucG9zaXRpb24ueCA9IDA7XG4gIGNhbWVyYS5wb3NpdGlvbi55ID0gMDtcblxuICBzY2VuZS5hZGQoY2FtZXJhKTtcblxuICAvLyBBZGRpdGlvbmFsIGVmZmVjdHMgLSByZW1vdmUgZm9nIGZvciBjbGVhbmVyIGhlcm8gbG9va1xuICAvLyBzY2VuZS5mb2cgPSBuZXcgRm9nKDB4NTM1ZWYzLCA0MDAsIDIwMDApO1xuXG4gIC8vIEhlbHBlcnNcbiAgLy8gY29uc3QgYXhlc0hlbHBlciA9IG5ldyBBeGVzSGVscGVyKDgwMCk7XG4gIC8vIHNjZW5lLmFkZChheGVzSGVscGVyKTtcbiAgLy8gdmFyIGhlbHBlciA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0SGVscGVyKGRMaWdodCk7XG4gIC8vIHNjZW5lLmFkZChoZWxwZXIpO1xuICAvLyB2YXIgaGVscGVyQ2FtZXJhID0gbmV3IENhbWVyYUhlbHBlcihkTGlnaHQuc2hhZG93LmNhbWVyYSk7XG4gIC8vIHNjZW5lLmFkZChoZWxwZXJDYW1lcmEpO1xuXG4gIC8vIERpc2FibGUgY29udHJvbHMgZm9yIG5vbi1yZXNwb25zaXZlIGdsb2JlXG4gIGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcbiAgY29udHJvbHMuZW5hYmxlZCA9IGZhbHNlO1xuICBjb250cm9scy5lbmFibGVEYW1waW5nID0gZmFsc2U7XG4gIGNvbnRyb2xzLmVuYWJsZVBhbiA9IGZhbHNlO1xuICBjb250cm9scy5lbmFibGVSb3RhdGUgPSBmYWxzZTtcbiAgY29udHJvbHMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICBjb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25XaW5kb3dSZXNpemUsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG59XG5cbi8vIFNFQ1RJT04gR2xvYmVcbmZ1bmN0aW9uIGluaXRHbG9iZSgpIHtcbiAgLy8gSW5pdGlhbGl6ZSB0aGUgR2xvYmVcbiAgR2xvYmUgPSBuZXcgVGhyZWVHbG9iZSh7XG4gICAgd2FpdEZvckdsb2JlUmVhZHk6IHRydWUsXG4gICAgYW5pbWF0ZUluOiB0cnVlLFxuICB9KVxuICAgIC5oZXhQb2x5Z29uc0RhdGEoY291bnRyaWVzLmZlYXR1cmVzKVxuICAgIC5oZXhQb2x5Z29uUmVzb2x1dGlvbigzKVxuICAgIC5oZXhQb2x5Z29uTWFyZ2luKDAuNylcbiAgICAuc2hvd0F0bW9zcGhlcmUodHJ1ZSlcbiAgICAuYXRtb3NwaGVyZUNvbG9yKFwiIzNhMjI4YVwiKVxuICAgIC5hdG1vc3BoZXJlQWx0aXR1ZGUoMC4yNSlcbiAgICAuaGV4UG9seWdvbkNvbG9yKChlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIFtcIktHWlwiLCBcIktPUlwiLCBcIlRIQVwiLCBcIlJVU1wiLCBcIlVaQlwiLCBcIklETlwiLCBcIktBWlwiLCBcIk1ZU1wiXS5pbmNsdWRlcyhcbiAgICAgICAgICBlLnByb3BlcnRpZXMuSVNPX0EzXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKDI1NSwyNTUsMjU1LCAxKVwiO1xuICAgICAgfSBlbHNlIHJldHVybiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNylcIjtcbiAgICB9KTtcblxuICAvLyBOT1RFIEFyYyBhbmltYXRpb25zIHdpdGggbmV0d29yayBjb25uZWN0aW9ucyBhbmQgdHJhdmVsaW5nIHB1bHNlc1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBHbG9iZS5hcmNzRGF0YShuZXR3b3JrQ29ubmVjdGlvbnMpXG4gICAgICAuYXJjQ29sb3IoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUuc3RhdHVzID8gXCIjMDBmZjg4XCIgOiBcIiNmZjZiMzVcIjsgLy8gR3JlZW4gZm9yIGFjdGl2ZSwgb3JhbmdlIGZvciBpbmFjdGl2ZVxuICAgICAgfSlcbiAgICAgIC5hcmNBbHRpdHVkZSgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5hcmNBbHQ7XG4gICAgICB9KVxuICAgICAgLmFyY1N0cm9rZSgoZSkgPT4ge1xuICAgICAgICBjb25zdCBiYXNlUHVsc2UgPSBNYXRoLnNpbihwdWxzYXRlVGltZSArIGUub3JkZXIgKiAwLjUpICogMC40ICsgMC42OyAvLyBJbmRpdmlkdWFsIHB1bHNlIHRpbWluZ1xuICAgICAgICByZXR1cm4gZS5zdGF0dXMgPyAwLjggKiBiYXNlUHVsc2UgOiAwLjQgKiBiYXNlUHVsc2U7XG4gICAgICB9KVxuICAgICAgLmFyY0Rhc2hMZW5ndGgoMC4zKSAvLyBTaG9ydGVyIGRhc2hlcyBmb3IgcHVsc2UgZWZmZWN0XG4gICAgICAuYXJjRGFzaEdhcCgwLjEpIC8vIFNtYWxsZXIgZ2Fwc1xuICAgICAgLmFyY0Rhc2hBbmltYXRlVGltZSgzMDAwKSAvLyBTbG93ZXIgcHVsc2UgdHJhdmVsXG4gICAgICAuYXJjc1RyYW5zaXRpb25EdXJhdGlvbigyMDAwKVxuICAgICAgLmFyY0Rhc2hJbml0aWFsR2FwKChlKSA9PiBlLm9yZGVyICogMC4yKSAvLyBTdGFnZ2VyZWQgcHVsc2Ugc3RhcnRzXG4gICAgICAucG9pbnRzRGF0YShhaXJwb3J0SGlzdG9yeS5haXJwb3J0cylcbiAgICAgIC5wb2ludENvbG9yKCgpID0+IFwiI2ZmZmZmZlwiKVxuICAgICAgLnBvaW50c01lcmdlKHRydWUpXG4gICAgICAucG9pbnRBbHRpdHVkZSgwLjA3KVxuICAgICAgLnBvaW50UmFkaXVzKDAuMDUpO1xuICB9LCAxMDAwKTtcblxuICAvLyBTZXQgaW5pdGlhbCByb3RhdGlvbiB0byBzaG93IEluZGlhIChaIHJvdGF0aW9uIGZvciB0aWx0KVxuICBHbG9iZS5yb3RhdGlvbi55ID0gaW5kaWFCYXNlUm90YXRpb247XG4gIEdsb2JlLnJvdGF0ZVooLU1hdGguUEkgLyA2KTtcbiAgY29uc3QgZ2xvYmVNYXRlcmlhbCA9IEdsb2JlLmdsb2JlTWF0ZXJpYWwoKTtcbiAgZ2xvYmVNYXRlcmlhbC5jb2xvciA9IG5ldyBDb2xvcigweDNhMjI4YSk7XG4gIGdsb2JlTWF0ZXJpYWwuZW1pc3NpdmUgPSBuZXcgQ29sb3IoMHgyMjAwMzgpO1xuICBnbG9iZU1hdGVyaWFsLmVtaXNzaXZlSW50ZW5zaXR5ID0gMC4xO1xuICBnbG9iZU1hdGVyaWFsLnNoaW5pbmVzcyA9IDAuNztcblxuICAvLyBOT1RFIENvb2wgc3R1ZmZcbiAgLy8gZ2xvYmVNYXRlcmlhbC53aXJlZnJhbWUgPSB0cnVlO1xuXG4gIHNjZW5lLmFkZChHbG9iZSk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gIC8vIERpc2FibGUgbW91c2UgbW92ZW1lbnQgZWZmZWN0cyBmb3Igbm9uLXJlc3BvbnNpdmUgZ2xvYmVcbiAgLy8gbW91c2VYID0gZXZlbnQuY2xpZW50WCAtIHdpbmRvd0hhbGZYO1xuICAvLyBtb3VzZVkgPSBldmVudC5jbGllbnRZIC0gd2luZG93SGFsZlk7XG59XG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuICAvLyBLZWVwIGdsb2JlIGF0IG11Y2ggbGFyZ2VyIGZpeGVkIHNpemUsIGRvbid0IG1ha2UgaXQgcmVzcG9uc2l2ZVxuICBjb25zdCBmaXhlZFdpZHRoID0gMTgwMDtcbiAgY29uc3QgZml4ZWRIZWlnaHQgPSAxNDAwO1xuXG4gIGNhbWVyYS5hc3BlY3QgPSBmaXhlZFdpZHRoIC8gZml4ZWRIZWlnaHQ7XG4gIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIHJlbmRlcmVyLnNldFNpemUoZml4ZWRXaWR0aCwgZml4ZWRIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICAvLyBSZW1vdmUgbW91c2UtYmFzZWQgY2FtZXJhIG1vdmVtZW50IGZvciBub24tcmVzcG9uc2l2ZSBnbG9iZVxuICAvLyBLZWVwIGNhbWVyYSBpbiBmaXhlZCBwb3NpdGlvblxuXG4gIC8vIEN1c3RvbSBvc2NpbGxhdGluZyByb3RhdGlvbiBhcm91bmQgSW5kaWFcbiAgaWYgKEdsb2JlKSB7XG4gICAgcm90YXRpb25UaW1lICs9IHJvdGF0aW9uU3BlZWQgKiAwLjAxOyAvLyBWZXJ5IHNsb3cgaW5jcmVtZW50XG4gICAgcHVsc2F0ZVRpbWUgKz0gcHVsc2F0ZVNwZWVkOyAvLyBQdWxzYXRpbmcgaW5jcmVtZW50XG4gICAgY29uc3Qgb3NjaWxsYXRpb24gPSBNYXRoLnNpbihyb3RhdGlvblRpbWUpICogcm90YXRpb25SYW5nZTtcbiAgICBHbG9iZS5yb3RhdGlvbi55ID0gaW5kaWFCYXNlUm90YXRpb24gKyBvc2NpbGxhdGlvbjtcblxuICAgIC8vIFVwZGF0ZSBhcmMgc3Ryb2tlcyBmb3IgdHJhdmVsaW5nIHB1bHNlIGVmZmVjdFxuICAgIEdsb2JlLmFyY1N0cm9rZSgoZSkgPT4ge1xuICAgICAgY29uc3QgaW5kaXZpZHVhbFB1bHNlID0gTWF0aC5zaW4ocHVsc2F0ZVRpbWUgKyBlLm9yZGVyICogMC41KSAqIDAuNCArIDAuNjtcbiAgICAgIHJldHVybiBlLnN0YXR1cyA/IDAuOCAqIGluZGl2aWR1YWxQdWxzZSA6IDAuNCAqIGluZGl2aWR1YWxQdWxzZTtcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSBkYXNoIGFuaW1hdGlvbiBmb3IgdHJhdmVsaW5nIHB1bHNlc1xuICAgIEdsb2JlLmFyY0Rhc2hJbml0aWFsR2FwKChlKSA9PiB7XG4gICAgICBjb25zdCB0cmF2ZWxpbmdQdWxzZSA9IChwdWxzYXRlVGltZSAqIDAuMSArIGUub3JkZXIgKiAwLjIpICUgMTtcbiAgICAgIHJldHVybiB0cmF2ZWxpbmdQdWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbWVyYS5sb29rQXQoc2NlbmUucG9zaXRpb24pO1xuICBjb250cm9scy51cGRhdGUoKTtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiBcImNmZTk3ZDRhMWNmYTllODhmMzNlXCIiXSwic291cmNlUm9vdCI6IiJ9