import { useQuery } from 'react-query';
import { getLatestSocialContents } from '../api/socialContent';

const useLatestSocialContents = () =>
  useQuery('latest-social-contents', getLatestSocialContents);

export default useLatestSocialContents;
