import { render, screen } from '@testing-library/react';
import { SocialContentCard } from '@/components/Features';
import socialContentFactory from '@/__mocks__/factories/socialContent';

describe('SocialContentCard', () => {
  it('should render the content type, title and description', () => {
    const content = socialContentFactory();

    render(<SocialContentCard content={content} width={300} height={300} />);

    const title = screen.queryByText(content.title);
    const type = screen.queryByText(content.type);
    const desc = screen.queryByText(content.description || '');

    expect(title).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });

  it('should render background image if image is parsed', () => {
    const content = socialContentFactory({
      image: 'any',
    });

    render(<SocialContentCard content={content} width={300} height={300} />);

    const card = screen.queryByTestId('social-content-card');
    expect(card).toHaveStyle('background-image: url(any)');
  });

  it('should contains an link to the content', async () => {
    const content = socialContentFactory();

    render(<SocialContentCard content={content} width={300} height={300} />);

    const link = screen.queryByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', content.link);
  });

  it('should have specified width and height', async () => {
    const content = socialContentFactory();
    render(<SocialContentCard content={content} width={300} height={300} />);

    const card = screen.queryByTestId('social-content-card');
    expect(card).toHaveStyle('width: 300px');
    expect(card).toHaveStyle('height: 300px');
  });

  it('should have specified width and height in percents', async () => {
    const content = socialContentFactory();
    render(
      <SocialContentCard content={content} width={'30%'} height={'40%'} />
    );

    const card = screen.queryByTestId('social-content-card');
    expect(card).toHaveStyle('width: 30%');
    expect(card).toHaveStyle('height: 40%');
  });
});
