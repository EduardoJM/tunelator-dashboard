import { FC } from 'react';
import {
    Checkbox as ChakraCheckbox,
    CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';

export interface CheckboxProps extends ChakraCheckboxProps {}

const Checkbox: FC<CheckboxProps> = ({...props}) => {
    return (
        <ChakraCheckbox
            colorScheme="brand"
            focusBorderColor="red"
            {...props}
        />
    );
}

export default Checkbox;
