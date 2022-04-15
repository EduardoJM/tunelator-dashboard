import { FC, useMemo } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

type ButtonVariantProps = Partial<ChakraButtonProps>;

export type ButtonVariant = "primary-rounded" | "primary";

type ButtonVariantMapping = {
  [key in ButtonVariant]: ButtonVariantProps;
};

const CustomButtonVariantMapping: ButtonVariantMapping = {
  "primary-rounded": {
    borderRadius: "50px",
    colorScheme: "brand",
  },
  primary: {
    colorScheme: "brand",
    fontWeight: "normal",
  },
};

export interface ButtonProps extends ChakraButtonProps {
  variant: ButtonVariant;
}

const Button: FC<ButtonProps> = ({ variant, ...props }) => {
  const mergedProps = useMemo(() => {
    if (
      !Object.prototype.hasOwnProperty.call(CustomButtonVariantMapping, variant)
    ) {
      return props;
    }
    return {
      ...props,
      ...CustomButtonVariantMapping[variant],
    };
  }, [variant, props]);

  return <ChakraButton {...mergedProps} />;
};

export default Button;
