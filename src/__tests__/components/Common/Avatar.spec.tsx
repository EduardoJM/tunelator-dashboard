import { render, screen } from '@testing-library/react';
import userFactory from '@/__mocks__/factories/user';
import { Avatar } from '@/components/Common';

describe('Avatar', () => {
  it('shold render a "avatar" element', () => {
    const user = userFactory();
    render(<Avatar user={user} />);

    const avatar = screen.queryByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('should render the first letter of the e-mail in uppercase if first_name is not provided', () => {
    const user = userFactory({ first_name: '' });
    render(<Avatar user={user} />);

    const regex = new RegExp(`^${user.email[0].toUpperCase()}$`);
    expect(screen.queryByText(regex)).toBeInTheDocument();
  });

  it('should render the first letter of the first_name if last_name is not provided', () => {
    const user = userFactory({ last_name: '' });
    render(<Avatar user={user} />);

    const regex = new RegExp(`^${user.first_name[0].toUpperCase()}$`);
    expect(screen.queryByText(regex)).toBeInTheDocument();
  });

  it('should render the first letter of the first_name and the first letter of the last_name if both is provided', () => {
    const user = userFactory();
    render(<Avatar user={user} />);

    const regex = new RegExp(
      `^${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}$`
    );
    expect(screen.queryByText(regex)).toBeInTheDocument();
  });
});
