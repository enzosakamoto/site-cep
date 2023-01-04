import './App.css'
import api from './services/api'
import { useState } from 'react'

function App() {
  const [cep, setCEP] = useState('');
  const [result, setResult] = useState({});
  const [sucess, setSucess] = useState(false);
  const [erro, setErro] = useState(false);

  function handleRegister(event) {
    event.preventDefault();
    if(!cep || cep.length != 8) {
      alert("Digite um CEP válido!");
      return;
    }
    async function loadResult() {
      await api.get(`/${cep}/json`)
      .then((response) => {
        setResult(response.data);
        setSucess(true);
        setErro(false);
        console.log(response.data);
        if(response.data.erro) {
          setErro(true);
          setSucess(false);
        }
      })
      .catch(() => {
        setErro(true);
        setSucess(false);
        return;
      })
    }
    loadResult();
  }

  return (
    <div className="App">
      <h1>Brasil CEP</h1>
      <form onSubmit={handleRegister}>
        <label className="texto-principal">Digite seu CEP</label>
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
            <div>
              <p className="texto-principal">Não foi possível carregar o CEP!</p>
            </div>
            :
            <div></div>
          }
        </div>
      }
    </div>
  )
}

export default App
