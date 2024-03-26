import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

const RecoilObserver = ({ node, onChange }: { node: any, onChange: any }) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

const starClickHandler = jest.fn();

const mockFetch = (data: any, type?: string) => {
  switch (type) {
    case 'reject':
      return jest.fn().mockImplementation(() => Promise.reject(new Error('Something went wrong')));
    case 'resolve':
    default:
      return jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => data,
      }));
  }
};

const localStorageMock = {
  store: {},
  getItem(key: string) {
    // @ts-ignore
    return this.store[key];
  },
  setItem(key: string, value: any) {
    // @ts-ignore
    this.store[key] = value;
  },
  get localStorage() {
    return this.store;
  },
  removeItem(key: string) {
    // @ts-ignore
    delete this.store[key];
  },
};

export {
  RecoilObserver,
  starClickHandler,
  mockFetch,
  localStorageMock,
};
