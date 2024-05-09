import { Tooltip } from '@mui/material';
import React from 'react'

const OpenImageSource: React.FC<{url: string, title: string}> = ({ url, title }) => {

    const handleTooltip = (event: React.MouseEvent<HTMLSpanElement>) => {
        window.open(url, "_blank");
    }

  return (
    <Tooltip title= { title } onClick={ handleTooltip }>
        <span> { title } </span>
    </Tooltip>
  )
}

export default OpenImageSource;