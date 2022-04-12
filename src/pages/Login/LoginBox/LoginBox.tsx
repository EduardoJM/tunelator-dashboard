import { FC } from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';

const LoginBox: FC = () => {
    return (
        <Box
            width="100%"
            maxWidth="450px"
            color="foreground.muted"
        >
            <VStack>
                <Heading width="100%" color="foreground.default" as="h1" size="2xl">Entrar</Heading>

                <Box pb="20px">
                    <Text>Gerenciar seus e-mails de redirecionamentos e acesso simplificado para e-mails.</Text>
                </Box>

                <Input id="email" label="E-mail" placeholder="exemplo@exemplo.com.br" />
                <Input id="password" label="Senha" placeholder="Digite sua senha" />

                <Flex width="100%" pb="20px">
                    <Checkbox defaultChecked>Mantenha-me logado</Checkbox>
                    <Spacer />
                    <Text>Esqueceu sua senha?</Text>
                </Flex>

                <Button width="100%" variant="primary-rounded">Entrar</Button>
            </VStack>
        </Box>
    );
};

export default LoginBox;
