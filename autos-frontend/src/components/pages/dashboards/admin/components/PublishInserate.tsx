import axios from "axios"
import { DivViewDetail } from "../../../../../themes/Theme";
import { PublishList } from "./PublishList";
import { useEffect, useState } from "react";
import { URLs } from "../../../../../constants/values";
import { Toaster } from "react-hot-toast";
import { notifyError } from "../../../../../helper/toastHelper";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

export default function PublishInserate() {
  const [listItems, setListItems] = useState<any[] | null>(null);
  const openValue = useSelector((state: RootState) => state.openClosePublishReducer.open);

  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${URLs.ORIGIN_SERVER}${URLs.FETCH_INSERATE_PUBLISH}`, { withCredentials: true })
        .then(response => { setListItems(response.data); })
        .catch(error => notifyError(error.response.data.messageId, error.response.data.message));
    };

    fetch();
  }, [ openValue ])

  return (<>
  <Toaster />
    <DivViewDetail>
      <PublishList listItems={listItems} />
    </DivViewDetail>
    </>
  )
}
