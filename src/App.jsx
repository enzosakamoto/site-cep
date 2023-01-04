import './App.css'
import api from './services/api'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cep, setCEP] = useState('');
  const [result, setResult] = useState({});
  const [sucess, setSucess] = useState(false);
  const [erro, setErro] = useState(false);

  function handleRegister(event) {
    event.preventDefault();
    if(!cep) {
      toast.warn("Digite um CEP válido!");
      return;
    }
    async function loadResult() {
      await api.get(`/${cep}/json`)
      .then((response) => {
        setResult(response.data);
        setSucess(true);
        setErro(false);
        if(response.data.erro) {
          toast.warn("Erro ao carregar os dados do servidor!");
          setErro(true);
          setSucess(false);
        }
      })
      .catch(() => {
        setErro(true);
        setSucess(false);
        toast.warn("Erro ao carregar os dados do servidor!");
        return;
      })
    }
    loadResult();
  }

  return (
    <div className="App">
      <h1>BRASIL CEP</h1>
      <form onSubmit={handleRegister}>
        <label className="texto-principal">Digite um CEP</label>
        <input
        className="texto"
        placeholder="Ex: 04849002"
        type="text"
        onChange={(event) => setCEP(event.target.value)}/>
        <button type='submit'>Enviar!</button>
      </form>
      {
        sucess ?
        <div id="resultado" className="resultado">
          <div className="container-texto">
            <p className="texto-principal">CEP:</p>
            <p className="texto">{result.cep}</p>
          </div>
          <div className="container-texto">
            <p className="texto-principal">Logradouro:</p>
            <p className="texto">{result.logradouro}</p>
          </div>
          <div className="container-texto">
            <p className="texto-principal">Complemento:</p>
            <p className="texto">{result.complemento}</p>
          </div>
          <div className="container-texto">
            <p className="texto-principal">Bairro:</p>
            <p className="texto">{result.bairro}</p>
          </div>
          <div className="container-texto">
            <p className="texto-principal">Localidade:</p>
            <p className="texto">{result.localidade}</p>
          </div>
          <div className="container-texto">
            <p className="texto-principal">UF:</p>
            <p className="texto">{result.uf}</p>
          </div>
        </div>
        :
        <div>
          {
            erro ?
            <div className="erro">
              <p className="texto-principal">Não foi possível carregar o CEP!</p>
              <p className="texto-principal">Talvez tenha sido digitado errado ou ele não existe</p>
            </div>
            :
            <div></div>
          }
        </div>
      }
      <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default App
