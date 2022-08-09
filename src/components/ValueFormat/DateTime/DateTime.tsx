import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface DateTimeProps {
  value: string;
}

const DateTime: FC<DateTimeProps> = ({ value }) => {
  const { t } = useTranslation();

  const formatedValue = useMemo(() => {
    const date = new Date(value);
    if (isNaN(Date.parse(value))) {
      return '';
    }
    const dateString = date.toLocaleDateString('pt-BR', { dateStyle: 'long' });
    const timeString = date.toLocaleTimeString('pt-BR', { timeStyle: 'short' });
    const separator = t('format.dateSeparator');
    return `${dateString}${separator}${timeString}`;
  }, [value]);

  return <>{formatedValue}</>;
};

export default DateTime;
