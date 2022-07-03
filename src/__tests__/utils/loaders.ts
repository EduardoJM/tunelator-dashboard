import { waitFor, screen } from '@testing-library/react';

export const waitAbsoluteLoader = async () => waitFor(() => {
    const absoluteLoading = screen.queryByTestId('absolute-loading-overlay');
    expect(absoluteLoading).not.toBeInTheDocument();
});

export const waitDataFetchLoader = async () => waitFor(() => {
    const loaderIndicators = screen.queryAllByTestId('loading-indicator');
    expect(loaderIndicators).toHaveLength(0);
});
