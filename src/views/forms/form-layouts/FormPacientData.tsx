// ** React Imports
import { ChangeEvent, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { UsersType } from 'src/types/apps/userTypes'

// Styled component for the Box wrappers in Delivery Options' accordion
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    borderWidth: 1,
    display: 'flex',
    cursor: 'pointer',
    borderStyle: 'solid',
    padding: theme.spacing(5),
    borderColor: theme.palette.divider,
    '&:first-of-type': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-of-type': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius
    }
}))
type Props = {
    datos: UsersType | undefined
}

const FormPacientData = ({ datos }: any) => {
    // ** States
    const [expanded, setExpanded] = useState<string | false>('panel1')
    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    if (datos) {
        const { contacto } = datos;
    }
    else {
        return null;
    }
    return (
        <form onSubmit={e => e.preventDefault()}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-1'
                    aria-controls='form-layouts-collapsible-content-1'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                        Ultima Consulta del Paciente
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Diagnostico:</Typography>
                            <Typography variant='body2'>{datos.diagnostico}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Tratamiento:</Typography>
                            <Typography variant='body2'>{datos.tratamiento}</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Fecha de Consulta:</Typography>
                            <Typography variant='body2'>{datos.fechaConsulta}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Motivo de Consulta:</Typography>
                            <Typography variant='body2'>{datos.motivoConsulta}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Doctor que atendio la Consulta:</Typography>
                            <Typography variant='body2'>{datos.nombreDoctor}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-2'
                    aria-controls='form-layouts-collapsible-content-2'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                    Examen General (Ultima Consulta)
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Frecuencia Cardiaca:</Typography>
                            <Typography variant='body2'>{datos.frecuenciaCardiaca}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Frecuencia Respiratoria:</Typography>
                            <Typography variant='body2'>{datos. frecuenciaRespiratoria}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Temperatura:</Typography>
                            <Typography variant='body2'>{datos.temperatura}º</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Presion Arterial:</Typography>
                            <Typography variant='body2'>{datos.presionArterial}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Talla:</Typography>
                            <Typography variant='body2'>{datos.talla} cm</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Peso:</Typography>
                            <Typography variant='body2'>{datos.peso} Kg</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-3'
                    aria-controls='form-layouts-collapsible-content-3'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                        Examen Fisico Regional (Ultima Consulta)
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Observaciones del Examen:</Typography>
                            <Typography variant='body2'>{datos.observaciones}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-4'
                    aria-controls='form-layouts-collapsible-content-4'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                    Examenes Complementarios (Ultima Consulta)
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Tipo de Examen:</Typography>
                            <Typography variant='body2'>{datos.tipoExamen}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Resultados:</Typography>
                            <Typography variant='body2'>{datos. resultados}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </form>
    )
}
export default FormPacientData
