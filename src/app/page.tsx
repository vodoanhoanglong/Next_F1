import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';


const obj = {
  color: "black"
} as React.CSSProperties

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined" style={obj}>Outlined</Button>
    </Stack>
    </main>
  )
}


