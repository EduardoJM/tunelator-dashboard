import { waitFor, screen } from '@testing-library/react';

export const waitForAlertInScreen = async () => {
  await waitFor(() => {
    expect(screen.queryByRole('alert')).toBeInTheDocument();
  });

  const element = screen.getByRole('alert');
  const title = element.querySelector('.chakra-alert__title')?.textContent;
  const description = element.querySelector('.chakra-alert__desc')?.textContent;
  return { title, description };
};
