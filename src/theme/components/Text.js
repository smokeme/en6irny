import variable from "./../variables/platform";

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    ".note": {
      color: "#a7a7a7",
      fontSize: variables.noteFontSize
    },
    ".normal": {
      fontSize: variables.DefaultFontSize - 1,
      fontFamily: variables.fontFamily,
      color: variables.textColor,
    }
  };

  return textTheme;
};