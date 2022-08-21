import { FC } from 'react';
import { render, screen, act as defaultAct } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  LoadingContextData,
  LoadingProvider,
  useLoading,
} from '@/contexts/loading';

const Wrapper: FC = ({ children }) => (
  <LoadingProvider>{children}</LoadingProvider>
);

describe('contexts/loading', () => {
  it('should isLoading to be true if pushed one loading', async () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toEqual(false);

    act(() => {
      result.current.pushLoading();
    });

    expect(result.current.isLoading).toEqual(true);
  });

  it('should isLoading to be false if pushed and poped one loading', async () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toEqual(false);

    act(() => {
      result.current.pushLoading();
    });

    expect(result.current.isLoading).toEqual(true);

    act(() => {
      result.current.popLoading();
    });

    expect(result.current.isLoading).toEqual(false);
  });

  it('should isLoading adequate for multiple push and pop loadings', async () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toEqual(false);

    act(() => {
      result.current.pushLoading();
      result.current.pushLoading();
      result.current.pushLoading();
    });

    expect(result.current.isLoading).toEqual(true);

    act(() => {
      result.current.popLoading();
    });

    expect(result.current.isLoading).toEqual(true);

    act(() => {
      result.current.popLoading();
    });

    expect(result.current.isLoading).toEqual(true);

    act(() => {
      result.current.popLoading();
    });

    expect(result.current.isLoading).toEqual(false);
  });

  it('should an fixed absolute loading not rendered when isLoading is set to false', () => {
    render(<></>, { wrapper: Wrapper });

    expect(screen.queryByTestId('absolute-loading-overlay')).toBeNull();
  });

  it('should an fixed absolute loading rendered when isLoading is set to true', () => {
    let loading: LoadingContextData;

    const Element = () => {
      loading = useLoading();

      return <></>;
    };

    render(<Element />, { wrapper: Wrapper });

    defaultAct(() => {
      loading.pushLoading();
    });

    expect(screen.queryByTestId('absolute-loading-overlay')).not.toBeNull();
  });
});
