import React, { useEffect, useState } from 'react'
import { DivSearchInserate } from '../../themes/ThemeColor'
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { AxiosDetailsearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import CarImages from './dashboards/admin/components/CarImages';

interface ViewCarComponentProps {
    id: number | null
}

const ViewCarComponent: React.FC<ViewCarComponentProps> = ({ id }) => {
    
    const [listValues, setListValues] = useState([]);
    
    useEffect(() => {
        // valid brand
        const fetchData = async() => {   
          // Detail search
          await axios.get<AxiosDetailsearch>(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_DETAIL_SEARCH + `/${id}`, { withCredentials: true })
                
          .then(response => { 
            const axiosData: AxiosDetailsearch = response.data;
            alert(axiosData.model)    
            //setListValues(response.data.car);
                 })
                 .catch(error => console.log(error))
                }
        //fetchData();
        }, [])

    return (
    <DivSearchInserate>
        <CarImages />
    </DivSearchInserate>
  )
}

export default ViewCarComponent;
