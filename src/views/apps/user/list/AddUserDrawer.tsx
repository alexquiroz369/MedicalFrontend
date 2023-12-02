// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  nombre: string
  edad: number
  sexo: string
  domicilio: string
  carnet: number
  contacto: number
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} Este campo es requerido`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} debe tener al menos ${min} caracteres`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  company: yup.string().required(),
  country: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup
    .number()
    .typeError('Contact Number field is required')
    .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
  fullName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  username: yup
    .string()
    .min(3, obj => showErrors('Username', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  nombre: '',
  edad: Number(''),
  sexo: '',
  domicilio: '',
  carnet: Number(''),
  contacto: Number('')
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState<string>('basic')
  const [role, setRole] = useState<string>('subscriber')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: UserData) => {
    dispatch(addUser({ ...data, role, currentPlan: plan }))
    toggle()
    reset()
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contacto', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Registrar Paciente</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nombre'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nombre Completo'
                  onChange={onChange}
                  placeholder='John Doe'
                  error={Boolean(errors.nombre)}
                />
              )}
            />
             
            {errors.nombre && <FormHelperText sx={{ color: 'error.main' }}>{errors.nombre.message}</FormHelperText>}
          </FormControl>
          {/*<FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='edad'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Username'
                  onChange={onChange}
                  placeholder='23'
                  error={Boolean(errors.edad)}
                />
              )}
            />
            {errors.edad && <FormHelperText sx={{ color: 'error.main' }}>{errors.edad.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='plan-select'>Select Plan</InputLabel>
            <Select
              fullWidth
              value={plan}
              id='select-plan'
              label='Sexo'
              labelId='plan-select'
              onChange={e => setPlan(e.target.value)}
              inputProps={{ placeholder: 'Sexo' }}
            >
              <MenuItem value='basic'>Masculino</MenuItem>
              <MenuItem value='company'>Femenino</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='domicilio'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='text'
                  value={value}
                  label='Domicilio'
                  onChange={onChange}
                  placeholder='Av. Las Banderas #322'
                  error={Boolean(errors.domicilio)}
                />
              )}
            />
            {errors.domicilio && <FormHelperText sx={{ color: 'error.main' }}>{errors.domicilio.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='carnet'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Contact'
                  onChange={onChange}
                  placeholder='4008980'
                  error={Boolean(errors.carnet)}
                />
              )}
            />
            {errors.carnet && <FormHelperText sx={{ color: 'error.main' }}>{errors.carnet.message}</FormHelperText>}
          </FormControl>
          */}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Registrar
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
