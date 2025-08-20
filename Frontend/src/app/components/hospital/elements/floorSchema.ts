import * as THREE from 'three';
import { Wall } from './wall';
import { Door } from './door';
import { size } from 'node_modules/cypress/types/lodash';

export class FloorSchema {

    object!: THREE.Group;

    build(
        schema: number[][],

        wallTextureUrl: string,
        wallColor: number,
        
        doorFrameTextureUrl: string,
        doorFrameColor: number,

        doorFrontTextureUrl: string,
        doorRearTextureUrl: string,
        doorColor: number,
    ): THREE.Group {

        this.object = new THREE.Group();
        // const sizeX = schema[0].length - 1;
        // const sizeZ = schema.length - 1;

        this.buildWalls(
            schema,
            wallTextureUrl,
            wallColor,
        );

        this.buildDoors(
            schema,
            doorFrameColor,
            doorColor,
            doorFrameTextureUrl,
            doorFrontTextureUrl,
            doorRearTextureUrl,
        )

        return this.object;
    }

    buildWalls(
        schema: number[][],
        wallTextureUrl: string,
        wallColor: number,
    ) {
        const sizeX = schema[0].length - 1;
        const sizeZ = schema.length - 1;

        const wallTemplate = new Wall().build(
            1,
            1,
            0.05,
            wallTextureUrl,
            wallColor,
        );

        let wallObject;
        for (let x = 0; x <= sizeZ; x++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
            for (let z = 0; z <= sizeX; z++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                /*
                 * description.map[][] | North wall | West wall
                 * --------------------+------------+-----------
                 *          0          |     No     |     No
                 *          1          |     No     |    Yes
                 *          2          |    Yes     |     No
                 *          3          |    Yes     |    Yes
                 */
                //west wall
                if (schema[x][z] == 1 || schema[x][z] == 3) {
                    wallObject = wallTemplate.clone();
                    wallObject.rotateY(Math.PI / 2.0);
                    wallObject.position.set(z - sizeX / 2.0, 0, x - sizeZ / 2.0 + 0.5);
                    this.object.add(wallObject);
                }

                //north wall
                if (schema[x][z] == 2 || schema[x][z] == 3) {
                    wallObject = wallTemplate.clone();
                    wallObject.position.set(z - sizeX / 2.0 + 0.5, 0, x - sizeZ / 2.0);
                    this.object.add(wallObject);
                }
            }
        }
    }

    buildDoors(
        schema: number[][],
        doorFrameColor: number,
        doorColor: number,
        doorFrameTextureUrl: string,
        doorFrontTextureUrl: string,
        doorRearTextureUrl: string,
    ) {
        const sizeX = schema[0].length - 1;
        const sizeZ = schema.length - 1;
        
        const doorTemplate = new Door().build(
            doorFrameColor,
            doorColor,
            doorFrameTextureUrl,
            doorFrontTextureUrl,
            doorRearTextureUrl,
            { width: 1, height: 1, depth: 0.06 },
        );

        let doorObject;
        for (let x = 0; x <= sizeZ; x++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
            for (let z = 0; z <= sizeX; z++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                /*
                 * description.map[][] | North wall | West wall
                 * --------------------+------------+-----------
                 *          1.1        |     No     |    Yes
                 *          2.1        |    Yes     |     No
                 */
                //west wall
                if (schema[x][z] == 1.1) {
                    doorObject = doorTemplate.clone();
                    doorObject.rotateY(Math.PI / 2.0);
                    doorObject.position.set(z - sizeX / 2.0, 0, x - sizeZ / 2.0 + 0.5);
                    this.object.add(doorObject);
                }

                //north wall
                if (schema[x][z] == 2.1) {
                    doorObject = doorTemplate.clone();
                    doorObject.position.set(z - sizeX / 2.0 + 0.5, 0, x - sizeZ / 2.0);
                    this.object.add(doorObject);
                }
            }
        }
    }
}