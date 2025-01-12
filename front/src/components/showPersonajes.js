import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const ShowPersonajes = () => {

    const url = 'http://localhost:8080/api/personajes';
    const [personajes, setPersonajes] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [raza, setRaza] = useState('');
    const [description, setDescription] = useState('');
    const [operation, setOperation] = useState('');
    const [title, setTitle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getPersonajes();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getPersonajes = async () => {
        const respuesta = await axios.get(url);
        setPersonajes(respuesta.data);
    }

    const filteredPersonajes = personajes.filter((personajes) => {
        return (
            personajes.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const openModal = (op, id, name, raza, description) => {
        setId('');
        setName('');
        setRaza();
        setDescription('');
        setOperation(op);
        if (op === 1) {
            setTitle('Añadir Personaje');
        } else if (op === 2) {
            setTitle('Editar Personaje');
            setId(id);
            setName(name);
            setRaza(raza);
            setDescription(description);
        }
        window.setTimeout(function () {
            document.getElementById('name').focus();
        }, 500)
    }

    const validar = async () => {
        var parametros;
        var metodo;
        if (!name || name.trim() === '') {
            show_alerta('El nombre del personaje es obligatorio', 'warning');
        } else if (!raza || raza.trim() === '') {
            show_alerta('La raza del personaje es obligatoria', 'warning');
        } else if (!description || description.trim() === '') {
            show_alerta('La descripción del personaje es obligatoria', 'warning');
        } else {
            if (operation === 1) {
                parametros = { name: name, raza: raza, description: description };
                metodo = 'POST';
            } else {
                parametros = { id: id, name: name, raza: raza, description: description };
                metodo = 'PUT';
            }
            await enviarSolicitud(metodo, parametros, id);
            getPersonajes();
        }
    }

    const enviarSolicitud = async (metodo, parametros, id = null) => {
        const endpoint = id ? `${url}/${id}` : url;

        await axios({ method: metodo, url: endpoint, data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj, tipo);

            if (tipo === 'success') {
                document.getElementById('btnCerrar').click();
            }
        })
            .catch(function (error) {
                show_alerta('Error en la solicitud', 'error');
                console.log(error);
            });
    }

    const deletePersonaje = async (id, name) => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: '¿Seguro de eliminar el personaje ' + name + ' ?',
            icon: 'question', text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await enviarSolicitud('DELETE', null, id);
                await getPersonajes();
            } else {
                show_alerta('El personaje NO fue eliminado', 'info');
            }
        })
    }


    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            {/* BARRA DE BÚSQUEDA */}
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Buscar por nombre...'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            {/*BOTÓN AGREGAR*/}
                            <button onClick={() => openModal(1)} className='btn btn-dark'
                                data-bs-toggle='modal' data-bs-target='#modalPersonajes'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Raza</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {filteredPersonajes.map((personaje, i) => (
                                    <tr key={personaje.id}>
                                        <td>{i + 1}</td>
                                        <td>{personaje.name}</td>
                                        <td>{personaje.raza}</td>
                                        <td>{personaje.description}</td>
                                        <td className="d-flex justify-content-between">
                                            {/*BOTÓN EDITAR*/}
                                            <button onClick={() => openModal(2, personaje.id,
                                                personaje.name, personaje.raza, personaje.description)}
                                                className='btn btn-warning' data-bs-toggle='modal'
                                                data-bs-target='#modalPersonajes'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp;
                                            {/*BOTÓN ELIMINAR*/}
                                            <button onClick={() => deletePersonaje(personaje.id, personaje.name)}
                                                className='btn btn-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id='modalPersonajes' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{title}</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>

                            {/*INPUT DE NOMBRE DEL PERSONAJE*/}
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-info-circle'></i></span>
                                <input
                                    type='text'
                                    id='name'
                                    className='form-control'
                                    placeholder='Nombre del Personaje'
                                    value={(name)}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/*INPUT DE LA RAZA*/}
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-info-circle'></i></span>
                                <input
                                    type='text'
                                    id='raza'
                                    className='form-control'
                                    placeholder='raza'
                                    value={raza}
                                    onChange={(e) => setRaza(e.target.value)}
                                />
                            </div>

                            {/* INPUT DE LA DESCRIPCIÓN */}
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-info-circle'></i></span>
                                <input
                                    type='text'
                                    id='description'
                                    className='form-control'
                                    placeholder='Descripción del Personaje'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            {/*BOTÓN GUARDAR*/}
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                        </div>
                        {/*BOTÓN CERRAR*/}
                        <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowPersonajes;