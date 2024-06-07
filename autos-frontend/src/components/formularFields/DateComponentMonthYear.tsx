import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import 'dayjs/locale/de';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface DateMonthYearProps {
  setYear: (date: number) => void;
  setMonth: (date: number) => void;
  newInserate: boolean
}

export const DateComponentMonthYear: React.FC<DateMonthYearProps> = ({ setYear, setMonth, newInserate }) => {

  const theme = useTheme();
  const isLGDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [value, setValue] = useState(dayjs);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(dayjs())
  }, [newInserate])

  const handleOnChange = (date: any) => {
    setYear(date ? date.year() : null);
    setMonth(date ? date.month() + 1 : null);
  }

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
        <DemoContainer sx={{ padding: 0, borderRadius: 0 }}
          components={[
            'DatePicker',
          ]}
        >
          <DemoItem>
            <DesktopDatePicker sx={{ paddingTop: '1rem', width: isLGDown ? '100%' : '416px' }}
              views={['month', 'year']}
              maxDate={dayjs()}
              onChange={handleOnChange}
              value={value}
              slotProps={{ textField: { variant: 'standard', onClick: open ? () => setOpen(false) : () => setOpen(true), placeholder: 'Erstzulassung: MM/YYYY' } }}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}

            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}