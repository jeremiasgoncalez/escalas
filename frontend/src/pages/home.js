import { Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import axiosInstance from '../services/api';
import axios from 'axios';
import './styles.css';

import logo from '../resource/clean.png';
import { useState, useEffect } from "react";

function Home() {
    const [equipe, setEquipe] = useState([]);
    const [equipeHoje, setEquipeHoje] = useState();
    const [dailyPhrase, setDailyPhrase] = useState();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const today = new Date();

    useEffect(() => {
        // Lógica para buscar os dados da API e determinar a dupla do dia
        async function loadEquipes() {
            // Lógica para buscar os dados da API (substitua com o código correto)
            const resposta = await axiosInstance('/duplas');
            setEquipe(resposta.data);

        }

        loadEquipes();

    }, []);

    useEffect(() => {
        // Atualize a equipe do dia quando a equipe ou a data mudar
        const calcularDuplaDoDia = () => {
            const today = new Date();
            const dayOfWeek = today.getDay();

            let posicaoInicial = 0;
            posicaoInicial = (posicaoInicial + dayOfWeek - 1) % equipe.length;

            const duplaDoDia = equipe[posicaoInicial];
            setEquipeHoje(duplaDoDia);
        };

        calcularDuplaDoDia();
        getDailyPhrase();
    }, [equipe]);

    function calcularDuplaDoDia() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 para Domingo, 1 para Segunda, 2 para Terça, ...

        // Suponha que a sua fila comece na posição 0 do array de duplas
        let posicaoInicial = 0;

        // Lógica para determinar a posição inicial da fila com base no dia da semana
        // Por exemplo, se for Segunda (1), a posição inicial seria 0; Terça (2), posição 1; e assim por diante
        posicaoInicial = (posicaoInicial + dayOfWeek - 1) % equipe.length;

        // A posição inicial da fila para o dia de hoje
        const duplaDoDia = equipe[posicaoInicial];
        return duplaDoDia;
    }

    async function getDailyPhrase() {
        const response = await axios.get('https://api.quotable.io/random');
        setDailyPhrase(response.data);
    }

    return (
        <>
            <div className="container">
                <br />
                <br />

                {dailyPhrase && dailyPhrase.content && dailyPhrase.author ? (
                    <div className="daily-phrase">
                        <p >{dailyPhrase.content}</p>
                        <p >{dailyPhrase.author}</p>
                    </div>
                ) : (
                    <p className="daily-phrase">:/ Não foi possível carregar o conteúdo!</p>
                )}

                <br></br>
                <h6>{today.toLocaleDateString('pt-BR', options)}</h6>
                <div className="display">
                    {equipeHoje && (
                        <>
                            {equipeHoje.picture && equipeHoje.picture.path_url ? (
                                <div>
                                    <img src={equipeHoje.picture.path_url} alt="Avatar" />
                                </div>
                            ) : (
                                <p>Imagem não disponível</p>
                            )}

                            <div className="team-info">
                                <p>Equipe <b>{equipeHoje.nome_dupla}</b></p>
                                <p>Responsáveis: {equipeHoje.funcionarios.map(funcionario => funcionario.nome).join(', ')}</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="showArea">
                    <img width="25%" src={logo} />
                    <h3>Escala de limpeza</h3>
                </div>
                <br /> <br /> <br /> <br />

            </div >
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <p className="white-text">Powered by: _jeremiasgoncalez</p>
                            <p className="grey-text text-lighten-4">Este modelo consulta uma API-REST desenvolvida em NodeJS | MySql | React | Prisma | Express</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="https://github.com/Jeremiasgoncalez">Meu perfil no Github</a></li>
                                <li><a className="grey-text text-lighten-3" href="https://github.com/jeremiasgoncalez/dealership-business-environment-api">Repositorio do Projeto</a></li>
                                <li><a className="grey-text text-lighten-3" href="https://instagram.com/jeremiasgoncalez">Meu instagram</a></li>
                                <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/jeremias-goncalez/">Me encontre no Linked!n</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2023 copyright
                        <p className="grey-text text-lighten-4 right">FATEC PRAIA GRANDE</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Home;