import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from '@mui/material';
import { notifyError } from "../../../../../helper/toastHelper";
/* Hot Toast */
import { MainComponentWidth, mainComponentHeight } from "../../../../../themes/Theme";
import SelectField from "../../../../formularFields/SelectField";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_MODEL } from "../../../../../regex/REGEX";
import { RequestAxiosDataModel } from "../../../../../interfaces/types";
import TableNormal from "../../../../tables/TableNormal";
import { formularModelIsValid } from "../../../../../regex/validHelper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { fetchBrandModel, insertModel } from "../../../../../redux/features/carModelSlice";
import { scrollToTop } from "../../../../../helper/helper";

interface IFormModel {
  model: string
}

const initialModel: IFormModel = { model: "" };
// Components
const InsertModel = () => {

  const [form, setForm] = useState(initialModel);
  const [refresh, setRefresh] = useState(false);

  const brandValues = useSelector((state: RootState) => state.CarModelSlice.brands);
  const brandName = useSelector((state: RootState) => state.CarModelSlice.brandName);
  const modelValues = useSelector((state: RootState) => state.CarModelSlice.models);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedBrand, setSelectedBrand] = useState<string>("");

  scrollToTop();

  useEffect(() => {
    // valid brand
    dispatch(fetchBrandModel());
  }, [])

  const handleChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }
  useEffect(() => {
    if (modelValues.length > 0) {
      setForm(initialModel);
    }
  }, [modelValues])

  const handleChangeBrand = (event: SelectChangeEvent<string>) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRefresh(false);
    const axiosDataModel: RequestAxiosDataModel = {
      brandid: selectedBrand,
      model: form.model
    }

    if (!selectedBrand) {
      notifyError("brand", "Bitte wählen Sie eine Marke.")
    }
    else if (!formularModelIsValid(axiosDataModel.model)) {
      notifyError("model", "Bitte prüfen Sie das Modell-Feld.")
    } else {
      dispatch(insertModel(axiosDataModel));
    }
  }

  return <>
    <MainComponentWidth sx={{ height: modelValues.length > 0 ? 'auto' : mainComponentHeight }}>
      <form onSubmit={handleSubmit} noValidate>
        <SelectField values={brandValues} objectName="brand" idOfSelect="brandId" selectedValue={selectedBrand} handleChange={handleChangeBrand} label="Marke" />
        <TextFieldCars label="Modell" onChange={value => handleChange('model', value)} regex={REGEX_MODEL} refresh={refresh} />
        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
        {
          modelValues.length > 0 ? <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {"Alle Modelle zu " + brandName} </Typography> : ""
        }
        <TableNormal listValues={modelValues} />
      </form>

    </MainComponentWidth>
  </>
};

export default InsertModel;