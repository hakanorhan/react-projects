import { useParams } from 'react-router-dom';

import ViewDetailGeneral from './ViewDetailGeneral';

const DetailSearchComponent = () =>  {
  const { id } = useParams();
   return <ViewDetailGeneral id={ id } /> 
}

export default DetailSearchComponent;