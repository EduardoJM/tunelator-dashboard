import { FC } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import DefaultInputMask, {
  BeforeMaskedStateChangeStates,
  InputState,
} from 'react-input-mask';

export interface InputMaskProps extends ChakraInputProps {
  label: string;
  id: string;
  mask: string | Array<string | RegExp>;
  maskPlaceholder?: string | null | undefined;
  alwaysShowMask?: boolean | undefined;
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  beforeMaskedStateChange?(states: BeforeMaskedStateChangeStates): InputState;
}

const InputMask: FC<InputMaskProps> = ({ id, label, ...props }) => {
  return (
    <FormControl>
      <FormLabel color="foreground.muted" htmlFor={id}>
        {label}
      </FormLabel>
      <ChakraInput
        as={DefaultInputMask}
        id={id}
        focusBorderColor="brand.500"
        {...props}
      />
    </FormControl>
  );
};

export default InputMask;
