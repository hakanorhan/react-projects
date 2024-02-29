import React, { useState } from 'react'

export default function TextFieldTelefon() {
     // TelNr
     const [telNr, setTelNr] = useState('')
     const handleChangeTelNr = (telNr: string) => {
         setTelNr(telNr)
     }
  return (
    <div>TextFieldTelefon</div>
  )
}
