import { waitFor, screen } from '@testing-library/react';

export const waitAbsoluteLoader = async (retries = 3) => {
  for (let i = 0; i < retries; i += 1) {
    await waitFor(() => {
      const absoluteLoading = screen.queryAllByTestId(
        'absolute-loading-overlay'
      );
      expect(absoluteLoading).toHaveLength(0);
    });
  }
};

export const waitTableSkeleton = async () => {
  await waitFor(() => {
    const tableSkeleton = screen.queryAllByTestId('table-skeleton');
    expect(tableSkeleton).toHaveLength(0);
  });
};

export const waitForTime = async (time: number) => {
  await new Promise(resolve => setTimeout(resolve, time));
};

export const waitForAlertInScreen = async () => {
  await waitFor(() => {
    expect(screen.queryByRole('alert')).toBeInTheDocument();
  });

  const element = screen.getByRole('alert');
  const title = element.querySelector('.chakra-alert__title')?.textContent;
  const description = element.querySelector('.chakra-alert__desc')?.textContent;
  return { title, description };
};
