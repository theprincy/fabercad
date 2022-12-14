import {MObject} from './mobject';
import {MFace} from "./mface";
import {MSketchObject} from "./msketchObject";
import {EntityKind} from "cad/model/entities";

export class MLoop extends MObject {
  
  static TYPE = EntityKind.LOOP;

  constructor(id) {
    super(MLoop.TYPE, id);
  }

  get parent() {
    return null;
  }
}

export class MSketchLoop extends MLoop {
  face: MFace;
  sketchObjects: MSketchObject[];
  contour: any;

  constructor(id, face, sketchObjects, contour) {
    super(id);
    this.face = face;
    this.sketchObjects = sketchObjects;
    this.contour = contour;
  }

  get parent() {
    return this.face;
  }

}

