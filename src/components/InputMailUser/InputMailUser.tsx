import { FC } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputRightAddon,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';

export interface InputMailUserProps extends ChakraInputProps {
  label: string;
  id: string;
  domain?: string;
}

const InputMailUser: FC<InputMailUserProps> = ({ id, label, domain, ...props }) => {
  return (
    <FormControl>
      <FormLabel color="foreground.muted" htmlFor={id}>
        {label}
      </FormLabel>
      <InputGroup>
        <ChakraInput id={id} focusBorderColor="brand.500" {...props} />
        <InputRightAddon children={domain || '@tunelator.com.br'} />
      </InputGroup>
    </FormControl>
  );
};

export default InputMailUser;
