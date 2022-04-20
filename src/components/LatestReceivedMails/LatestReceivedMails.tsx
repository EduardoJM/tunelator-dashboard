import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import * as mailServices from '../../services/mails';

const LatestReceivedMails: FC = () => {
  //const query = useQuery('latest')

  useEffect(() => {
    mailServices.getLatestReceivedMails();
  }, []);

  return <div></div>;
};

export default LatestReceivedMails;
