import { FC, useMemo } from 'react';

export interface DateTimeProps {
  value: string;
}

const DateTime: FC<DateTimeProps> = ({ value }) => {
  const formatedValue = useMemo(() => {
    const date = new Date(value);
    if (isNaN(Date.parse(value))) {
      return '';
    }
    const dateString = date.toLocaleDateString('pt-BR', { dateStyle: 'long' });
    const timeString = date.toLocaleTimeString('pt-BR', { timeStyle: 'short' });
    return `${dateString} às ${timeString}`;
  }, [value]);

  return <>{formatedValue}</>;
};

export default DateTime;
