import kaabaIcon from "@/assets/icons/meccan.png";
import qubaaIcon from "@/assets/icons/median.png";
import holyIcon from "@/assets/icons/holy.jpg";
import homeIcon from "@/assets/icons/home.png";
import splitIcon from "@/assets/icons/split.png";
import mainIcon from "@/assets/images/logo.png";

import { Platform } from 'react-native';

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});


export const icons = {
    kaaba: kaabaIcon,
    qubaa: qubaaIcon,
    holy: holyIcon,
    home: homeIcon,
    split: splitIcon,
    icon: mainIcon
}