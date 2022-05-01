import { FC, useState } from 'react';
import {
  InputGroup,
  Input,
  InputProps,
  FormLabel,
  FormControl,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button } from '../../Common';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  label: string;
  id: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ id, label, ...props }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(currentVisible => !currentVisible);
  };

  return (
    <FormControl>
      <FormLabel color="foreground.muted" htmlFor={id}>
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          id={id}
          focusBorderColor="brand.500"
          type={visible ? 'text' : 'password'}
          {...props}
        />
        <InputRightElement>
          <Button p="11px" variant="fullGhost" onClick={toggleVisible}>
            {visible ? (
              <AiOutlineEyeInvisible size="24px" />
            ) : (
              <AiOutlineEye size="24px" />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
