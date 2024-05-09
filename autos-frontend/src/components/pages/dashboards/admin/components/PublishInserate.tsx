import axios from "axios"
import { DivViewDetail } from "../../../../../themes/ThemeColor";
import { PublishList } from "./PublishList";
import { useEffect, useState } from "react";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";

export default function PublishInserate() {
  const [listItems, setListItems] = useState<any[] | null>(null);
  
  useEffect(() => {
    alert("Publish List");
    const fetch = async() => {
    await axios.get(`${URLs.ORIGIN_SERVER}${URLs.FETCH_INSERATE_PUBLISH}`, { withCredentials: true })
    .then(response => {setListItems(response.data); console.log(response.data)})
    .catch(error => console.log(error))
    };
    
    fetch();
  }, [])

  return (
    <DivViewDetail>
      <PublishList listItems={listItems} />
    </DivViewDetail>
  )
}
