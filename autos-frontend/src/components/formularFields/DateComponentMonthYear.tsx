import { DatePicker, DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import 'dayjs/locale/de';
import { useState } from 'react';

export default function DateComponentMonthYear({ setYear, setMonth }) {

    const theme = useTheme();
    const isLGDown = useMediaQuery(theme.breakpoints.down('lg'));

    const [open, setOpen] = useState(false);

    const handleOnChange = (date) => {  
        setYear(date ? date.year() : null);
        setMonth(date ? date.month() + 1 : null);
        console.log(date ? date.month() + 1 : null);
        console.log(date ? date.year() : null);
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
      <DemoContainer sx={{ padding: 0 }}
        components={[
          'DesktopDatePicker',
        ]}
      >
        <DemoItem>
          <DesktopDatePicker sx={{ width: isLGDown ? '100%' : '416px' }}
           
            views={['month', 'year']}
            maxDate={dayjs()}
            onChange={handleOnChange}
            slotProps={{ textField: { onClick: open ? ()=> setOpen(false) : () =>setOpen(true) ,  placeholder: 'Erstzulassung: MM/YYYY' } }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            
        />
        </DemoItem>
       </DemoContainer>
    </LocalizationProvider>
  );
}
