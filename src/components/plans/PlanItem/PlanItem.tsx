import { FC } from 'react';
import { Box, Stack, HStack, Heading, Text } from '@chakra-ui/react';
import { Plan, PlanType } from '../../../entities/Plan';
import { CentsPrice } from '../../display';

export interface PlanItemProps {
    item: Plan;
    previewOnly?: boolean;
    selected?: boolean;
    onSelect?: () => void;
}

export const PlanItem: FC<PlanItemProps> = (props) => {
    const {
        item,
        previewOnly = true,
        selected = false,
        onSelect
    } = props;

    return (
        <Box p={5} borderRadius={4} bg='paper' color='paperColor' borderWidth="1px">
            <Stack>
                <Heading as="h2" size="md" fontWeight="light">
                    {item.name}
                </Heading>
                <HStack>
                    <Heading as="h1" size="xl" fontWeight="normal">
                        <CentsPrice value={item.monthly_price} />
                    </Heading>
                    <Text color="paperColorMuted" fontSize="lg" fontWeight="light">/ mês</Text>
                </HStack>
            </Stack>
        </Box>
    );
};
