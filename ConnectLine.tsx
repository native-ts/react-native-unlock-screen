import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { UNLOCK_SCREEN_DEFAULT_COLOR, WINDOW_HEIGHT } from './constants';

import { Point } from '@native-ts/common';
import Rotate, { RotateRef } from '@native-ts/rotate';

export interface ConnectLineRef{
  rotate(end: Point): void;
}

export interface ConnectLineProps{
  start: Point;
  color?: string;
}

const ConnectLine = forwardRef<ConnectLineRef, ConnectLineProps>(
  function ConnectLine(props, ref) {

    const { start, color = UNLOCK_SCREEN_DEFAULT_COLOR } = props;
    const rotate = useRef<RotateRef>(null);
    
    const animated = useRef(new Animated.Value(-WINDOW_HEIGHT));
    const composite = useRef<Animated.CompositeAnimation>();

    useImperativeHandle(ref, () => ({
      rotate(end) {
        rotate.current?.timing(start.angle(end), 1);
        composite.current && composite.current.stop();
        composite.current = Animated.timing(animated.current, {
          toValue: start.distance(end) - WINDOW_HEIGHT,
          duration: 1,
          easing: Easing.linear,
          useNativeDriver: true
        });
        composite.current.start();
      },
    }))

    const anchor = new Point();

    return (
      <Rotate
        ref={rotate}
        size={{ width: WINDOW_HEIGHT, height: 4 }} 
        anchor={ anchor }
        style={{
          position: 'absolute',
          top: start.y,
          left: start.x,
          overflow: 'hidden'
        }}
      >
        <Animated.View
          style={{
            height: 4,
            width: WINDOW_HEIGHT,
            backgroundColor: color,
            transform: [
              {
                translateX: animated.current
              }
            ]
          }}
        />
      </Rotate>
      // <Animated.View
      //   style={[
      //     styles.root,
      //     {
      //       left: start.x,
      //       top: start.y,
      //       backgroundColor: color,
      //       height: 4,
      //       width: start.distance(currentEnd),
      //       transform: [{
      //         rotate: `${start.angle(currentEnd)}deg`
      //       }]
      //     }
      //   ]}
      // />
    );
  }
);

const styles = StyleSheet.create({
  root: {
    position: 'absolute'
  }
});

ConnectLine.displayName = 'UnlockScreen.ConnectLine';
export default ConnectLine;
