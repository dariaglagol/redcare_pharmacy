import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { languageListQuery } from '../states/state.ts';

const useLanguageSelect = () => {
  const [langList, setLangList] = useState<string[]>([]);

  const langRepoList = useRecoilValue(languageListQuery);

  useEffect(() => {
    setLangList([...langRepoList]);
  }, [langRepoList]);

  return { langList };
};

export default useLanguageSelect;
