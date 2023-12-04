import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../services/api';
import M from 'materialize-css';
import { MdEdit, MdDelete } from "react-icons/md";



function Dupla() {
    const [json, setJson] = useState([]);

    // Função para exclusão de um item
    async function deleteItem(id) {
        try {
            // Realize a exclusão na API
            await axiosInstance.delete(`/duplas/${id}`);
            // Atualize o estado local para refletir a exclusão
            setJson(json.filter(dupla => dupla.id_dupla !== id));
            M.toast({ html: 'Registro Removido!', classes: 'rounded red lighten-1' });
        } catch (error) {
            console.error(`Erro ao excluir o item com ID ${id}: ${error}`);
        }
    }

    useEffect(() => {
        async function Show() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/duplas");
                // Armazene a resposta na variável de estado
                setJson(resposta.data);
            } catch (err) {
                console.error('Erro ao buscar os dados: ', err);
            };
        }

        Show();
    }, []);

    return (
        <>
            <div className='container'>
                <h4 style={{ marginTop: "10%" }}>Duplas</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>ID</th>
                            <th>Nome da Dupla</th>
                            <th>Funcionários</th>
                            <th>Anotações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {json.map((dupla) => (
                            <tr key={dupla.id_dupla}>
                                <td>
                                    {dupla.picture ? (
                                        <img src={dupla.picture.path_url} alt="Imagem" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td>{dupla.id_dupla}</td>
                                <td>{dupla.nome_dupla}</td>
                                <td>{dupla.funcionarios.map((funcionario) => funcionario.nome).join(', ')}</td>
                                <td>{dupla.anotacoes}</td>


                                <td><Link to={"update/" + dupla.id_dupla} title="Editar"><MdEdit color='grey' /></Link></td>
                                <td>
                                    <MdDelete color='grey' style={{ cursor: 'pointer' }} title="Apagar" onClick={() => deleteItem(dupla.id_dupla)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="action" ><Link to='create' className="waves-effect waves-light btn">Montar Nova</Link></div>
            </div >
        </>
    );
}

export default Dupla;

//<td>{dupla.picture ? dupla.picture.path_url : '-'}</td>