import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';

export class SurgicalTable {
  object!: THREE.Group;
  occupied!: boolean;

  build(
    modelFreeUrl: string,
    modelOccupiedUrl: string,
    occupied: boolean,
  ): THREE.Group {
    this.object = new THREE.Group();
    this.occupied = occupied;

    const modelUrl = occupied ? modelOccupiedUrl : modelFreeUrl;
    this.loadModel(modelUrl);

    return this.object;
  }

  setOccupied() {
    this.occupied = true;
    this.updateMaterial();
  }

  setFree() {
    this.occupied = false;
    this.updateMaterial();
  }

  private updateMaterial() {
    const mesh = this.object.children.find(child => child instanceof THREE.Mesh) as THREE.Mesh;
    if (mesh && mesh.material) {
      const material = mesh.material as THREE.MeshStandardMaterial; // Aqui estamos forçando o uso de MeshStandardMaterial
      if (this.occupied) {
        material.color.set(0xff0000); // Exemplo de cor para o estado ocupado
      } else {
        material.color.set(0xffffff); // Cor padrão
      }
    }
  }

  private loadModel(filePath: string): void {
    const loader = filePath.endsWith('.gltf') || filePath.endsWith('.glb')
      ? new GLTFLoader()
      : new ColladaLoader();

    loader.load(
      filePath,
      (loaded) => {
        this.object.add(loaded.scene);
        this.updateMaterial(); // Atualiza o material após o carregamento
        console.log('Modelo carregado com sucesso.');
      },
      (xhr) => {
        console.log(`Modelo: ${(xhr.loaded / xhr.total) * 100}% carregado`);
      },
      (error) => {
        console.error('Erro ao carregar o modelo:', error);
      }
    );
  }

  private loadGLTF(filePath: string): void {
    const loader = new GLTFLoader();
    loader.load(
      filePath,
      (gltf) => {
        this.object.add(gltf.scene);
        this.updateMaterial(); // Atualiza o material após o carregamento
        console.log('Modelo GLTF carregado.');
      },
      (xhr) => {
        console.log(`GLTF: ${(xhr.loaded / xhr.total) * 100}% carregado`);
      },
      (error) => {
        console.error('Erro ao carregar GLTF:', error);
      }
    );
  }

  private loadCollada(filePath: string): void {
    const loader = new ColladaLoader();
    loader.load(
      filePath,
      (collada) => {
        this.object.add(collada.scene);
        this.updateMaterial(); // Atualiza o material após o carregamento
        console.log('Modelo Collada carregado.');
      },
      (xhr) => {
        console.log(`Collada: ${(xhr.loaded / xhr.total) * 100}% carregado`);
      },
      (error) => {
        console.error('Erro ao carregar Collada:', error);
      }
    );
  }
}
