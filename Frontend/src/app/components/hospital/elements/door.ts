import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export interface DoorSchema { 
    frame: THREE.Group, 
    leftDoor: THREE.Group, 
    rightDoor: THREE.Group }

export class Door {
    leftDoor!: THREE.Group;
    rightDoor!: THREE.Group;
    object!: THREE.Group;

    build(
        frameColor: number,
        doorColor: number,
        frameTextureUrl: string,
        doorFrontTextureUrl: string,
        doorRearTextureUrl: string,
        size: { width: number, height: number, depth: number },
    ): THREE.Group {
        // this.object = new THREE.Group();

        // Create the frame
        const frame = this.buildFrame(frameColor, frameTextureUrl, size);

        // Create the door
        const doorSize = {
            width: size.width - size.depth,
            height: size.height - size.depth,
            depth: size.depth * .75,
            gap: size.depth / 2
        };

        const doors = this.buildDoors(
            doorColor, 
            doorFrontTextureUrl, 
            doorRearTextureUrl,
            doorSize);
        this.leftDoor = doors.leftDoor;
        this.rightDoor = doors.rightDoor;

        this.object = new THREE.Group();
        this.object.add(frame);
        this.object.add(this.leftDoor);
        this.object.add(this.rightDoor);

        this.object.traverse(
            (child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            }
        )

        return this.object;
    }

    // Create the frame
    buildFrame(
        color: number,
        textureUrl: string,
        size: { width: number, height: number, depth: number },
    ): THREE.Group {

        // Create a material
        const material = new THREE.MeshPhongMaterial({ color: color });
        let frame = new THREE.Group();

        if (textureUrl && textureUrl.length > 0){
            const texture = new THREE.TextureLoader().load(textureUrl);
            material.map = texture;
        }

        // Create top frame
        let topGeometry = new THREE.BoxGeometry(size.width, size.depth, size.depth);
        let topMesh = new THREE.Mesh(topGeometry, material);
        topMesh.translateY(size.height / 2.0 - size.depth / 2.0);
        frame.add(topMesh);

        // Create left frame
        const sideGeometry = new THREE.BoxGeometry(size.depth, size.height, size.depth);
        const leftMesh = new THREE.Mesh(sideGeometry, material);
        leftMesh.translateX(-size.width / 2.0);
        frame.add(leftMesh);

        // Create right frame
        const rightMesh = new THREE.Mesh(sideGeometry, material);
        rightMesh.translateX(size.width / 2.0);
        frame.add(rightMesh);

        return frame;
    }

    // Create the door
    buildDoors(
        color: number,
        frontTextureUrl: string,
        rearTextureUrl: string,
        doorSize: { width: number, height: number, depth: number, gap: number },
    ): { leftDoor: THREE.Group, rightDoor: THREE.Group } {
        
        const geometry = new THREE.BoxGeometry(doorSize.width/2, doorSize.height, doorSize.depth);

        const sideMaterial = new THREE.MeshBasicMaterial({ color: color });
        const frontMaterial = new THREE.MeshBasicMaterial({ color: color });
        const rearMaterial = new THREE.MeshBasicMaterial({ color: color });

        if (
            frontTextureUrl && frontTextureUrl.length > 0
            && rearTextureUrl && rearTextureUrl.length > 0
        ){
            const frontTexture = new THREE.TextureLoader().load(frontTextureUrl);
            frontTexture.colorSpace = THREE.SRGBColorSpace;
            frontMaterial.map=frontTexture;

            const rearTexture = new THREE.TextureLoader().load(rearTextureUrl);
            rearTexture.colorSpace = THREE.SRGBColorSpace;
            rearMaterial.map=rearTexture;
        }

        let leftMesh = new THREE.Mesh(
            geometry, 
            [sideMaterial, 
            sideMaterial, 
            sideMaterial, 
            sideMaterial, 
            frontMaterial, 
            rearMaterial]);
        leftMesh.translateY(-doorSize.gap);

        // leftMesh.castShadow = true;
        // leftMesh.receiveShadow = true;

        let rightMesh = leftMesh.clone();
        rightMesh.rotateY(Math.PI);

        leftMesh.translateX(doorSize.width / 4);
        rightMesh.translateX(doorSize.width / 4);

        const leftDoor = new THREE.Group();
        const rightDoor = new THREE.Group();

        leftDoor.add(leftMesh);
        rightDoor.add(rightMesh);

        leftDoor.translateX(-doorSize.width / 2.0);
        rightDoor.translateX(doorSize.width / 2.0);

        return { leftDoor: leftDoor, rightDoor: rightDoor };
    }
}