import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from "three";

@Component({
    selector: 'app-cube',
    imports: [],
    templateUrl: './cube.component.html',
    styleUrl: './cube.component.css'
})
export class CubeComponent implements AfterViewInit {

  @ViewChild('myCanvas') private canvasRef!: ElementRef;

  //* Cube Properties
  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  @Input() public texture: string = 'assets/DEI_logo.gif';

  //* Stage Properties
  @Input() public cameraZ: number = 10;
  @Input() public fieldOfView: number = 30;
  @Input('nearClipping') public nearClippingPane: number = 1;
  @Input('farClipping') public farClippingPane: number = 1000;

  //? Helper Properties (Private properties);
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({
    map:
      this.loader.load(this.texture)
  });
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene: THREE.Scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
* Create the scene
*
* @private
* @memberof CubeComponent
*/
  private createScene(): void {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0000ff);
    this.scene.add(this.cube);

    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(this.fieldOfView, aspectRatio,
      this.nearClippingPane, this.farClippingPane);
    this.camera.position.z = this.cameraZ;

    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  /**
* Animate the cube
*
* @private
* @memberof CubeComponent
*/
  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
* Render the scene
*
* @private
* @memberof CubeComponent
*/
  private render() {
    requestAnimationFrame(() => this.render());
    this.animateCube();
    this.renderer.render(this.scene, this.camera);
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.render();
    }

}
