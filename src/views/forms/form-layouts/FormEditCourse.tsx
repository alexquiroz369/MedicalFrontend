// ** React Imports
import { ChangeEvent, forwardRef, MouseEvent, useRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'

import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useRouter } from 'next/router'
import { courses } from 'src/mocks/courses'


const FormEditCourse = () => {
    const router = useRouter()
    const { courseId } = router.query;
    const course = courses.find((course) => course.id === courseId);

    const [image, setImage] = useState<File | null>(null);
    const [pdf, setPdf] = useState<File | null>(null);
    const tituloRef = useRef<HTMLInputElement>(null);
    const descripcionRef = useRef<HTMLInputElement>(null);
    const instructorRef = useRef<HTMLInputElement>(null);
    const duracionRef = useRef<HTMLInputElement>(null);
    const categoriaRef = useRef<HTMLSelectElement>(null);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(file); // Update the type of the parameter
        }
    };

    const handleUploadPDF = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            // Handle PDF upload
            setPdf(file);
        }
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            titulo: tituloRef.current?.value,
            descripcion: descripcionRef.current?.value,
            instructor: instructorRef.current?.value,
            duracion: duracionRef.current?.value,
            categoria: categoriaRef.current?.value,
            image,
            pdf,
        };

        console.log(JSON.stringify(data));
    };
    function handleClick() {
        router.push(`/AddMedia?courseId=${courseId}`);
        //alert(`El valor enviado es ${id}`)
    }

    return (
        <Card>
            <CardHeader title='Editar un Curso' />
            <Divider sx={{ m: '0 !important' }} />

            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                Detalles del Curso
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label='Titulo del Curso' placeholder='Curso de Fisica Basica'
                                value={course?.title}
                                required
                                inputRef={tituloRef}
                                inputProps={{
                                    maxLength: 40,
                                }} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label='Descripcion' placeholder='En este curso aprenderas sobre fisica basica'
                                value={course?.description}
                                required
                                inputRef={descripcionRef}
                                inputProps={{
                                    maxLength: 60,
                                }} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label='Instructor del Curso' placeholder='Prof. Gerardo XXX XXX'
                                value={course?.instructors}
                                inputRef={instructorRef}
                                inputProps={{
                                    maxLength: 50,
                                }} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label='Duracion' placeholder='2 horas y 30 minutos'
                                value={course?.duration}
                                required
                                inputRef={duracionRef}
                                inputProps={{
                                    maxLength: 30,
                                }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="form-layouts-separator-select-label">Categoria</InputLabel>
                                <Select
                                    value={course?.category}
                                    label="Nivel Educativo"
                                    defaultValue=""
                                    inputRef={categoriaRef}
                                    id="form-layouts-separator-select"
                                    labelId="form-layouts-separator-select-label"
                                    required
                                >
                                    <MenuItem value="Primero de Secundaria">Primero de Secundaria</MenuItem>
                                    <MenuItem value="Segundo de Secundaria">Segundo de Secundaria</MenuItem>
                                    <MenuItem value="Tercero de Secundaria">Tercero de Secundaria</MenuItem>
                                    <MenuItem value="Cuarto de Secundaria">Cuarto de Secundaria</MenuItem>
                                    <MenuItem value="Quinto de Secundaria">Quinto de Secundaria</MenuItem>
                                    <MenuItem value="Sexto de Secundaria">Sexto de Secundaria</MenuItem>
                                    <MenuItem value="U.A.T.F">U.A.T.F</MenuItem>
                                    <MenuItem value="U.P.D.S">U.P.D.S</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="form-layouts-separator-select-label">Cantidad de Videos del Curso</InputLabel>
                                <Select
                                    label="Videos"
                                    defaultValue="1"
                                    id="form-layouts-separator-select"
                                    labelId="form-layouts-separator-select-label"
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <TextField
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    accept: 'image/*',
                                }}
                                variant="outlined"
                                onChange={handleUpload}
                                fullWidth label='Subir Imagen'

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    accept: 'application/pdf',
                                }}
                                variant="outlined"
                                onChange={handleUploadPDF}
                                fullWidth label='Subir PDF'
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider sx={{ m: '0 !important' }} />
                <CardActions>
                    <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' >
                        Actualizar
                    </Button>
                    <Button type='reset' size='large' color='secondary' variant='outlined'>
                        Limpiar
                    </Button>
                    <Button size='large' sx={{ mr: 2 }} variant='contained' onClick={handleClick}>
                        Subir Videos
                    </Button>
                </CardActions>
            </form>
            <Divider sx={{ m: '0 !important' }} />
        </Card>

    )
}
export default FormEditCourse
