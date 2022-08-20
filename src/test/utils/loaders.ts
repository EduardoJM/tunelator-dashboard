import { waitFor, screen } from '@testing-library/react';

export const waitAbsoluteLoader = async () =>
  waitFor(() => {
    const absoluteLoading = screen.queryAllByTestId('absolute-loading-overlay');
    expect(absoluteLoading).toHaveLength(0);
  });

export const waitTableSkeleton = async () =>
  waitFor(() => {
    const tableSkeleton = screen.queryAllByTestId('table-skeleton');
    expect(tableSkeleton).toHaveLength(0);
  });

export const waitDataFetchLoader = async () =>
  waitFor(() => {
    const loaderIndicators = screen.queryAllByTestId('loading-indicator');
    expect(loaderIndicators).toHaveLength(0);
  });

export const waitLoaders = async () => {
  await waitAbsoluteLoader();
  await waitDataFetchLoader();
};

export const waitForTime = async (time: number) => {
  await new Promise(resolve => setTimeout(resolve, time));
};
