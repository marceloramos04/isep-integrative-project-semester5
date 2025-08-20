import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { HttpClient } from '@angular/common/http';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import * as TWEEN from 'three/addons/libs/tween.module.js';
import { Ground } from './elements/ground';
import { Wall } from './elements/wall';
import { Door } from './elements/door';
import { FloorSchema } from './elements/floorSchema';
import floorPlan from '../../../assets/floor-plan.json';
import { SurgicalTable } from './elements/surgicalTable';
import { initial } from 'node_modules/cypress/types/lodash';

interface RoomDetails {
  id: number;
  x: number;
  z: number;
  rotationY: number;
  condition: string;
  patient_number: string;
  patient_name: string;
  surgery_type: string;
  time_left: number
}

interface Table {
  object: THREE.Object3D;
  room: RoomDetails;
}

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
  standalone: false,
})
export class HospitalComponent implements OnInit {
  @ViewChild('myCanvas', { static: false }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  initialCameraPosition = new THREE.Vector3(0, 5, 5);
  initialCameraLookAt = new THREE.Vector3(0, 0, 0);

  persistedCameraPosition = this.initialCameraPosition.clone();
  persistedCameraLookAt = this.initialCameraLookAt.clone();

  floorPlan!: any;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;

  sizeX!: number;
  sizeZ!: number;
  directionalLight!: THREE.DirectionalLight;
  ambientLight!: THREE.AmbientLight;
  lightColor!: string;
  spotLight!: THREE.SpotLight;

  surgicalTables: Table[] = [];

  controls!: OrbitControls;
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  tablePicked?: Table | null;
  displayInfo = false;
  // pickPosition = new THREE.Vector2(0, 0);
  // pickedObjectSavedColor = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadFloorPlan();
  }

  loadFloorPlan() {
    this.http.get('assets/floor-plan.json').subscribe((data: any) => {
      this.floorPlan = data;
      this.lightColor = data.lightColor;
      this.initScene();
      this.animate();
      console.log('Coordenadas do plano:', floorPlan.rooms);

    });
  }

  initScene() {
    this.sizeX = this.floorPlan.schema.length - 1;
    this.sizeZ = this.floorPlan.schema[0].length - 1;

    this.setScene();
    this.setLights();
    this.setCamera();
    this.initGUI();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setPixelRatio(devicePixelRatio);

    const width = this.canvasRef.nativeElement.clientWidth;
    const height = this.canvasRef.nativeElement.clientHeight;

    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.zoomSpeed = 1.2;
    this.controls.mouseButtons = {
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
  }

  setScene() {
    this.scene = new THREE.Scene();

    const ground = new Ground().buildGround(
      this.floorPlan.schema[0].length - 1,
      this.floorPlan.schema.length - 1,
      this.floorPlan.groundTextureUrl,
      this.floorPlan.groundTextureRepeatFactor,
      this.floorPlan.groundColor
    );

    const floorSchema = new FloorSchema().build(
      this.floorPlan.schema,
      this.floorPlan.wallTextureUrl,
      this.floorPlan.wallColor,
      this.floorPlan.doorFrameTextureUrl,
      this.floorPlan.doorFrameColor,
      this.floorPlan.doorFrontTextureUrl,
      this.floorPlan.doorRearTextureUrl,
      this.floorPlan.doorColor
    );

    this.scene.add(ground);
    this.scene.add(floorSchema);

    this.setTables();
  }

  setCamera() {
    const width = this.canvasRef.nativeElement.clientWidth;
    const height = this.canvasRef.nativeElement.clientHeight;
    const aspectRatio = width / height;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.set(this.initialCameraPosition.x, this.initialCameraPosition.y, this.initialCameraPosition.z);
    this.camera.lookAt(this.initialCameraLookAt);
  }

  setLights() {
    this.directionalLight = new THREE.DirectionalLight(this.lightColor, this.floorPlan.directonalLightIntensity);

    const schemaHalfWidth = this.floorPlan.schema[0].length / 2;
    const schemaHalfHeight = this.floorPlan.schema.length / 2;

    this.directionalLight.shadow.camera.left = -(schemaHalfWidth + 2);
    this.directionalLight.shadow.camera.right = schemaHalfWidth + 2;
    this.directionalLight.shadow.camera.top = schemaHalfHeight + 2;
    this.directionalLight.shadow.camera.bottom = -(schemaHalfHeight + 2);

    this.directionalLight.shadow.mapSize.width = 1080;
    this.directionalLight.shadow.mapSize.height = 1080;

    this.directionalLight.position.set(5, 10, 10);
    this.directionalLight.target.position.set(0, 0, 0);

    this.directionalLight.castShadow = true;

    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(this.lightColor, this.floorPlan.ambientLightIntensity);
    this.scene.add(this.ambientLight);

    this.spotLight = new THREE.SpotLight(this.lightColor);
    this.spotLight.visible = false;
    this.scene.add(this.spotLight);
  }

  setTables() {
    const rooms = this.floorPlan.rooms;
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const table = new SurgicalTable().build(
        this.floorPlan.freeTableModelUrl,
        this.floorPlan.occupiedTableModelUrl,
        room.condition === "In surgery"
      );

      table.position.set(room.x, -0.5, room.z); // Use as coordenadas fornecidas no plano
      table.rotateY(room.rotationY * (Math.PI / 180));
      table.scale.set(
        room.condition === "In surgery" ? this.floorPlan.occupiedTableModelScale : this.floorPlan.freeTableModelScale,
        room.condition === "In surgery" ? this.floorPlan.occupiedTableModelScale : this.floorPlan.freeTableModelScale,
        room.condition === "In surgery" ? this.floorPlan.occupiedTableModelScale : this.floorPlan.freeTableModelScale
      );

      this.scene.add(table);
      this.surgicalTables.push({ object: table, room: room });

      // const sprite = this.createTextSprite(`Room ${room.id}`);
      // sprite.position.set(room.x, 0.5, room.z);
      // this.scene.add(sprite);
    }
  }


  initGUI(): void {
    const gui = new GUI({ autoPlace: false });
    const guiContainer = document.createElement('div');
    guiContainer.style.position = 'absolute';
    guiContainer.style.top = '0';
    guiContainer.style.right = '0';
    this.canvasRef.nativeElement.parentElement?.appendChild(guiContainer);
    guiContainer.appendChild(gui.domElement);

    gui.addColor({ "Light color": "#" + floorPlan.lightColor }, 'Light color').onChange((color) => {
      this.directionalLight.color.set(color);
      this.ambientLight.color.set(color);
    });

    const dirLightFolder = gui.addFolder('Directional Light');
    dirLightFolder.add({ Intensity: this.directionalLight.intensity }, 'Intensity', 0, 2).onChange((intensity) => {
      this.directionalLight.intensity = intensity;
    });
    dirLightFolder.add({ 'X position': this.directionalLight.position.x }, 'X position', -20, 20).onChange((x) => {
      this.directionalLight.position.x = x;
    });
    dirLightFolder.add({ 'Y position': this.directionalLight.position.y }, 'Y position', -20, 20).onChange((y) => {
      this.directionalLight.position.y = y;
    });
    dirLightFolder.add({ 'Z position': this.directionalLight.position.z }, 'Z position', -20, 20).onChange((z) => {
      this.directionalLight.position.z = z;
    });

    const ambLightFolder = gui.addFolder('Ambient Light');
    ambLightFolder.add({ intensity: this.ambientLight.intensity }, 'intensity', 0, 2).onChange((intensity) => {
      this.ambientLight.intensity = intensity;
    });
  }

  ngAfterViewInit() {
    this.canvasRef.nativeElement.addEventListener('click', (event) => this.onMouseClick(event));
    window.addEventListener('keydown', (event) => {
      console.log('Key pressed:', event.key);
      if (event.key === 'i' && this.tablePicked && !this.displayInfo) {
        this.displayInfo = true;
      } else if (event.key === 'i' && this.tablePicked && this.displayInfo) {
        this.displayInfo = false;
      }
    });
  }

  onMouseClick(event: MouseEvent) {

    if (!this.tablePicked) {
      const pickPosition = this.getPickPosition(event);
      console.log('Pick position:', pickPosition);

      this.raycaster.setFromCamera(pickPosition, this.camera);

      const intersects = this.raycaster.intersectObjects(this.surgicalTables.map((item) => item.object));
      console.log('Intersects:', intersects);

      if (intersects.length) {

        const intersect = intersects[0];
        const mainObject = this.getParentObject(intersect.object);
        console.log('Main object:', mainObject);

        const room = this.surgicalTables.find((item) => item.object === mainObject);
        if (room) {
          console.log('Selected table:', room);
          this.selectTable(room);

        } else console.error('Table not found');
      }
      // this.camera.position.set();
      // this.camera.lookAt(position);
    }

    // const canvas = this.canvasRef.nativeElement;
    // const rect = canvas.getBoundingClientRect();
    // this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    // this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // this.raycaster.setFromCamera(this.mouse, this.camera);

    // const intersects = this.raycaster.intersectObjects(this.surgicalTables.map((item) => item.object));
    // console.log('Intersecções detectadas:', intersects);
    // console.log('Objeto detectado:', intersects[0].object.position);
    // if (intersects.length > 0) {
    //   const selectedObject = intersects[0].object; // Pega o objeto que foi clicado.
    //   console.log('Objeto selecionado:', selectedObject); // Verifique no console se o objeto está sendo encontrado
    //   const selectedTable = this.surgicalTables.find((item) => item.object === selectedObject); // Encontra o item da mesa associado.

    //   if (selectedTable) {
    //     console.log("Selected table"); // Exibe as informações da sala associada à mesa.
    //     this.moveCameraToRoom(selectedTable.room); // Move a câmera para a posição da sala correspondente.
    //   }
    // }
  }

  getParentObject(object: THREE.Object3D): THREE.Object3D {
    let found = false;
    let thisObject = object;
    while (!found) {
      if (thisObject.parent && thisObject.parent.type !== 'Scene') {
        thisObject = thisObject.parent;
        console.log('Parent found:', thisObject.name);
      } else {
        found = true;
      }
    }

    return thisObject;
  }

  getPickPosition(event: MouseEvent): THREE.Vector2 {
    const canvas = this.canvasRef.nativeElement;
    const position = this.getCanvasRelativePosition(event);
    const x = (position.x / canvas.width) * 2 - 1;
    const y = (position.y / canvas.height) * -2 + 1;
    return new THREE.Vector2(x, y);
  }

  getCanvasRelativePosition(event: MouseEvent): { x: number; y: number } {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * canvas.width / rect.width,
      y: (event.clientY - rect.top) * canvas.height / rect.height,
    }
  }

  selectTable(table: { object: THREE.Object3D; room: any }) {

    this.tablePicked = table;
    console.log('Table selected', table);
    // this.canvasRef.nativeElement.removeEventListener('click', (event) => this.onMouseClick(event));

    const position = table.object.position.clone();
    position.y = 2;
    this.focusRoom(position);

    this.spotLight.position.set(position.x, position.y + 2, position.z);
    this.spotLight.target.position.set(position.x, 0, position.z);
    this.spotLight.visible = true;

    this.controls.enabled = false;
  }

  unselectTable() {

    this.displayInfo = false;
    this.tablePicked = null;
    console.log('Table unselected');
    // this.canvasRef.nativeElement.addEventListener('click', (event) => this.onMouseClick(event));
    
    this.unfocusRoom();
    // this.controls.enableZoom = true;

    this.controls.enabled = true;
  }

  focusRoom(targetPosition: THREE.Vector3, duration: number = 1000) {
    const startPosition = this.camera.position.clone();
    const targetLookAt = new THREE.Vector3(targetPosition.x, 0, targetPosition.z);
    const tween = new TWEEN.Tween({ position: startPosition, lookAt: this.camera.getWorldDirection(new THREE.Vector3()).clone().add(this.camera.position) })
      .to({ position: targetPosition, lookAt: targetLookAt }, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((obj) => {
        this.camera.position.set(obj.position.x, obj.position.y, obj.position.z);
        this.camera.lookAt(obj.lookAt.x, obj.lookAt.y, obj.lookAt.z);
      })
      .start();
  }

  unfocusRoom(duration: number = 1000) {
    const startPosition = this.camera.position.clone();
    // const startLookAt = this.camera.lookAt;
    const startLookAt = this.camera.getWorldDirection(new THREE.Vector3()).clone().add(this.camera.position);
    const tween = new TWEEN.Tween({ position: startPosition, lookAt: startLookAt })
      .to({ position: this.initialCameraPosition, lookAt: this.initialCameraLookAt }, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((obj) => {
        this.camera.position.set(obj.position.x, obj.position.y, obj.position.z);
        this.camera.lookAt(obj.lookAt.x, obj.lookAt.y, obj.lookAt.z);
      })
      .start();
  }

  // clearPickPosition() {
  //   this.pickPosition.x = -100000;
  //   this.pickPosition.y = -100000;
  // }

  centerCameraOnTable(selectedTable: THREE.Object3D) {
    const tablePosition = selectedTable.position;
    this.camera.position.set(tablePosition.x, this.camera.position.y, tablePosition.z + 5);
    this.camera.lookAt(tablePosition.x, tablePosition.y, tablePosition.z);
  }

  moveCameraToRoom(room: any) {
    const targetPosition = new THREE.Vector3(room.x, this.camera.position.y, room.z); // Posição alvo baseada na sala.
    const lookAtPosition = new THREE.Vector3(room.x, 0, room.z); // Define o ponto de foco no centro da sala.

    // Cria uma interpolação TWEEN para mover suavemente a câmera para a posição alvo.
    new TWEEN.Tween(this.camera.position)
      .to({ x: targetPosition.x, z: targetPosition.z }, 1000) // Move suavemente a câmera para a nova posição.
      .easing(TWEEN.Easing.Quadratic.InOut) // Define a curva de movimento.
      .onUpdate(() => {
        this.camera.lookAt(lookAtPosition); // Sempre mantém a câmera olhando para o centro da sala.
      })
      .start();
  }



  createTextSprite(message: string, parameters: any = {}) {
    const fontface = parameters.fontface || 'Arial';
    const fontsize = parameters.fontsize || 50;
    const borderThickness = parameters.borderThickness || 4;
    const borderColor = parameters.borderColor || { r: 0, g: 0, b: 0, a: 1.0 };
    const backgroundColor = parameters.backgroundColor || { r: 255, g: 255, b: 255, a: 1.0 };

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = `${fontsize}px ${fontface}`;

    const metrics = context.measureText(message);
    const textWidth = metrics.width;

    context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
    context.fillRect(borderThickness, borderThickness, textWidth + borderThickness * 2, fontsize * 1.4 + borderThickness * 2);

    context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;
    context.lineWidth = borderThickness;
    context.strokeRect(borderThickness, borderThickness, textWidth + borderThickness * 2, fontsize * 1.4 + borderThickness * 2);

    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(message, borderThickness, fontsize + borderThickness);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1, 0.5, 1);

    return sprite;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    TWEEN.update(); // Atualiza as animações do Tween.
    this.renderer.render(this.scene, this.camera);
  }
}