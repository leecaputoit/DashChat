// @flow

import { withTheme } from "react-native-elements";
import colors from "../../src/styles/colors"

export default () => {
  const labelTheme = {
    '.focused': {
      width: 0
    },
    fontSize: 17,
    color: colors.white,
  };

  return labelTheme;
};
