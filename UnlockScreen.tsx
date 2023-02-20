import React, { FC, useRef, useState } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

import { Point } from '@native-ts/common';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  UNLOCK_SCREEN_DEFAULT_KEYBOARD_SIZE
} from './constants';

import { KeyboardLayout, Line } from './types';

import Dot from './Dot';
import KeyboardButton from './KeyboardButton';
import ConnectLine, { ConnectLineRef } from './ConnectLine';
import Connected from './Connected';

export interface UnlockScreenProps extends ViewProps{
  acceptValue?: string;
  keyboardSize?: number;
  color?: string;
  dotSize?: number;
  dotSpacing?: number;
  maxLength?: number;
  message?: string;
  title?: string;
  variant?: 'number' | 'dotted';
}

const arrBtn = new Array(9).fill(null);

const UnlockScreen: FC<UnlockScreenProps> = props => {
  const {
    acceptValue,
    keyboardSize = UNLOCK_SCREEN_DEFAULT_KEYBOARD_SIZE,
    color = '#333',
    dotSize,
    dotSpacing,
    maxLength,
    message,
    title,
    variant,
    ...rest
  } = props;

  const pressing = useRef(false);
  const keyboardLayout = useRef<Record<number, KeyboardLayout>>({});
  const connect = useRef<ConnectLineRef>(null);
  const [ lines, setLines ] = useState<Line[]>([]);

  const handleLayoutKeyboardButton = (index: number) => (layout: KeyboardLayout) => {
    keyboardLayout.current[index] = layout;
    if (Object.keys(keyboardLayout.current).length === 9) {
      console.log(keyboardLayout.current)
    }
  };

  const handleTouchStartKeyboardButton = (index: number) => () => {
    if (pressing.current) {
      return;
    }

    pressing.current = true;
    console.log('handleTouchStartKeyboardButton')
    const layout = keyboardLayout.current[index];
    
    if (!layout) {
      return;
    }

    const start = new Point(
      layout.point.x + layout.size.width / 2,
      layout.point.y + layout.size.height / 2
    );
    console.log(start)
    
    setLines([[ start, start ]]);
  }

  const handleTouchMoveKeyboardButton = (point: Point) => {
    const [ start ] = lines[lines.length - 1];
    const end = new Point(start.x + point.x, start.y + point.y);
    setLines([ ...lines.slice(lines.length - 1), [ start, end ] ]);
    connect.current?.rotate(end);
  }
  console.log(lines)
  return (
    <View
      {...rest}
      style={[ rest.style, styles.root ]}
    >
      {!!title && (
        <Text style={ styles.title }>{ title }</Text>
      )}
      {!!message && (
        <Text style={ styles.message }>{ message }</Text>
      )}
      <View style={ styles.inputValue }>
        <Dot
          color={color}
          size={dotSize}
          spacing={dotSpacing}
          value="1"
        />
        <Dot
          color={color}
          size={dotSize}
          spacing={dotSpacing}
          value="1"
        />
        <Dot
          color={color}
          size={dotSize}
          spacing={dotSpacing}
          value="1"
        />
        <Dot
          color={color}
          size={dotSize}
          spacing={dotSpacing}
          value="1"
        />
        <Dot
          color={color}
          size={dotSize}
          spacing={dotSpacing}
          value="1"
        />
        <Dot
          color={color}
          size={dotSize}
          spacing={dotSpacing}
          value="1"
        />
      </View>
      <View style={styles.container}>
        <View style={[ styles.wrapper, { width: keyboardSize * 3 } ]}>
          {arrBtn.map((_, index) => (
            <KeyboardButton
                key={index}
              color={color}
              size={keyboardSize}
              value={index + 1}
              onLayout={handleLayoutKeyboardButton(index)}
              onTouchStart={handleTouchStartKeyboardButton(index)}
              onTouchMove={handleTouchMoveKeyboardButton}
            />
          ))}
        </View>
      </View>
      {lines.map((line, index) => (
        index === line.length - 1
          ? <ConnectLine key={index} ref={connect} start={line[0]} />
          : <Connected start={line[0]} end={line[1]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  message: {
    fontSize: 13,
    color: '#dc3545',
    marginBottom: 20,
    marginTop: -10
  },
  inputValue: {
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

UnlockScreen.displayName = 'UnlockScreen';
export default UnlockScreen;
