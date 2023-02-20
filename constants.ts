import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const WINDOW_WIDTH = width;

export const WINDOW_HEIGHT = height;

export const UNLOCK_SCREEN_DEFAULT_COLOR = '#333';

export const UNLOCK_SCREEN_DEFAULT_KEYBOARD_SIZE = 90;

export const UNLOCK_SCREEN_DEFAULT_VARIANT = 'dotted'; // number | dotted

export const UNLOCK_SCREEN_DEFAULT_VALUE_LENGTH = 6;