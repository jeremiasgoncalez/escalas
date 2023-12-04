import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../services/api';
import M from 'materialize-css';
import { MdEdit, MdDelete } from "react-icons/md";



function Funcionario() {
    const [json, setJson] = useState([]);

    // Função para exclusão de um item
    async function deleteItem(id) {
        try {
            // Realize a exclusão na API
            await axiosInstance.delete(`/funcionarios/${id}`);
            // Atualize o estado local para refletir a exclusão
            setJson(json.filter(funcionario => funcionario.id_funcionario !== id));
            M.toast({ html: 'Registro Removido!', classes: 'rounded red lighten-1' });
        } catch (error) {
            console.error(`Erro ao excluir o item com ID ${id}: ${error}`);
        }
    }

    useEffect(() => {
        async function Show() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/funcionarios");
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
                <h4 style={{ marginTop: "10%" }}>Funcionarios</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {json.map((funcionario) => (
                            <tr key={funcionario.id_funcionario}>
                                <td>{funcionario.id_funcionario}</td>
                                <td>{funcionario.nome}</td>
                                <td><Link to={"update/" + funcionario.id_funcionario} title="Editar"><MdEdit color='grey' /></Link></td>
                                <td>
                                    <MdDelete color='grey' style={{ cursor: 'pointer' }} title="Apagar" onClick={() => deleteItem(funcionario.id_funcionario)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="action" ><Link to='create' className="waves-effect waves-light btn">Cadastrar Novo</Link></div>
            </div >
        </>
    );
}

export default Funcionario;
