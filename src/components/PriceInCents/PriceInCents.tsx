import { FC, useMemo } from 'react';

export interface PriceInCentsProps {
  value: number;
}

const PriceInCents: FC<PriceInCentsProps> = ({ value }) => {
  const formatedValue = useMemo(() => {
    return (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, [value]);

  return <>{formatedValue}</>;
};

export default PriceInCents;
