import * as yup from 'yup';
import { getErrorMessages, fieldsMapping } from './errors';

describe('errors', () => {
  it('must return an default error if error is not an yup ValidationError and not contains response', () => {
    const messages = getErrorMessages('any other thing');

    expect(messages).toMatchObject([
      {
        text: 'Não foi possível completar a operação.',
        title: 'Oopps!',
      },
    ]);
  });

  it('must return an list of the messages from the yup if error is an yup ValidationError', async () => {
    const schema = yup.object({
      firstField: yup.string().required('firstField is required'),
      data: yup
        .array(yup.string().oneOf(['first', 'last'], 'must first or last'))
        .required(),
    });

    const data = {};

    const error = await new Promise(async (resolve, reject) => {
      try {
        await schema.validate(data, { abortEarly: false });
        reject('parsed');
      } catch (err) {
        resolve(err);
      }
    });

    const message = getErrorMessages(error);

    expect(message).toMatchObject([
      {
        text: 'firstField is required',
        title: 'Oopps!',
      },
      {
        text: 'data is a required field',
        title: 'Oopps!',
      },
    ]);
  });

  it('must return an default error if response is parsed and the response data is an string', () => {
    const response = {
      data: 'this is the document response',
    };

    const error = new Error();
    (error as any).response = response;

    const messages = getErrorMessages(error);

    expect(messages).toMatchObject([
      {
        text: 'Não foi possível completar a operação.',
        title: 'Oopps!',
      },
    ]);
  });

  it('must return an error with the detail string if the detail field is sent into response data', () => {
    const response = {
      data: {
        detail: 'this is the detail',
      },
    };

    const error = new Error();
    (error as any).response = response;

    const messages = getErrorMessages(error);

    expect(messages).toMatchObject([
      {
        text: 'this is the detail',
        title: 'Oopps!',
      },
    ]);
  });

  it('must return an error array with the validation errors if no detail was sent', () => {
    const response = {
      data: {
        field1: 'this is the field1 error',
        field2: 'this is the field2 error',
      },
    };

    const error = new Error();
    (error as any).response = response;

    const messages = getErrorMessages(error);

    expect(messages).toMatchObject([
      {
        text: 'this is the field1 error',
        title: 'field1',
      },
      {
        text: 'this is the field2 error',
        title: 'field2',
      },
    ]);
  });

  it('must change the title from the name of the fields from the fieldsMapping', () => {
    const data = Object.keys(fieldsMapping).reduce(
      (prev, value) => ({
        ...prev,
        [value]: `this is the field ${value} error`,
      }),
      {}
    );

    const expectedResponse = Object.keys(fieldsMapping).map(key => ({
      text: `this is the field ${key} error`,
      title: String((fieldsMapping as any)[key]),
    }));

    const response = { data };

    const error = new Error();
    (error as any).response = response;

    const messages = getErrorMessages(error);

    expect(messages).toMatchObject(expectedResponse);
  });
});
