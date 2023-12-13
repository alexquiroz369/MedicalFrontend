// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import

import { AbilityContext } from 'src/layouts/components/acl/Can'
// ** Types

import { useRouter } from 'next/router'
import axios from 'axios'
import { PacientType, UsersType } from 'src/types/apps/userTypes'
import FormLayoutsCollapsible from 'src/views/forms/form-layouts/FormLayoutsCollapsible'
import AboutOverivew from 'src/views/pages/user-profile/profile/AboutOverivew'
import FormPacientData from 'src/views/forms/form-layouts/FormPacientData'

interface ColorsType {
  [key: string]: ThemeColor
}
interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

// Styled Link
const StyledLink = styled('a')(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark
  }
}))

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}
const statusColors: ColorsType = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'secondary'
}

const userRoleObj: UserRoleType = {
  Masculino: { icon: 'mdi-gender-male', color: '#007bff' },
  Femenino: { icon: 'mdi-gender-female', color: '#ff66ff' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}
type Props = {
  user: UsersType | undefined
  pacient: PacientType | undefined
}
const UserView = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentUserPacient, setCurrentUserPacient] = useState<any>(null);
  const [formData, setFormData] = useState({
    Fecha_Consulta: '',
    Motivo_Consulta: '',
    Nombre_Doctor: '',
    ID_ExamenGeneral: 0,
    FrecuenciaCardiaca: 0,
    FrecuenciaRespiratoria: 0,
    Temperatura: 0,
    PresionArterial: '',
    Talla: 0,
    Peso: 0,
    ID_Consulta: 0,
    ID_ExamenFisico: 0,
    Observaciones: '',
    ID_ExamenComplementario: 0,
    Tipo_Examen: '',
    Resultados: '',
    ID_DiagnosticoTratamiento: 0,
    Diagnostico: '',
    Tratamiento: '',
    consultaIDConsulta: 0,
  });
  const [formDataPacient, setFormDataPacient] = useState({
    ID_Paciente: 0,
    Nombre: '',
    Edad: 0,
    Sexo: '',
    Domicilio: '',
    Carnet: '',
    active: false,
    contacto: null,
  });

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)
  const ability = useContext(AbilityContext)
  const router = useRouter()
  const { userId } = router.query;
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

  useEffect(() => {
    const fetchPacienteData = async () => {
      try {
        if (typeof userId === 'string') {
          const response = await axios.get(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}/pacientes/${Number(userId)}`);
          const pacient = response.data;
          
          if (pacient) {
            setCurrentUserPacient(pacient);
            setFormDataPacient({
              ID_Paciente: pacient.ID_Paciente || 0,
              Nombre: pacient.Nombre || '',
              Edad: pacient.Edad || 0,
              Sexo: pacient.Sexo || '',
              Domicilio: pacient.Domicilio || '',
              Carnet: pacient.Carnet || '',
              active: pacient.active || 0,
              contacto: pacient.contacto || null,
            });
          } else {
            console.log('Usuario no encontrado');
          }
        }
      } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
      }
    };
    fetchPacienteData();
    const fetchData = async () => {
      try {
        if (typeof userId === 'string') {
          // Segunda petición para obtener los datos adicionales
          const response2 = await axios.get(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}/database/lastdata/${Number(userId)}`);
          const user = response2.data;
          setIsRequestSuccessful(true); 
          if (user) {
            setCurrentUser(user);
            setFormData({
              Fecha_Consulta: user.Fecha_Consulta || '',
              Motivo_Consulta: user.Motivo_Consulta,
              Nombre_Doctor: user.Nombre_Doctor,
              ID_ExamenGeneral: user.ID_ExamenGeneral,
              FrecuenciaCardiaca: user.FrecuenciaCardiaca,
              FrecuenciaRespiratoria: user.FrecuenciaRespiratoria,
              Temperatura: user.Temperatura,
              PresionArterial: user.PresionArterial,
              Talla: user.Talla,
              Peso: user.Peso,
              ID_Consulta: user.ID_Consulta,
              ID_ExamenFisico: user.ID_ExamenFisico,
              Observaciones: user.Observaciones,
              ID_ExamenComplementario: user.ID_ExamenComplementario,
              Tipo_Examen: user.Tipo_Examen,
              Resultados: user.Resultados,
              ID_DiagnosticoTratamiento: user.ID_DiagnosticoTratamiento || 0,
              Diagnostico: user.Diagnostico || '',
              Tratamiento: user.Tratamiento || '',
              consultaIDConsulta: user.consultaIDConsulta || 0,
            });
          } else {
            console.log('Usuario no encontrado');
          }
        }
      } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
      }
    };
    fetchData();
  }, [userId as string]);  // Aquí se especifica que 'userId' es de tipo 'string'



  const datosPaciente = {
    idPaciente: currentUserPacient?.ID_Paciente || 0,
    nombre: currentUserPacient?.Nombre || '',
    edad: currentUserPacient?.Edad || 0,
    sexo: currentUserPacient?.Sexo || '',
    domicilio: currentUserPacient?.Domicilio || '',
    carnet: currentUserPacient?.Carnet || '',
    active: currentUserPacient?.active || 0,
    contacto: currentUserPacient?.contacto || null,
    fechaConsulta: currentUser?.[0]?.Fecha_Consulta || '',
    motivoConsulta: currentUser?.[0]?.Motivo_Consulta || '',
    nombreDoctor: currentUser?.[0]?.Nombre_Doctor || '',
    idExamenGeneral: currentUser?.[0]?.ID_ExamenGeneral || 0,
    frecuenciaCardiaca: currentUser?.[0]?.FrecuenciaCardiaca || 0,
    frecuenciaRespiratoria: currentUser?.[0]?.FrecuenciaRespiratoria || 0,
    temperatura: currentUser?.[0]?.Temperatura || 0,
    presionArterial: currentUser?.[0]?.PresionArterial || '',
    talla: currentUser?.[0]?.Talla || 0,
    peso: currentUser?.[0]?.Peso || 0,
    idConsulta: currentUser?.[0]?.ID_Consulta || 0,
    idExamenFisico: currentUser?.[0]?.ID_ExamenFisico || 0,
    observaciones: currentUser?.[0]?.Observaciones || '',
    idExamenComplementario: currentUser?.[0]?.ID_ExamenComplementario || 0,
    tipoExamen: currentUser?.[0]?.Tipo_Examen || '',
    resultados: currentUser?.[0]?.Resultados || '',
    idDiagnosticoTratamiento: currentUser?.[0]?.ID_DiagnosticoTratamiento || null,
    diagnostico: currentUser?.[0]?.Diagnostico || '',
    tratamiento: currentUser?.[0]?.Tratamiento || '',
    consultaIDConsulta: currentUser?.[0]?.consultaIDConsulta || null,
  };



  // Puedes seguir agregando las propiedades restantes según tus necesidades...




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      // Realiza la llamada a la API para enviar el formulario
      //const response = await axios.post('/api/user/update', formData);
      console.log(formData)
      // Muestra la respuesta de la API en la consola
      //console.log('API Response:', response.data);
      setOpenEdit(false)
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {currentUserPacient?.[0]?.avatar && currentUserPacient?.[0]?.avatar.length ? (
              <CustomAvatar
                src={currentUserPacient?.[0]?.avatar}
                variant='rounded'
                alt={datosPaciente.nombre}
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                variant='rounded'
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
              >
                {datosPaciente.nombre.charAt(0)} {/* Mostrar la primera letra del nombre si no hay imagen */}
              </CustomAvatar>
            )}

            <Typography variant='h6' sx={{ mb: 2 }}>
              {datosPaciente.nombre}
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              label={datosPaciente.active ? 'Activo' : 'Pending'}
              color={statusColors[datosPaciente.active ? 'Active' : 'Inactive']}
              sx={{
                height: 20,
                fontWeight: 600,
                borderRadius: '5px',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { mt: -0.25 }
              }}
            />
          </CardContent>
          <CardContent>
            <Typography variant='h6'>Informacion del Paciente</Typography>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Nombre Completo:
                </Typography>
                <Typography variant='body2'>{datosPaciente.nombre}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Estado:
                </Typography>
                <CustomChip
                  skin='light'
                  size='small'
                  label={datosPaciente.active ? 'Activo' : 'Suspendido'}
                  color={statusColors[datosPaciente.active ? 'Active' : 'Inactive']}
                  sx={{
                    height: 20,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    borderRadius: '5px',
                    textTransform: 'capitalize'
                  }}
                />

              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Edad:</Typography>
                <Typography variant='body2'>{datosPaciente.edad}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Sexo:</Typography>
                <Typography variant='body2'>{datosPaciente.sexo}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Cedula de Identidad:</Typography>
                <Typography variant='body2'>{datosPaciente.carnet}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Domicilio:</Typography>
                <Typography variant='body2'>{datosPaciente.domicilio}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contacto:</Typography>
                <Typography variant='body2'>+591 {datosPaciente.contacto}</Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenEdit(true)}>
              Editar
            </Button>
            <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
              Suspender
            </Button>
          </CardActions>
          {isRequestSuccessful && <FormPacientData datos={datosPaciente}></FormPacientData>}
          {/** 
          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Editar Informacion de Usuario
            </DialogTitle>
            <DialogContent>
              <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                Actualizar la Informacion del Usuario Actual.
              </DialogContentText>
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Nombre Completo'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Username'
                      name='username'
                      value={formData.username}
                      onChange={handleInputChange}
                      InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='email'
                      label='Email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-status-label'>Estado</InputLabel>
                      <Select
                        label='Status'
                        name='status'
                        value={formData.status}
                        onChange={handleChangeSelect}
                        id='user-view-status'
                        labelId='user-view-status-label'
                      >
                        <MenuItem value='Pending'>Pending</MenuItem>
                        <MenuItem value='Active'>Active</MenuItem>
                        <MenuItem value='Inactive'>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Contacto'
                      name='contact'
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </form>

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 1 }} onClick={handleFormSubmit}>
                Enviar
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
          <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
        */}
        </Card>
      </Grid>

    </Grid>
  )
}
export default UserView
