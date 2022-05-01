import { FC } from 'react';
import {
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormLabel,
    FormControl
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
    label: string;
    id: string;
}

const Input: FC<InputProps> = ({id, label, ...props}) => {
    return (
        <FormControl>
            <FormLabel color="foreground.muted" htmlFor={id}>{label}</FormLabel>
            <ChakraInput id={id} focusBorderColor="brand.500" {...props} />
        </FormControl>
    );
};

export default Input;
