import { FormControlLabel, Switch } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setMode } from "../redux/features/darkLightMode";

export default function DarkMode() {

  //const [mode, setMode] = useState<boolean | undefined>();

  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.mode.mode);
  
  useEffect(() => {
    if(localStorage.getItem('cars.de.mode')) {
      const localStorageMode = localStorage.getItem('cars.de.mode');
      const valueLocalStorage = localStorageMode === 'dark';
      dispatch(setMode(valueLocalStorage));
    }  else {
      localStorage.setItem('cars.de.mode', "light");
    }
  },[ ])

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const localStorageMode = checked ? "dark" : "light";
    localStorage.setItem('cars.de.mode', localStorageMode);
    dispatch(setMode(checked));
  }

  return (
    <FormControlLabel
      control={<Switch sx={{
      '& .MuiSwitch-thumb': {
        width: '20px',
        height: '20px',
        color: 'primary.contrastText',
        backgroundColor: 'primary.contrastText'
      },
      '& .MuiSwitch-track': {
        backgroundColor: 'white !important',
      },
      '& .Mui-checked .MuiSwitch-track': {
        backgroundColor: 'white !important',
      },
      '& .Mui-checked .MuiSwitch-thumb': {
        backgroundColor: 'primary.contrastText',
      } }} 
      checked={ mode } 
      onChange={handleChangeSwitch} 
      />}
      label= { mode ? "Dunkler Modus" : "Heller Modus" }
    />
  )
}
