import { FC, ChangeEvent, KeyboardEvent } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputRightAddon,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { validKeys } from './validKeys';

export interface InputMailUserProps extends ChakraInputProps {
  label: string;
  id: string;
  domain?: string;
}

const InputMailUser: FC<InputMailUserProps> = ({
  id,
  label,
  domain,
  onChange,
  ...props
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toLowerCase();
    if (!!onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!validKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  };

  return (
    <FormControl>
      <FormLabel color="foreground.muted" htmlFor={id}>
        {label}
      </FormLabel>
      <InputGroup>
        <ChakraInput
          id={id}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          maxLength={20}
          focusBorderColor="brand.500"
          {...props}
        />
        <InputRightAddon children={domain || '@tunelator.com.br'} />
      </InputGroup>
    </FormControl>
  );
};

export default InputMailUser;
