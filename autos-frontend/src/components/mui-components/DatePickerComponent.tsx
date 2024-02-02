import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
          <DatePicker sx={{ width:'100%' }} defaultValue={dayjs('2022-04-17')} />
        
    </LocalizationProvider>
  );
}