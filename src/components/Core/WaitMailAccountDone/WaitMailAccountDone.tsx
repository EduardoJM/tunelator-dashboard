import { FC, useEffect } from 'react';
import { getMailById } from '../../../services/mails';
import { CreatingMailBox } from '../../Placeholders';

export interface WaitMailAccountDoneProps {
  accountId: number;
  onAccountIsDone: () => void;
}

const WaitMailAccountDone: FC<WaitMailAccountDoneProps> = ({
  accountId,
  onAccountIsDone,
}) => {
  useEffect(() => {
    const interval = setTimeout(async () => {
      const data = await getMailById(accountId);

      if (!!data.mail) {
        onAccountIsDone();
      }
    }, 2000);

    return () => {
      clearTimeout(interval);
    };
  }, [accountId, onAccountIsDone]);

  return <CreatingMailBox />;
};

export default WaitMailAccountDone;
