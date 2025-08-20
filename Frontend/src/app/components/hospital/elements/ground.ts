import * as THREE from 'three';

export class Ground {

    buildGround(
        sizeX: number,
        sizeZ: number,
        textureUrl: string,
        textureRepeatFactor: number,
        color: number
    ): THREE.Mesh {

        const texture = new THREE.TextureLoader().load(textureUrl);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(textureRepeatFactor*sizeX, textureRepeatFactor*sizeZ);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const geometry=new THREE.PlaneGeometry(sizeX, sizeZ);
        const material=new THREE.MeshStandardMaterial({
            color: color,
            map: texture,
            side: THREE.DoubleSide,
        })

        const ground = new THREE.Mesh(
            geometry,
            material
        );

        ground.position.y = -0.5; // Place the ground at the bottom of the scene
        ground.rotation.x = -Math.PI / 2;

        ground.castShadow = false;
        ground.receiveShadow = true;

        return ground;
    }
}