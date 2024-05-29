import { Box, Switch, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setMode } from "../redux/features/darkLightMode";

export default function DarkMode() {

  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.mode.mode);

  useEffect(() => {
    if (localStorage.getItem('cars.de.mode')) {
      const localStorageMode = localStorage.getItem('cars.de.mode');
      const valueLocalStorage = localStorageMode === 'dark';
      dispatch(setMode(valueLocalStorage));
    } else {
      localStorage.setItem('cars.de.mode', "light");
    }
  }, [])

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const localStorageMode = checked ? "dark" : "light";
    localStorage.setItem('cars.de.mode', localStorageMode);
    dispatch(setMode(checked));
  }

  return (<Box sx={{ '@media print': { display: 'none' }, '@media screen': { display: 'flex' }, color: 'whitesmoke' }}>

    {<Switch sx={{
      color: 'yellow', fill: 'yellow',
      '& .MuiSwitch-thumb': {
        color: 'whitesmoke'
      }
    }}

      checked={mode}
      onChange={handleChangeSwitch}
    />}
    <Typography sx={{ alignContent: 'center', color: 'primary.contrastText' }} variant="body1" component='p'> {mode ? "Dunkler Modus" : "Heller Modus"} </Typography>
  </Box>)
}