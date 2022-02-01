import { useContext } from 'react';
import { OneshotContext } from '../contexts/OneshotContext';

const useOneshot = () => useContext(OneshotContext);

export default useOneshot;
