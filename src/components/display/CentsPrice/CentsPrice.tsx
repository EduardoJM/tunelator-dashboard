import { FC, useMemo } from 'react';

export interface CentsPriceProps {
    value: number;
}

const CentsPrice: FC<CentsPriceProps> = ({value}) => {
    const formated = useMemo(() => {
        const valueBrl = value / 100;
        return valueBrl.toFixed(2);
    }, [value]);

    return <>R$ {formated}</>
};

export default CentsPrice;
