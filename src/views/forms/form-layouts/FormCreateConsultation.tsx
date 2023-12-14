// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import React from 'react'

import { TransitionProps } from '@mui/material/transitions';
import Router, { useRouter } from 'next/router'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    userId: any
  }

const FormCreateConsultation = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const {userId} = props
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [formData, setFormData] = useState({
        Motivo_Consulta: '',
        Nombre_Doctor: '',
        pacienteId: userId,
        sexo: '',
        domicilio: '',
        carnet: '',
        contacto: ''
    });
    const [dialogMessage, setDialogMessage] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'contacto' && value.length > 8) {
            return;
        }
        if (name === 'carnet' && value.length > 8) {
            return;
        }
        if (name === 'edad' && value.length > 3) {
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const selectedValue = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            Nombre_Doctor: selectedValue,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Realiza la solicitud POST a tu API
            const response = await axios.post(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}/consultas`, formData);
            // Configura el mensaje de éxito para el diálogo
            setDialogMessage(response.data.mensaje);
            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Si el servidor devuelve un mensaje de error, úsalo
                setDialogMessage(`Error: ${error.response.data.message}`);
            } else {
                // Si no, usa un mensaje de error genérico
                setDialogMessage('Falla al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
            }
        }
        // Abre el diálogo
        handleClickOpen();


    };
    return (
        <Card>
            <CardHeader title='Registrar Consulta para Paciente' />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Motivo de la Consulta'
                                placeholder='Fuertes Dolores Estomacales'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Icon icon='mdi:account-outline' />
                                        </InputAdornment>
                                    )
                                }}
                                name='Motivo_Consulta'
                                value={formData.Motivo_Consulta}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-tabs-select-label'>Nombre del Doctor</InputLabel>
                                <Select
                                    label='Nombre del Doctor'
                                    value={formData.Nombre_Doctor} // Asigna el valor seleccionado
                                    onChange={handleSelectChange} // Maneja el cambio de valor
                                    labelId='form-layouts-tabs-select-label'
                                    required
                                >
                                    <MenuItem value='Doctor A'>Doctor A</MenuItem>
                                    <MenuItem value='Doctor B'>Doctor B</MenuItem>
                                    <MenuItem value='Doctor C'>Doctor C</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/** 
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type='number'
                                label='Edad'
                                placeholder='35'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Icon icon='mdi-format-list-numbers' />
                                        </InputAdornment>
                                    )
                                }}
                                name='edad'
                                value={formData.edad}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Direccion'
                                placeholder='Av. Murillo #123'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Icon icon='mdi:home' />
                                        </InputAdornment>
                                    )
                                }}
                                name='domicilio'
                                value={formData.domicilio}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='number'
                                label='Carnet de Identidad'
                                placeholder='12405828'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Icon icon='mdi-account-multiple' />
                                        </InputAdornment>
                                    )
                                }}
                                name='carnet'
                                value={formData.carnet}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='number'
                                label='Numero de Contacto'
                                placeholder='70458090'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Icon icon='mdi:phone' />
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        maxLength: 10,  // Aquí puedes establecer la longitud máxima que desees
                                    }
                                }}
                                name='contacto'
                                value={formData.contacto}
                                onChange={handleChange}
                                required
                            />
                        </Grid>*/}
                        <Grid item xs={12}>
                            <Button type='submit' variant='contained' size='large'>
                                Registrar Consulta
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
            <React.Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Registro de Paciente"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {dialogMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Correcto</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Card>

    )
}

export default FormCreateConsultation

