import {createArrow} from 'scene/objects/auxiliary';
import Vector, {AXIS} from 'math/vector';
import {OnTopOfAll} from 'scene/materialMixins';
import {moveObject3D} from 'scene/objects/transform';

import * as SceneGraph from 'scene/sceneGraph';
import {setCsysToViewMatrix} from 'scene/objects/transform';
import {Object3D} from "three";

export default class CadScene {

  workGroup: Object3D;
  auxGroup: Object3D;
  basisGroup: Object3D;

  constructor(rootGroup) {
    this.workGroup = SceneGraph.createGroup();
    this.auxGroup = SceneGraph.createGroup();
    SceneGraph.addToGroup(rootGroup, this.workGroup);
    SceneGraph.addToGroup(rootGroup, this.auxGroup);

    this.setUpAxises();
    this.setUpBasisGroup();
  }

  setUpAxises() {
    const arrowLength = 1500;
    const createAxisArrow = createArrow.bind(null, arrowLength, 40, 16);
    const addAxis = (axis, color) => {
      const arrow = createAxisArrow(axis, color, 0.2);
      moveObject3D(arrow, axis.scale(-arrowLength * 0.5));
      SceneGraph.addToGroup(this.auxGroup, arrow);
    };

    addAxis(AXIS.X, 0xFF0000);
    addAxis(AXIS.Y, 0x00FF00);
    addAxis(AXIS.Z, 0x0000FF);
  }

  setUpBasisGroup() {
    const length = 200;
    const arrowLength = length * 0.2;
    const arrowHead = arrowLength * 0.4;

    const _createArrow = createArrow.bind(null, length, arrowLength, arrowHead);

    function createBasisArrow(axis, color) {
      return _createArrow(axis, color, 0.4, [OnTopOfAll]);
    }

    this.basisGroup = SceneGraph.createGroup();
    this.basisGroup.matrixAutoUpdate = false;

    const xAxis = createBasisArrow(new Vector(1, 0, 0), 0xFF0000);
    const yAxis = createBasisArrow(new Vector(0, 1, 0), 0x00FF00);
    SceneGraph.addToGroup(this.basisGroup, xAxis);
    SceneGraph.addToGroup(this.basisGroup, yAxis);
    SceneGraph.addToGroup(this.auxGroup, this.basisGroup);
    this.hideGlobalCsys();
  }

  updateGlobalCsys(csys) {
    setCsysToViewMatrix(csys, this.basisGroup.matrix);
    this.basisGroup.matrixWorldNeedsUpdate = true;
  }

  showGlobalCsys(csys) {
    this.updateGlobalCsys(csys);
    this.basisGroup.visible = true;
  }

  hideGlobalCsys() {
    this.basisGroup.visible = false;
  }
}