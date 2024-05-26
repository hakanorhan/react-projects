import axios from "axios"
import { DivViewDetail } from "../../../../../themes/Theme";
import { PublishList } from "./PublishList";
import { useEffect, useState } from "react";
import { URLs } from "../../../../../enums/URLs";

export default function PublishInserate() {
  const [listItems, setListItems] = useState<any[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${URLs.ORIGIN_SERVER}${URLs.FETCH_INSERATE_PUBLISH}`, { withCredentials: true })
        .then(response => { setListItems(response.data); console.log(response.data) })
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
