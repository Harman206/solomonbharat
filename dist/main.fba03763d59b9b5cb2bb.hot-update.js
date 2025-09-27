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
      .pointsData(indianHubs)
      .pointColor((d) => {
        // Color code by industry
        if (d.industry.includes('Textiles')) return '#ff6b6b';
        if (d.industry.includes('Electronics')) return '#4ecdc4';
        if (d.industry.includes('Automotive')) return '#45b7d1';
        if (d.industry.includes('Pharmaceuticals')) return '#96ceb4';
        if (d.industry.includes('Chemicals')) return '#ffeaa7';
        return '#dda0dd';
      })
      .pointsMerge(false)
      .pointAltitude(0.05)
      .pointRadius((d) => Math.max(0.02, d.suppliers / 50000)) // Size based on supplier count
      .pointLabel((d) => `
        <div style="background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px; color: white; font-size: 12px;">
          <strong>${d.name}</strong><br/>
          Industry: ${d.industry}<br/>
          Suppliers: ${d.suppliers.toLocaleString()}
        </div>
      `);
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

    // Add arc labels for major connections
    Globe.arcLabel((d) => {
      if (d.isIndiaConnection && Math.random() > 0.7) { // Show labels occasionally
        return `
          <div style="background: rgba(0,0,0,0.7); padding: 5px; border-radius: 3px; color: white; font-size: 10px;">
            ${d.name}<br/>
            Volume: ${d.volume}
          </div>
        `;
      }
      return '';
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
/******/ 		__webpack_require__.h = () => "3986d97b42ae8e1d1c59"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRyx3SEFBd0g7QUFDM0gsR0FBRyxzSEFBc0g7QUFDekgsR0FBRywwSEFBMEg7QUFDN0gsR0FBRywrSEFBK0g7QUFDbEksR0FBRywySEFBMkg7QUFDOUgsR0FBRyw2SEFBNkg7QUFDaEksR0FBRyx1SEFBdUg7QUFDMUgsR0FBRywySEFBMkg7QUFDOUgsR0FBRywwSEFBMEg7O0FBRTdIO0FBQ0EsR0FBRyxvSEFBb0g7QUFDdkgsR0FBRyx3SEFBd0g7QUFDM0gsR0FBRyw4SEFBOEg7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEdBQUcsZ0dBQWdHO0FBQ25HLEdBQUcsNkZBQTZGO0FBQ2hHLEdBQUcsNEZBQTRGO0FBQy9GLEdBQUcsbUdBQW1HO0FBQ3RHLEdBQUcsaUdBQWlHO0FBQ3BHLEdBQUcsMEZBQTBGO0FBQzdGLEdBQUcsbUdBQW1HO0FBQ3RHLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0RBQWEsRUFBRSwrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsY0FBYyx3Q0FBSztBQUNuQixnQkFBZ0IsK0NBQVk7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLGVBQWUsb0RBQWlCO0FBQ2hDO0FBQ0E7O0FBRUEsbUJBQW1CLG1EQUFnQjtBQUNuQztBQUNBOztBQUVBLG9CQUFvQixtREFBZ0I7QUFDcEM7QUFDQTs7QUFFQSxvQkFBb0IsNkNBQVU7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1RkFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0RBQVU7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSCxxQkFBcUIsZ0VBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsZUFBZSxvQkFBb0IsY0FBYyxpQkFBaUI7QUFDbEgsb0JBQW9CLE9BQU87QUFDM0Isc0JBQXNCLFdBQVc7QUFDakMsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdDQUFLO0FBQ2pDLCtCQUErQix3Q0FBSztBQUNwQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLGdDQUFnQztBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQSxrREFBa0QsY0FBYyxvQkFBb0IsY0FBYyxpQkFBaUI7QUFDbkgsY0FBYyxPQUFPO0FBQ3JCLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztXQzlSQSxvRCIsImZpbGUiOiJtYWluLmZiYTAzNzYzZDU5YjliNWNiMmJiLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGhyZWVHbG9iZSBmcm9tIFwidGhyZWUtZ2xvYmVcIjtcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXIsIFNjZW5lIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQge1xuICBQZXJzcGVjdGl2ZUNhbWVyYSxcbiAgQW1iaWVudExpZ2h0LFxuICBEaXJlY3Rpb25hbExpZ2h0LFxuICBDb2xvcixcbiAgRm9nLFxuICAvLyBBeGVzSGVscGVyLFxuICAvLyBEaXJlY3Rpb25hbExpZ2h0SGVscGVyLFxuICAvLyBDYW1lcmFIZWxwZXIsXG4gIFBvaW50TGlnaHQsXG4gIFNwaGVyZUdlb21ldHJ5LFxufSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdsb3dNZXNoIH0gZnJvbSBcInRocmVlLWdsb3ctbWVzaFwiO1xuaW1wb3J0IGNvdW50cmllcyBmcm9tIFwiLi9maWxlcy9nbG9iZS1kYXRhLW1pbi5qc29uXCI7XG5pbXBvcnQgdHJhdmVsSGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1mbGlnaHRzLmpzb25cIjtcbmltcG9ydCBhaXJwb3J0SGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1haXJwb3J0cy5qc29uXCI7XG52YXIgcmVuZGVyZXIsIGNhbWVyYSwgc2NlbmUsIGNvbnRyb2xzO1xubGV0IG1vdXNlWCA9IDA7XG5sZXQgbW91c2VZID0gMDtcbmxldCB3aW5kb3dIYWxmWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbmxldCB3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG52YXIgR2xvYmU7XG5cbi8vIEdsb2JlIHJvdGF0aW9uIHZhcmlhYmxlc1xubGV0IHJvdGF0aW9uVGltZSA9IDA7XG5jb25zdCByb3RhdGlvblNwZWVkID0gMC4xOyAvLyBFdmVuIHNsb3dlciByb3RhdGlvblxuY29uc3Qgcm90YXRpb25SYW5nZSA9IDAuMzsgLy8gSG93IGZhciBpdCByb3RhdGVzIChpbiByYWRpYW5zKVxuY29uc3QgaW5kaWFCYXNlUm90YXRpb24gPSAtTWF0aC5QSSAqICg1IC8gOSk7IC8vIEJhc2Ugcm90YXRpb24gdG8gc2hvdyBJbmRpYVxuXG4vLyBQdWxzYXRpbmcgYW5pbWF0aW9uIHZhcmlhYmxlc1xubGV0IHB1bHNhdGVUaW1lID0gMDtcbmNvbnN0IHB1bHNhdGVTcGVlZCA9IDAuMDI7XG5cbi8vIEVuaGFuY2VkIG5ldHdvcmsgY29ubmVjdGlvbnMgZGF0YSB3aXRoIHN1cHBsaWVyIGh1YiBpbmZvcm1hdGlvblxuY29uc3QgbmV0d29ya0Nvbm5lY3Rpb25zID0gW1xuICAvLyBJbmRpYSBhcyBjZW50cmFsIGh1YiAtIGNvbm5lY3RpbmcgdG8gbWFqb3IgYnV5ZXIgY291bnRyaWVzXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDQwLjcxMjgsIGVuZExuZzogLTc0LjAwNjAsIG9yZGVyOiAwLCBuYW1lOiBcIkluZGlhLVVTQVwiLCB2b2x1bWU6IFwiJDQ1ME1cIiB9LCAvLyBJbmRpYSB0byBVU0FcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogNTEuNTA3NCwgZW5kTG5nOiAtMC4xMjc4LCBvcmRlcjogMSwgbmFtZTogXCJJbmRpYS1VS1wiLCB2b2x1bWU6IFwiJDMyME1cIiB9LCAvLyBJbmRpYSB0byBVS1xuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiAzNS42NzYyLCBlbmRMbmc6IDEzOS42NTAzLCBvcmRlcjogMiwgbmFtZTogXCJJbmRpYS1KYXBhblwiLCB2b2x1bWU6IFwiJDI4ME1cIiB9LCAvLyBJbmRpYSB0byBKYXBhblxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiAtMzMuODY4OCwgZW5kTG5nOiAxNTEuMjA5Mywgb3JkZXI6IDMsIG5hbWU6IFwiSW5kaWEtQXVzdHJhbGlhXCIsIHZvbHVtZTogXCIkMTgwTVwiIH0sIC8vIEluZGlhIHRvIEF1c3RyYWxpYVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiA1Mi41MjAwLCBlbmRMbmc6IDEzLjQwNTAsIG9yZGVyOiA0LCBuYW1lOiBcIkluZGlhLUdlcm1hbnlcIiwgdm9sdW1lOiBcIiQzOTBNXCIgfSwgLy8gSW5kaWEgdG8gR2VybWFueVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiAxLjM1MjEsIGVuZExuZzogMTAzLjgxOTgsIG9yZGVyOiA1LCBuYW1lOiBcIkluZGlhLVNpbmdhcG9yZVwiLCB2b2x1bWU6IFwiJDE1ME1cIiB9LCAvLyBJbmRpYSB0byBTaW5nYXBvcmVcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogMjUuMjA0OCwgZW5kTG5nOiA1NS4yNzA4LCBvcmRlcjogNiwgbmFtZTogXCJJbmRpYS1VQUVcIiwgdm9sdW1lOiBcIiQyMjBNXCIgfSwgLy8gSW5kaWEgdG8gVUFFXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDQzLjY1MzIsIGVuZExuZzogLTc5LjM4MzIsIG9yZGVyOiA3LCBuYW1lOiBcIkluZGlhLUNhbmFkYVwiLCB2b2x1bWU6IFwiJDE2ME1cIiB9LCAvLyBJbmRpYSB0byBDYW5hZGFcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogNTUuNzU1OCwgZW5kTG5nOiAzNy42MTc2LCBvcmRlcjogOCwgbmFtZTogXCJJbmRpYS1SdXNzaWFcIiwgdm9sdW1lOiBcIiQxMjBNXCIgfSwgLy8gSW5kaWEgdG8gUnVzc2lhXG5cbiAgLy8gU2Vjb25kYXJ5IGNvbm5lY3Rpb25zIGJldHdlZW4gYnV5ZXIgY291bnRyaWVzXG4gIHsgc3RhcnRMYXQ6IDQwLjcxMjgsIHN0YXJ0TG5nOiAtNzQuMDA2MCwgZW5kTGF0OiA1MS41MDc0LCBlbmRMbmc6IC0wLjEyNzgsIG9yZGVyOiA5LCBuYW1lOiBcIlVTQS1VS1wiLCB2b2x1bWU6IFwiJDgwTVwiIH0sIC8vIFVTQSB0byBVS1xuICB7IHN0YXJ0TGF0OiA1MS41MDc0LCBzdGFydExuZzogLTAuMTI3OCwgZW5kTGF0OiA1Mi41MjAwLCBlbmRMbmc6IDEzLjQwNTAsIG9yZGVyOiAxMCwgbmFtZTogXCJVSy1HZXJtYW55XCIsIHZvbHVtZTogXCIkNjBNXCIgfSwgLy8gVUsgdG8gR2VybWFueVxuICB7IHN0YXJ0TGF0OiAzNS42NzYyLCBzdGFydExuZzogMTM5LjY1MDMsIGVuZExhdDogMS4zNTIxLCBlbmRMbmc6IDEwMy44MTk4LCBvcmRlcjogMTEsIG5hbWU6IFwiSmFwYW4tU2luZ2Fwb3JlXCIsIHZvbHVtZTogXCIkNDBNXCIgfSwgLy8gSmFwYW4gdG8gU2luZ2Fwb3JlXG5dLm1hcChjb25uID0+ICh7XG4gIC4uLmNvbm4sXG4gIGFyY0FsdDogMC4xNSArIE1hdGgucmFuZG9tKCkgKiAwLjI1LCAvLyBSYW5kb20gYWx0aXR1ZGUgYmV0d2VlbiAwLjE1LTAuNFxuICBzdGF0dXM6IE1hdGgucmFuZG9tKCkgPiAwLjE1LCAvLyA4NSUgYWN0aXZlIGNvbm5lY3Rpb25zXG4gIGlzSW5kaWFDb25uZWN0aW9uOiBjb25uLnN0YXJ0TGF0ID09PSAyOC42MTM5IHx8IGNvbm4uZW5kTGF0ID09PSAyOC42MTM5XG59KSk7XG5cbi8vIEluZGlhbiBtYW51ZmFjdHVyaW5nIGh1YnMgZm9yIGVuaGFuY2VkIHZpc3VhbGl6YXRpb25cbmNvbnN0IGluZGlhbkh1YnMgPSBbXG4gIHsgbGF0OiAxOS4wNzYwLCBsbmc6IDcyLjg3NzcsIG5hbWU6IFwiTXVtYmFpXCIsIGluZHVzdHJ5OiBcIlRleHRpbGVzICYgQ2hlbWljYWxzXCIsIHN1cHBsaWVyczogMjUwMCB9LFxuICB7IGxhdDogMjguNzA0MSwgbG5nOiA3Ny4xMDI1LCBuYW1lOiBcIkRlbGhpXCIsIGluZHVzdHJ5OiBcIkVsZWN0cm9uaWNzICYgQXV0b1wiLCBzdXBwbGllcnM6IDE4MDAgfSxcbiAgeyBsYXQ6IDEzLjA4MjcsIGxuZzogODAuMjcwNywgbmFtZTogXCJDaGVubmFpXCIsIGluZHVzdHJ5OiBcIkF1dG9tb3RpdmUgJiBJVFwiLCBzdXBwbGllcnM6IDEyMDAgfSxcbiAgeyBsYXQ6IDEyLjk3MTYsIGxuZzogNzcuNTk0NiwgbmFtZTogXCJCYW5nYWxvcmVcIiwgaW5kdXN0cnk6IFwiRWxlY3Ryb25pY3MgJiBQaGFybWFcIiwgc3VwcGxpZXJzOiAxNTAwIH0sXG4gIHsgbGF0OiAxOC41MjA0LCBsbmc6IDczLjg1NjcsIG5hbWU6IFwiUHVuZVwiLCBpbmR1c3RyeTogXCJBdXRvbW90aXZlICYgRW5naW5lZXJpbmdcIiwgc3VwcGxpZXJzOiA5MDAgfSxcbiAgeyBsYXQ6IDIyLjU3MjYsIGxuZzogODguMzYzOSwgbmFtZTogXCJLb2xrYXRhXCIsIGluZHVzdHJ5OiBcIkp1dGUgJiBMZWF0aGVyXCIsIHN1cHBsaWVyczogNzAwIH0sXG4gIHsgbGF0OiAyMy4wMjI1LCBsbmc6IDcyLjU3MTQsIG5hbWU6IFwiQWhtZWRhYmFkXCIsIGluZHVzdHJ5OiBcIlRleHRpbGVzICYgQ2hlbWljYWxzXCIsIHN1cHBsaWVyczogMTEwMCB9LFxuICB7IGxhdDogMTcuMzg1MCwgbG5nOiA3OC40ODY3LCBuYW1lOiBcIkh5ZGVyYWJhZFwiLCBpbmR1c3RyeTogXCJQaGFybWFjZXV0aWNhbHMgJiBJVFwiLCBzdXBwbGllcnM6IDgwMCB9XG5dO1xuXG5pbml0KCk7XG5pbml0R2xvYmUoKTtcbm9uV2luZG93UmVzaXplKCk7XG5hbmltYXRlKCk7XG5cbi8vIFNFQ1RJT04gSW5pdGlhbGl6aW5nIGNvcmUgVGhyZWVKUyBlbGVtZW50c1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy8gSW5pdGlhbGl6ZSByZW5kZXJlclxuICByZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlLCBhbHBoYTogdHJ1ZSB9KTtcbiAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHgwMDAwMDAsIDApO1xuICAvLyByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZztcblxuICAvLyBTZXQgbXVjaCBsYXJnZXIgZml4ZWQgc2l6ZSBmb3IgYmFja2dyb3VuZCBnbG9iZVxuICBjb25zdCBmaXhlZFdpZHRoID0gMTgwMDtcbiAgY29uc3QgZml4ZWRIZWlnaHQgPSAxNDAwO1xuICByZW5kZXJlci5zZXRTaXplKGZpeGVkV2lkdGgsIGZpeGVkSGVpZ2h0KTtcblxuICBjb25zdCBnbG9iZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnbG9iZS1jb250YWluZXInKTtcbiAgaWYgKGdsb2JlQ29udGFpbmVyKSB7XG4gICAgZ2xvYmVDb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgc2NlbmUsIGxpZ2h0XG4gIHNjZW5lID0gbmV3IFNjZW5lKCk7XG4gIHNjZW5lLmFkZChuZXcgQW1iaWVudExpZ2h0KDB4YmJiYmJiLCAwLjMpKTtcbiAgLy8gUmVtb3ZlIGJhY2tncm91bmQgZm9yIHRyYW5zcGFyZW5jeVxuICAvLyBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IENvbG9yKDB4MDQwZDIxKTtcblxuICAvLyBJbml0aWFsaXplIGNhbWVyYSwgbGlnaHRcbiAgY2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICB2YXIgZExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDAuOCk7XG4gIGRMaWdodC5wb3NpdGlvbi5zZXQoLTgwMCwgMjAwMCwgNDAwKTtcbiAgY2FtZXJhLmFkZChkTGlnaHQpO1xuXG4gIHZhciBkTGlnaHQxID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHg3OTgyZjYsIDEpO1xuICBkTGlnaHQxLnBvc2l0aW9uLnNldCgtMjAwLCA1MDAsIDIwMCk7XG4gIGNhbWVyYS5hZGQoZExpZ2h0MSk7XG5cbiAgdmFyIGRMaWdodDIgPSBuZXcgUG9pbnRMaWdodCgweDg1NjZjYywgMC41KTtcbiAgZExpZ2h0Mi5wb3NpdGlvbi5zZXQoLTIwMCwgNTAwLCAyMDApO1xuICBjYW1lcmEuYWRkKGRMaWdodDIpO1xuXG4gIGNhbWVyYS5wb3NpdGlvbi56ID0gMjUwO1xuICBjYW1lcmEucG9zaXRpb24ueCA9IDA7XG4gIGNhbWVyYS5wb3NpdGlvbi55ID0gMDtcblxuICBzY2VuZS5hZGQoY2FtZXJhKTtcblxuICAvLyBBZGRpdGlvbmFsIGVmZmVjdHMgLSByZW1vdmUgZm9nIGZvciBjbGVhbmVyIGhlcm8gbG9va1xuICAvLyBzY2VuZS5mb2cgPSBuZXcgRm9nKDB4NTM1ZWYzLCA0MDAsIDIwMDApO1xuXG4gIC8vIEhlbHBlcnNcbiAgLy8gY29uc3QgYXhlc0hlbHBlciA9IG5ldyBBeGVzSGVscGVyKDgwMCk7XG4gIC8vIHNjZW5lLmFkZChheGVzSGVscGVyKTtcbiAgLy8gdmFyIGhlbHBlciA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0SGVscGVyKGRMaWdodCk7XG4gIC8vIHNjZW5lLmFkZChoZWxwZXIpO1xuICAvLyB2YXIgaGVscGVyQ2FtZXJhID0gbmV3IENhbWVyYUhlbHBlcihkTGlnaHQuc2hhZG93LmNhbWVyYSk7XG4gIC8vIHNjZW5lLmFkZChoZWxwZXJDYW1lcmEpO1xuXG4gIC8vIERpc2FibGUgY29udHJvbHMgZm9yIG5vbi1yZXNwb25zaXZlIGdsb2JlXG4gIGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcbiAgY29udHJvbHMuZW5hYmxlZCA9IGZhbHNlO1xuICBjb250cm9scy5lbmFibGVEYW1waW5nID0gZmFsc2U7XG4gIGNvbnRyb2xzLmVuYWJsZVBhbiA9IGZhbHNlO1xuICBjb250cm9scy5lbmFibGVSb3RhdGUgPSBmYWxzZTtcbiAgY29udHJvbHMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICBjb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25XaW5kb3dSZXNpemUsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG59XG5cbi8vIFNFQ1RJT04gR2xvYmVcbmZ1bmN0aW9uIGluaXRHbG9iZSgpIHtcbiAgLy8gSW5pdGlhbGl6ZSB0aGUgR2xvYmVcbiAgR2xvYmUgPSBuZXcgVGhyZWVHbG9iZSh7XG4gICAgd2FpdEZvckdsb2JlUmVhZHk6IHRydWUsXG4gICAgYW5pbWF0ZUluOiB0cnVlLFxuICB9KVxuICAgIC5oZXhQb2x5Z29uc0RhdGEoY291bnRyaWVzLmZlYXR1cmVzKVxuICAgIC5oZXhQb2x5Z29uUmVzb2x1dGlvbigzKVxuICAgIC5oZXhQb2x5Z29uTWFyZ2luKDAuNylcbiAgICAuc2hvd0F0bW9zcGhlcmUodHJ1ZSlcbiAgICAuYXRtb3NwaGVyZUNvbG9yKFwiIzNhMjI4YVwiKVxuICAgIC5hdG1vc3BoZXJlQWx0aXR1ZGUoMC4yNSlcbiAgICAuaGV4UG9seWdvbkNvbG9yKChlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIFtcIktHWlwiLCBcIktPUlwiLCBcIlRIQVwiLCBcIlJVU1wiLCBcIlVaQlwiLCBcIklETlwiLCBcIktBWlwiLCBcIk1ZU1wiXS5pbmNsdWRlcyhcbiAgICAgICAgICBlLnByb3BlcnRpZXMuSVNPX0EzXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKDI1NSwyNTUsMjU1LCAxKVwiO1xuICAgICAgfSBlbHNlIHJldHVybiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNylcIjtcbiAgICB9KTtcblxuICAvLyBOT1RFIEFyYyBhbmltYXRpb25zIHdpdGggbmV0d29yayBjb25uZWN0aW9ucyBhbmQgdHJhdmVsaW5nIHB1bHNlc1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBHbG9iZS5hcmNzRGF0YShuZXR3b3JrQ29ubmVjdGlvbnMpXG4gICAgICAuYXJjQ29sb3IoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUuc3RhdHVzID8gXCIjMDBmZjg4XCIgOiBcIiNmZjZiMzVcIjsgLy8gR3JlZW4gZm9yIGFjdGl2ZSwgb3JhbmdlIGZvciBpbmFjdGl2ZVxuICAgICAgfSlcbiAgICAgIC5hcmNBbHRpdHVkZSgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5hcmNBbHQ7XG4gICAgICB9KVxuICAgICAgLmFyY1N0cm9rZSgoZSkgPT4ge1xuICAgICAgICBjb25zdCBiYXNlUHVsc2UgPSBNYXRoLnNpbihwdWxzYXRlVGltZSArIGUub3JkZXIgKiAwLjUpICogMC40ICsgMC42OyAvLyBJbmRpdmlkdWFsIHB1bHNlIHRpbWluZ1xuICAgICAgICByZXR1cm4gZS5zdGF0dXMgPyAwLjggKiBiYXNlUHVsc2UgOiAwLjQgKiBiYXNlUHVsc2U7XG4gICAgICB9KVxuICAgICAgLmFyY0Rhc2hMZW5ndGgoMC4zKSAvLyBTaG9ydGVyIGRhc2hlcyBmb3IgcHVsc2UgZWZmZWN0XG4gICAgICAuYXJjRGFzaEdhcCgwLjEpIC8vIFNtYWxsZXIgZ2Fwc1xuICAgICAgLmFyY0Rhc2hBbmltYXRlVGltZSgzMDAwKSAvLyBTbG93ZXIgcHVsc2UgdHJhdmVsXG4gICAgICAuYXJjc1RyYW5zaXRpb25EdXJhdGlvbigyMDAwKVxuICAgICAgLmFyY0Rhc2hJbml0aWFsR2FwKChlKSA9PiBlLm9yZGVyICogMC4yKSAvLyBTdGFnZ2VyZWQgcHVsc2Ugc3RhcnRzXG4gICAgICAucG9pbnRzRGF0YShpbmRpYW5IdWJzKVxuICAgICAgLnBvaW50Q29sb3IoKGQpID0+IHtcbiAgICAgICAgLy8gQ29sb3IgY29kZSBieSBpbmR1c3RyeVxuICAgICAgICBpZiAoZC5pbmR1c3RyeS5pbmNsdWRlcygnVGV4dGlsZXMnKSkgcmV0dXJuICcjZmY2YjZiJztcbiAgICAgICAgaWYgKGQuaW5kdXN0cnkuaW5jbHVkZXMoJ0VsZWN0cm9uaWNzJykpIHJldHVybiAnIzRlY2RjNCc7XG4gICAgICAgIGlmIChkLmluZHVzdHJ5LmluY2x1ZGVzKCdBdXRvbW90aXZlJykpIHJldHVybiAnIzQ1YjdkMSc7XG4gICAgICAgIGlmIChkLmluZHVzdHJ5LmluY2x1ZGVzKCdQaGFybWFjZXV0aWNhbHMnKSkgcmV0dXJuICcjOTZjZWI0JztcbiAgICAgICAgaWYgKGQuaW5kdXN0cnkuaW5jbHVkZXMoJ0NoZW1pY2FscycpKSByZXR1cm4gJyNmZmVhYTcnO1xuICAgICAgICByZXR1cm4gJyNkZGEwZGQnO1xuICAgICAgfSlcbiAgICAgIC5wb2ludHNNZXJnZShmYWxzZSlcbiAgICAgIC5wb2ludEFsdGl0dWRlKDAuMDUpXG4gICAgICAucG9pbnRSYWRpdXMoKGQpID0+IE1hdGgubWF4KDAuMDIsIGQuc3VwcGxpZXJzIC8gNTAwMDApKSAvLyBTaXplIGJhc2VkIG9uIHN1cHBsaWVyIGNvdW50XG4gICAgICAucG9pbnRMYWJlbCgoZCkgPT4gYFxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjgpOyBwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiAxMnB4O1wiPlxuICAgICAgICAgIDxzdHJvbmc+JHtkLm5hbWV9PC9zdHJvbmc+PGJyLz5cbiAgICAgICAgICBJbmR1c3RyeTogJHtkLmluZHVzdHJ5fTxici8+XG4gICAgICAgICAgU3VwcGxpZXJzOiAke2Quc3VwcGxpZXJzLnRvTG9jYWxlU3RyaW5nKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgYCk7XG4gIH0sIDEwMDApO1xuXG4gIC8vIFNldCBpbml0aWFsIHJvdGF0aW9uIHRvIHNob3cgSW5kaWEgKFogcm90YXRpb24gZm9yIHRpbHQpXG4gIEdsb2JlLnJvdGF0aW9uLnkgPSBpbmRpYUJhc2VSb3RhdGlvbjtcbiAgR2xvYmUucm90YXRlWigtTWF0aC5QSSAvIDYpO1xuICBjb25zdCBnbG9iZU1hdGVyaWFsID0gR2xvYmUuZ2xvYmVNYXRlcmlhbCgpO1xuICBnbG9iZU1hdGVyaWFsLmNvbG9yID0gbmV3IENvbG9yKDB4M2EyMjhhKTtcbiAgZ2xvYmVNYXRlcmlhbC5lbWlzc2l2ZSA9IG5ldyBDb2xvcigweDIyMDAzOCk7XG4gIGdsb2JlTWF0ZXJpYWwuZW1pc3NpdmVJbnRlbnNpdHkgPSAwLjE7XG4gIGdsb2JlTWF0ZXJpYWwuc2hpbmluZXNzID0gMC43O1xuXG4gIC8vIE5PVEUgQ29vbCBzdHVmZlxuICAvLyBnbG9iZU1hdGVyaWFsLndpcmVmcmFtZSA9IHRydWU7XG5cbiAgc2NlbmUuYWRkKEdsb2JlKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgLy8gRGlzYWJsZSBtb3VzZSBtb3ZlbWVudCBlZmZlY3RzIGZvciBub24tcmVzcG9uc2l2ZSBnbG9iZVxuICAvLyBtb3VzZVggPSBldmVudC5jbGllbnRYIC0gd2luZG93SGFsZlg7XG4gIC8vIG1vdXNlWSA9IGV2ZW50LmNsaWVudFkgLSB3aW5kb3dIYWxmWTtcbn1cblxuZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gIC8vIEtlZXAgZ2xvYmUgYXQgbXVjaCBsYXJnZXIgZml4ZWQgc2l6ZSwgZG9uJ3QgbWFrZSBpdCByZXNwb25zaXZlXG4gIGNvbnN0IGZpeGVkV2lkdGggPSAxODAwO1xuICBjb25zdCBmaXhlZEhlaWdodCA9IDE0MDA7XG5cbiAgY2FtZXJhLmFzcGVjdCA9IGZpeGVkV2lkdGggLyBmaXhlZEhlaWdodDtcbiAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgcmVuZGVyZXIuc2V0U2l6ZShmaXhlZFdpZHRoLCBmaXhlZEhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIC8vIFJlbW92ZSBtb3VzZS1iYXNlZCBjYW1lcmEgbW92ZW1lbnQgZm9yIG5vbi1yZXNwb25zaXZlIGdsb2JlXG4gIC8vIEtlZXAgY2FtZXJhIGluIGZpeGVkIHBvc2l0aW9uXG5cbiAgLy8gQ3VzdG9tIG9zY2lsbGF0aW5nIHJvdGF0aW9uIGFyb3VuZCBJbmRpYVxuICBpZiAoR2xvYmUpIHtcbiAgICByb3RhdGlvblRpbWUgKz0gcm90YXRpb25TcGVlZCAqIDAuMDE7IC8vIFZlcnkgc2xvdyBpbmNyZW1lbnRcbiAgICBwdWxzYXRlVGltZSArPSBwdWxzYXRlU3BlZWQ7IC8vIFB1bHNhdGluZyBpbmNyZW1lbnRcbiAgICBjb25zdCBvc2NpbGxhdGlvbiA9IE1hdGguc2luKHJvdGF0aW9uVGltZSkgKiByb3RhdGlvblJhbmdlO1xuICAgIEdsb2JlLnJvdGF0aW9uLnkgPSBpbmRpYUJhc2VSb3RhdGlvbiArIG9zY2lsbGF0aW9uO1xuXG4gICAgLy8gVXBkYXRlIGFyYyBzdHJva2VzIGZvciB0cmF2ZWxpbmcgcHVsc2UgZWZmZWN0XG4gICAgR2xvYmUuYXJjU3Ryb2tlKChlKSA9PiB7XG4gICAgICBjb25zdCBpbmRpdmlkdWFsUHVsc2UgPSBNYXRoLnNpbihwdWxzYXRlVGltZSArIGUub3JkZXIgKiAwLjUpICogMC40ICsgMC42O1xuICAgICAgcmV0dXJuIGUuc3RhdHVzID8gMC44ICogaW5kaXZpZHVhbFB1bHNlIDogMC40ICogaW5kaXZpZHVhbFB1bHNlO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIGRhc2ggYW5pbWF0aW9uIGZvciB0cmF2ZWxpbmcgcHVsc2VzIHdpdGggZW5oYW5jZWQgZWZmZWN0c1xuICAgIEdsb2JlLmFyY0Rhc2hJbml0aWFsR2FwKChlKSA9PiB7XG4gICAgICBjb25zdCBzcGVlZCA9IGUuaXNJbmRpYUNvbm5lY3Rpb24gPyAwLjE1IDogMC4wODsgLy8gRmFzdGVyIGZvciBJbmRpYSBjb25uZWN0aW9uc1xuICAgICAgY29uc3QgdHJhdmVsaW5nUHVsc2UgPSAocHVsc2F0ZVRpbWUgKiBzcGVlZCArIGUub3JkZXIgKiAwLjIpICUgMTtcbiAgICAgIHJldHVybiB0cmF2ZWxpbmdQdWxzZTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBhcmMgbGFiZWxzIGZvciBtYWpvciBjb25uZWN0aW9uc1xuICAgIEdsb2JlLmFyY0xhYmVsKChkKSA9PiB7XG4gICAgICBpZiAoZC5pc0luZGlhQ29ubmVjdGlvbiAmJiBNYXRoLnJhbmRvbSgpID4gMC43KSB7IC8vIFNob3cgbGFiZWxzIG9jY2FzaW9uYWxseVxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNyk7IHBhZGRpbmc6IDVweDsgYm9yZGVyLXJhZGl1czogM3B4OyBjb2xvcjogd2hpdGU7IGZvbnQtc2l6ZTogMTBweDtcIj5cbiAgICAgICAgICAgICR7ZC5uYW1lfTxici8+XG4gICAgICAgICAgICBWb2x1bWU6ICR7ZC52b2x1bWV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG4gIH1cblxuICBjYW1lcmEubG9va0F0KHNjZW5lLnBvc2l0aW9uKTtcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gXCIzOTg2ZDk3YjQyYWU4ZTFkMWM1OVwiIl0sInNvdXJjZVJvb3QiOiIifQ==