import { useParams } from 'react-router-dom';

import ViewDetailGeneral from './ViewDetailGeneral';

const ViewDetailSearch = () =>  {
  const { id } = useParams();
  
   return <ViewDetailGeneral id={ id } multiple={true}/> 
}

export default ViewDetailSearch;