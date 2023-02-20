import { Point, Size } from '@native-ts/common';

export interface KeyboardLayout{
  point: Point;
  size: Size;
}

export type Line = [ Point, Point ];