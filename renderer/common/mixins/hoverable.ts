import React from "react";

interface IHoverableElementProps {
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
}

interface IStyle {
  color?: string;
  backgroundColor?: string;
}

export const hoverable = (params: IStyle): IHoverableElementProps => {
  let previousStyle: string | undefined;

  return {
    onMouseEnter: (element) => {
      Object.keys(params).forEach((key) => {
        const typedKey = key as keyof IStyle;
        const styleContainer = element.currentTarget.style as { [K in keyof IStyle]: string};

        previousStyle = styleContainer[typedKey];
        styleContainer[typedKey] = params[typedKey];
      });

      return;
    },
    onMouseLeave: (element) => {
      Object.keys(params).forEach((key) => {
        const typedKey = key as keyof IStyle;
        const styleContainer = element.currentTarget.style as { [K in keyof IStyle]: string};

        styleContainer[typedKey] = previousStyle;
      });
    },
  };
};
