import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export interface DotProps{
  color?: string;
  size?: number;
  spacing?: number;
  value?: string;
}

const Dot: FC<DotProps> = props => {

  const {
    color = '#333',
    size = 14,
    spacing = 16,
    value
  } = props;

  return (
    <View style={[
      styles.root,
      {
        width: size,
        height: size,
        marginHorizontal: spacing / 2,
        borderColor: color,
        borderRadius: size / 2
      },
      !!value && {
        backgroundColor: color
      }
    ]} />
  )

}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
  }
});

Dot.displayName = 'UnlockScreen.Dot';
export default Dot;
