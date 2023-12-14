// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  userId: any
}

const UserSuspendDialog = (props: Props) => {
  // ** Props
  const { open, setOpen, userId} = props

  // ** States
  const [userInput, setUserInput] = useState<string>('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => {setSecondDialogOpen(false) , location.reload()}

  const handleConfirmation = async (value: string) => {
    
    setSecondDialogOpen(true)
    if (value === 'yes') {
      try {
        // Realiza la llamada al endpoint para suspender al usuario
        const response = await axios.delete(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}/pacientes/${userId}`);
        // Maneja la respuesta aquí, si es necesario
        
      } catch (error) {
        console.error('Error al suspender al usuario:', error);
        // Maneja el error aquí, si es necesario
      }
    }
    else{
      setSecondDialogOpen(false)
    }
    handleClose()
    setUserInput(value)
  }
  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, maxWidth: '85%', textAlign: 'center', '& svg': { mb: 12.25, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Esta seguro?
              </Typography>
            </Box>
            <Typography>Esto eliminara al paciente!!!</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => handleConfirmation('yes')}>
            Si, Suspender Paciente!
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 8 }}>
              {userInput === 'yes' ? 'Suspendido!' : 'Cancelado'}
            </Typography>
            <Typography>{userInput === 'yes' ? 'El Paciente Ha Sido Eliminado.' : 'Eliminacion cancelada!!  :)'}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserSuspendDialog
