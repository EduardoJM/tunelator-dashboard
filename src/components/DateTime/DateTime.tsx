import { FC, useMemo } from "react";

export interface DateTimeProps {
  value: string;
}

const DateTime: FC<DateTimeProps> = ({ value }) => {
  const formatedValue = useMemo(() => {
    const date = new Date(value);
    return date.toLocaleString("pt-BR");
  }, [value]);

  return <>{formatedValue}</>;
};

export default DateTime;
