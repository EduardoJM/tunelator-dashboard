import { FC, useEffect } from 'react';
import { getMailAccountById } from '../../../services/api/mailAccounts';
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
      const data = await getMailAccountById(accountId);

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
