import axiosInstance from '../../services/api';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';


function StoreDupla() {
    // Para apresentar ao usuáro o resultado da operação
    const [status, setStatus] = useState('');
    const [pos1, setPos1] = useState(0);
    const [pos2, setPos2] = useState(0);
    const [funcionarios, setFuncionarios] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const nome_dupla = useRef("");
    const [loading, setLoading] = useState(false);

    // Instancia objeto de navegacao para redirecionamento
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFuncionarios() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/funcionarios");
                // Armazene a resposta na variável de estado
                setFuncionarios(resposta.data);
      
            } catch (err) {
                console.error('Erro ao buscar os dados: ', err);
            };
        }

        async function loadPictures() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/pictures");
                setPictures(resposta.data);
          
            } catch (err) {
                console.error('Erro ao buscar os dados: ', err);
            }
        }
        loadPictures();
        loadFuncionarios();
    }, []);


    // Formulário para coleta dos dados do novo objeto
    return (
        <div className='container'>
            <h4>Montar Dupla</h4>
            <div>
                <form onSubmit={gravar} className='corpo'>
                    Nome da equipe: <input ref={nome_dupla} type="text" maxLength="100" required />
                    Selecione os integrantes para a dupla:
                    <br />
                    <br />
                    <label>Integrante 1:</label>
                    <select
                        id="categoriaSelect"
                        required
                        style={{ display: 'block', marginBottom: '10px' }}
                        onChange={(event) => {
                            const selectedIndex = event.target.selectedIndex;
                            const selectedFuncionario = funcionarios[selectedIndex - 1];
                            //Capturando o idFuncionario aqui
                            const idTemp = selectedFuncionario.id_funcionario;
                            setPos1(idTemp);
                         
                        }}
                        defaultValue={funcionarios.length > 0 ? funcionarios[0].nome : ''}
                    >
                        <option disabled value="">
                            Selecione um funcionário
                        </option>
                        {
                            funcionarios.map((item, index) => {
                                return <option key={index} value={item.nome}>{item.nome}</option>;
                            })
                        }
                    </select>
                    <br />
                    <label>Integrante 2:</label>
                    <select
                        id="categoriaSelect"
                        required
                        style={{ display: 'block', marginBottom: '10px' }}
                        onChange={(event) => {
                            const selectedIndex = event.target.selectedIndex;
                            const selectedFuncionario = funcionarios[selectedIndex - 1];
                            //Capturando o idFuncionario aqui
                            const idTemp = selectedFuncionario.id_funcionario;
                            setPos2(idTemp);
                            
                        }}
                        defaultValue={funcionarios.length > 0 ? funcionarios[0].nome : ''}
                    >
                        <option disabled value="">
                            Selecione um funcionário
                        </option>
                        {
                            funcionarios.map((item, index) => {
                                return <option key={index} value={item.nome}>{item.nome}</option>;
                            })
                        }
                    </select>
                    <br />
                    Selecione um Avatar:
                    <br />
                    <div className="custom-select">
                        {pictures.map((item, index) => (
                            <div
                                key={index}
                                className={`option ${selectedPicture === item.id_picture ? 'selected' : ''}`}
                                onClick={() => {
                                    const selectedImage = pictures[index];
                                    const idPicture = selectedImage.id_picture;
                                    setSelectedPicture(idPicture);
                                   
                                }}
                            >
                                <img src={item.path_url} alt="Imagem" />
                            </div>
                        ))}
                    </div>


                    <br />
                    {loading && <div className="loader"></div>}
                    <br />
                    <div className='formBtn'>
                        <Link to='/duplas' className="waves-effect red darken-4 btn">Cancelar</Link>
                        <button type='submit' className='waves-effect waves-light btn'>Cadastrar</button>
                    </div>

                </form>
            </div>
        </div >
    )

    // Chamada a função da API

    async function gravar(e) {
        e.preventDefault(); // cancela o submit

        try {
            setLoading(true);
            const duplaData = {
                nome_dupla: nome_dupla.current.value,
                id_picture: selectedPicture,
            };
            // Chamar a função da API para criar a concessionária usando concessionariaData
            const resposta = await axiosInstance.post('/duplas', duplaData);
            setStatus(resposta);
          

            if (resposta.data && resposta.data.id_dupla) {
                const idDuplaCriada = resposta.data.id_dupla;

                // Chamar a função da API para associar funcionários à dupla
                const associarFuncionarios = async (idFuncionario1, idFuncionario2) => {
            
                    try {
                        const chamada1 = await axiosInstance.put(`/funcionarios/${pos1}/join/${idDuplaCriada}`, {
                            funcionarioId: idFuncionario1,
                            duplaId: idDuplaCriada,
                        });
                       
                        const chamada2 = await axiosInstance.put(`/funcionarios/${pos2}/join/${idDuplaCriada}`, {
                            funcionarioId: idFuncionario2,
                            duplaId: idDuplaCriada,
                        })
                    
                    } catch (error) {
                        console.error('Erro ao associar funcionários à dupla:', error);
                    }
                };
                associarFuncionarios(pos1, pos2);

                M.toast({ html: 'Dupla montada!', classes: 'rounded teal lighten-2' });

                setTimeout(() => {
                    setLoading(false); // Define o estado de carregamento como falso
                    navigate('/duplas');
                }, 1000);

            }
        } catch (erro) {
            setLoading(false);
            setStatus(`Falha: ${erro}`);
        }
    }


}

export default StoreDupla;




/*
Selecione um Avatar:
                    <br />
                    <select
                        id="imageSelect"
                        required
                        style={{ display: 'block', marginBottom: '10px' }}
                        onChange={(event) => {
                            const selectedIndex = event.target.selectedIndex;
                            const selectedImage = pictures[selectedIndex - 1];
                            const idPicture = selectedImage.id_picture;
                            setSelectedPicture(idPicture);
                            console.log('ID da imagem selecionada:', idPicture);
                        }}
                        defaultValue={pictures.length > 0 ? pictures[0].path_url : ''}
                    >
                        <option disabled value="">
                            Selecione um avatar
                        </option>
                        {pictures.map((item, index) => (
                            <option key={index} value={item.path_url}>
                                {item.path_url}
                            </option>
                        ))}
                    </select>

                    */