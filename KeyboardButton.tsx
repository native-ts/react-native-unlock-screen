import React, { FC, useRef } from 'react';
import { PanResponder, StyleSheet , View} from 'react-native';

import { Point } from '@native-ts/common';

import {
  UNLOCK_SCREEN_DEFAULT_COLOR,
  UNLOCK_SCREEN_DEFAULT_KEYBOARD_SIZE,
  UNLOCK_SCREEN_DEFAULT_VARIANT,
} from './constants';
import { KeyboardLayout } from './types';

export interface KeyboardButtonProps{
  color?: string;
  size?: number;
  variant?: 'number' | 'dotted';
  value: number;
  onTouchStart?(): void;
  onTouchEnd?(): void;
  onTouchMove?(point: Point): void;
  onLayout?(e: KeyboardLayout): void;
}

const KeyboardButton: FC<KeyboardButtonProps> = props => {

  const {
    color = UNLOCK_SCREEN_DEFAULT_COLOR,
    size = UNLOCK_SCREEN_DEFAULT_KEYBOARD_SIZE,
    variant = UNLOCK_SCREEN_DEFAULT_VARIANT,
    onLayout,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = props;
  
  const keyboard = useRef<View>(null);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (e, { dx, dy }) => {
      onTouchMove?.(new Point(dx, dy));
    },
    onPanResponderRelease: () => {
      onTouchEnd?.();
    }
  });

  const handleLayout = () => {
    keyboard.current?.measureInWindow((x, y, width, height) => {
      onLayout?.({
        point: new Point(x, y),
        size: { width, height }
      })
    });
  }

  return (
    <View
      ref={keyboard}
      style={[
        styles.root,
        {
          width: size,
          height: size,
          borderColor: color,
          borderRadius: size / 2
        }
      ]}
      onTouchStart={onTouchStart}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
    >
      {variant === 'dotted'
        ? (
          <View style={[ styles.dotted, { backgroundColor: color } ]} />
        )
        : (
          <></>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotted: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
  }
});

KeyboardButton.displayName = 'UnlockScreen.KeyboardButton';
export default KeyboardButton;
