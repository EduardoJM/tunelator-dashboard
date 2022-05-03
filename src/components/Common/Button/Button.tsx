import { FC, useMemo, forwardRef } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonVariantProps = Partial<ChakraButtonProps>;

export type ButtonVariant =
  | 'primaryRounded'
  | 'primary'
  | 'ghost'
  | 'fullGhost'
  | 'sidenavButton'
  | 'destroy'
  | 'pagination';

type ButtonVariantMapping = {
  [key in ButtonVariant]: ButtonVariantProps;
};

const CustomButtonVariantMapping: ButtonVariantMapping = {
  primaryRounded: {
    borderRadius: '50px',
    colorScheme: 'brand',
  },
  primary: {
    colorScheme: 'brand',
    fontWeight: 'normal',
  },
  ghost: {
    variant: 'ghost',
  },
  fullGhost: {
    variant: 'ghost',
    _hover: { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
    _active: { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
  },
  sidenavButton: {
    variant: 'ghost',
    width: '100%',
    justifyContent: 'flex-start',
    _hover: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    _active: { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
  },
  destroy: {
    colorScheme: 'red',
    fontWeight: 'normal',
  },
  pagination: {
    colorScheme: 'brand',
    _active: {
      backgroundColor: 'brand.500',
      color: 'white',
      borderColor: 'brand.500',
      borderWidth: '1px',
    },
  },
};

export interface ButtonProps extends ChakraButtonProps {
  variant: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, ...props }, ref) => {
    const mergedProps = useMemo(() => {
      if (
        !Object.prototype.hasOwnProperty.call(
          CustomButtonVariantMapping,
          variant
        )
      ) {
        return props;
      }
      return {
        ...props,
        ...CustomButtonVariantMapping[variant],
      };
    }, [variant, props]);

    return <ChakraButton ref={ref} {...mergedProps} />;
  }
);

export default Button;
