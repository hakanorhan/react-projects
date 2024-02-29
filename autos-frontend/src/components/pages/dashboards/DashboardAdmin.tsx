import {useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AdminSignup from '../registerLogin/AdminSignup';

import * as ThemeColor from '../../../themes/ThemeColor';

export default function DashboardAdmin() {
  const [alignment, setAlignment] = useState('admin');
  const [alignmentProcess, setAlignmentProcess] = useState('create');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const handleChangeProcess = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignmentProcess(newAlignment);
  };

  return (
    <div>
    <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
    <ToggleButtonGroup sx={{ paddingRight: '20px' }}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="admin">Admin</ToggleButton>
      <ToggleButton value="service">Service</ToggleButton>
      <ToggleButton value="user">User</ToggleButton>
    </ToggleButtonGroup>

    <ToggleButtonGroup
      color="primary"
      value={alignmentProcess}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="create">Create</ToggleButton>
      <ToggleButton value="update">Update</ToggleButton>
      <ToggleButton value="delete">Delete</ToggleButton>
    </ToggleButtonGroup>
    </div>

    <AdminSignup />

    </div>
  );
}
