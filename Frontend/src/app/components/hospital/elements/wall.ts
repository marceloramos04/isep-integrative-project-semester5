import * as THREE from "three";

// interface WallParameters {
//     textureUrl: string;
// }

export class Wall {

    // mesh!: THREE.Group;
    mesh!: THREE.Mesh;
    material!: THREE.MeshPhongMaterial;
    // object!: THREE.Group;

    build(
        width: number,
        height: number,
        depth: number,
        textureUrl: string,
        color: number,
    ): THREE.Mesh {

        // Create a texture
        const texture = new THREE.TextureLoader().load(textureUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        this.material = new THREE.MeshPhongMaterial({ color: color, map: texture });

        // Create a wall (seven faces) that casts and receives shadows

        const geometry = new THREE.BoxGeometry(width, height, depth);
        this.mesh = new THREE.Mesh(geometry, this.material);
        
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // this.buildFrontAndRearFaces();
        // this.buildSideFaces();
        // this.buildTopFace();

        return this.mesh;

        
    }

    // buildFrontAndRearFaces(
    //     // mesh: THREE.Group,
    //     // material: THREE.MeshPhongMaterial
    // ) {
    //     // Create the front face (a rectangle)
    //     let geometry = new THREE.PlaneGeometry(0.99, 1.0);
    //     let frontFace = new THREE.Mesh(geometry, this.material);
    //     frontFace.position.set(0.0, 0.5, 0.010);
    //     frontFace.castShadow = true;
    //     frontFace.receiveShadow = true;
    //     this.mesh.add(frontFace);

    //     // Create the rear face (a rectangle)
    //     let rearFace = new THREE.Mesh().copy(frontFace, false);
    //     rearFace.rotation.y = Math.PI;
    //     rearFace.position.set(0.0, 0.5, -0.010);
    //     this.mesh.add(rearFace);
    // }

    // buildSideFaces(
    //     // mesh: THREE.Group,
    //     // material: THREE.MeshPhongMaterial
    // ){
    //     // Create the two left faces (a four-triangle mesh)
    //     let points = new Float32Array([
    //         -0.49, 0.0, 0.01,
    //         -0.49, 1.0, 0.01,
    //         -0.5, 1.0, 0.0,
    //         -0.5, 0.0, 0.0,

    //         -0.5, 1.0, 0.0,
    //         -0.49, 1.0, -0.01,
    //         -0.49, 0.0, -0.01,
    //         -0.5, 0.0, 0.0
    //     ]);


    //     let normals = new Float32Array([
    //         -0.707, 0.0, 0.707,
    //         -0.707, 0.0, 0.707,
    //         -0.707, 0.0, 0.707,
    //         -0.707, 0.0, 0.707,

    //         -0.707, 0.0, -0.707,
    //         -0.707, 0.0, -0.707,
    //         -0.707, 0.0, -0.707,
    //         -0.707, 0.0, -0.707
    //     ]);

    //     let indices = [
    //         0, 1, 2,
    //         2, 3, 0,
    //         4, 5, 6,
    //         6, 7, 4
    //     ];

    //     const uvs = [
    //         //First triangle, of first face
    //         0.0, 1.0,
    //         0.0, 0.0,
    //         1.0, 1.0,
    //         //Second triangle, of first face
    //         0.0, 0.0,
    //         1.0, 0.0,
    //         1.0, 1.0,
    //         //…
    //         ];

    //     let geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3)); // itemSize = 3 because there are 3 values (X, Y and Z components) per vertex
    //     geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    //     geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array(uvs), 2 ));
    //     geometry.setIndex(indices);
    //     // material = new THREE.MeshPhongMaterial({ color: color });
    //     let rightFace = new THREE.Mesh(geometry, this.material);
    //     rightFace.castShadow = true;
    //     rightFace.receiveShadow = true;
    //     this.mesh.add(rightFace);

    //     // Create the two right faces (a four-triangle mesh)
    //     let leftFace = new THREE.Mesh().copy(rightFace, false);
    //     leftFace.rotation.y = Math.PI;
    //     this.mesh.add(leftFace);
    // }

    // buildTopFace(
    //     // mesh: THREE.Group,
    //     // material: THREE.MeshPhongMaterial
    // ){
    //     /* Create the top face (a four-triangle mesh)*/
    //     const points = new Float32Array([
    //         -0.5, 1.0, 0.0,
    //         -0.49, 1.0, 0.01,
    //         -0.49, 1.0, -0.01,
    //         0.49, 1.0, 0.01,
    //         0.49, 1.0, -0.01,
    //         0.5, 1.0, 0.0
    //     ]);
    //     const normals = new Float32Array([
    //         0.0, 1.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 1.0, 0.0,
    //     ]);
    //     const indices = [
    //         0, 1, 2,
    //         2, 1, 3,
    //         3, 4, 2,
    //         4, 3, 5
    //     ];

    //     const uvs = [
    //         //First triangle, of first face
    //         0.0, 1.0,
    //         0.0, 0.0,
    //         1.0, 1.0,
    //         //Second triangle, of first face
    //         0.0, 0.0,
    //         1.0, 0.0,
    //         1.0, 1.0,
    //         //…
    //         ];

    //     let geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3)); // itemSize = 3 because there are 3 values (X, Y and Z components) per vertex
    //     geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    //     geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array(uvs), 2 ));
    //     geometry.setIndex(indices);
    //     let topFace = new THREE.Mesh(geometry, this.material);
    //     topFace.castShadow = true;
    //     topFace.receiveShadow = true;
    //     this.mesh.add(topFace);
    // }
}