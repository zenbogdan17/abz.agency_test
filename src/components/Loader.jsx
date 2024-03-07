import { BeatLoader } from 'react-spinners';

import './../styles/loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <BeatLoader color="#f4e041" />
    </div>
  );
};

export default Loader;
