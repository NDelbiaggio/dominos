export enum FaceType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export interface Domino {
  faceLeft: string;
  faceLeftType: FaceType;
  faceRight: string;
  faceRightType: FaceType;
}
