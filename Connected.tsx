import React, { FC } from 'react';
import { View } from 'react-native';

import { Point } from '@native-ts/common';
import Rotate from '@native-ts/rotate';

import { UNLOCK_SCREEN_DEFAULT_COLOR } from './constants';

export interface ConnectedProps{
  start: Point;
  end: Point;
  color?: string;
}

const Connected: FC<ConnectedProps> = props => {

  const { color = UNLOCK_SCREEN_DEFAULT_COLOR, start, end } = props;

  const isVertical = start.x === end.x;
  const isHorizontal = start.y === end.y;
  const distance = start.distance(end);
  const width = isVertical ? 4 : distance;
  const height = isVertical ? distance : 4;

  if (isVertical || isHorizontal) {
    return (
      <View
        style={{
          width,
          height,
          backgroundColor: color,
          position: 'absolute',
          top: start.y,
          left: start.x
        }}
      />
    );
  }

  return (
    <Rotate
      size={{ width, height: 4 }}
      anchor={ new Point() }
      defaultAngle={ start.angle(end) }
      style={{
        position: 'absolute',
        top: start.y,
        left: start.x
      }}
    >
      <View style={{ height: 4, width, backgroundColor: color }} />
    </Rotate>
  );
}

Connected.displayName = 'UnlockScreen.Connected';
export default Connected;
