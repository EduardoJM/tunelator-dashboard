import { FC, useEffect } from 'react';
import { CreatingMailBox } from '@/components';
import { getMailAccountById } from '@/services/api/mailAccounts';

export interface WaitMailAccountDoneProps {
  accountId: number;
  onAccountIsDone: () => void;
}

const WaitMailAccountDone: FC<WaitMailAccountDoneProps> = ({
  accountId,
  onAccountIsDone,
}) => {
  useEffect(() => {
    const checkForDone = async () => {
      const data = await getMailAccountById(accountId);

      if (!!data.mail) {
        onAccountIsDone();
      }
    };

    const interval = setTimeout(checkForDone, 2000);

    checkForDone();

    return () => {
      clearTimeout(interval);
    };
  }, [accountId, onAccountIsDone]);

  return <CreatingMailBox />;
};

export default WaitMailAccountDone;
