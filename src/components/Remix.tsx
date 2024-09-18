import createIconSet from '@expo/vector-icons/createIconSet';
import { Asset } from 'expo-asset';
import fontAssetId from 'remixicon/fonts/remixicon.ttf';

import glyphMap from 'virtual:remixicon-glyph-map';

export type IconName = keyof typeof glyphMap;

const asset = Asset.fromModule(fontAssetId);

export const Remix = createIconSet(glyphMap, 'remixicon', asset.uri);
