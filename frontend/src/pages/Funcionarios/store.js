import axiosInstance from '../../services/api';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';


function StoreCliente() {
    // Para apresentar ao usuáro o resultado da operação
    const [status, setStatus] = useState('');
    const nome = useRef("");

    // Instancia objeto de navegacao para redirecionamento
    const navigate = useNavigate();

    // Formulário para coleta dos dados do novo objeto
    return (
        <div className='container'>
            <h4>Cadastro de Funcionário</h4>
            <div>
                <form onSubmit={gravar} className='corpo'>
                    Nome: <input ref={nome} type="text" maxLength="100" required />
                    <div className='formBtn'>

                        <Link to='/funcionarios' className="waves-effect red darken-4 btn">Cancelar</Link>
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
            const funcionarioData = {
                nome: nome.current.value,
            };
            // Chamar a função da API para criar a concessionária usando concessionariaData
            const resposta = await axiosInstance.post('/funcionarios', funcionarioData);
            setStatus(resposta);
        

            M.toast({ html: 'Funcionario cadastrado!', classes: 'rounded teal lighten-2' });
            navigate('/funcionarios');
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }
}
export default StoreCliente;

//Categoria: <input ref={tipoProprietario} type="text" maxLength="15" required />