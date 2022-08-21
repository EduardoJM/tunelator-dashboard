import { Component, ErrorInfo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { withTranslation } from 'react-i18next';
import { BiSad } from 'react-icons/bi';

interface Props {
  t: (key: string) => string;
}

class ReceivedMailsBoundary extends Component<Props, {}> {
  state = {
    error: null,
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error });
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }
    const { t } = this.props;
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minH="200px"
        backgroundColor="#EEE"
        data-testid="received-mails-boundary"
      >
        <BiSad size="60px" />
        <Text mt="20px" fontSize="md" fontWeight="bold">
          {t('boundaries.received')}
        </Text>
      </Flex>
    );
  }
}

export default withTranslation()(ReceivedMailsBoundary);
