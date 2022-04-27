import { FC, useMemo } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonVariantProps = Partial<ChakraButtonProps>;

export type ButtonVariant =
  | 'primary-rounded'
  | 'primary'
  | 'ghost'
  | 'full-ghost'
  | 'sidenav-button'
  | 'destroy';

type ButtonVariantMapping = {
  [key in ButtonVariant]: ButtonVariantProps;
};

const CustomButtonVariantMapping: ButtonVariantMapping = {
  'primary-rounded': {
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
  'full-ghost': {
    variant: 'ghost',
    _hover: { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
    _active: { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
  },
  'sidenav-button': {
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
