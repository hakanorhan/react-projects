import axios from "axios"
import { DivViewDetail } from "../../../../../themes/Theme";
import { PublishList } from "./PublishList";
import { useEffect, useState } from "react";
import { URLs } from "../../../../../constants/values";
import { Toaster } from "react-hot-toast";
import { notifyError } from "../../../../../helper/toastHelper";
import { scrollToTop } from "../../../../../helper/helper";

export default function PublishInserate() {
  const [listItems, setListItems] = useState<any[] | null>(null);

  scrollToTop();

  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${URLs.ORIGIN_SERVER}${URLs.FETCH_INSERATE_PUBLISH}`, { withCredentials: true })
        .then(response => { setListItems(response.data); })
        .catch(error => notifyError(error.response.data.messageId, error.response.data.message));
    };

    fetch();
  }, [])

  return (<>
  <Toaster />
    <DivViewDetail>
      <PublishList listItems={listItems} />
    </DivViewDetail>
    </>
  )
}
