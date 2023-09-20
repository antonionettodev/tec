import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [oab, setOAB] = useState('');
  const [seguranca, setSeguranca] = useState('');
  const [senha, setSenha] = useState('');



const handleSubmit = async (e) => {
  e.preventDefault();

  // Obtenha os valores dos campos do estado local
  const formData = {
    oab,
    seguranca,
    senha,
  };

  // Faça a solicitação POST para o servidor Node.js
  try {
    const response = await axios.post('http://localhost:8800/validar-oab', formData);

    // Verifique a resposta do servidor
    if (response.status === 200) {
      // Se a resposta for bem-sucedida, você pode lidar com isso aqui
      console.log(response.data.message); // Exibir uma mensagem de sucesso, se aplicável
    } else {
      console.error('Erro desconhecido no servidor');
    }
  } catch (error) {
    // Se ocorrer um erro na solicitação (por exemplo, erro de rede ou erro no servidor)
    console.error('Erro na solicitação:', error.message);
  }
};



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="oab">OAB:</label>
        <input
          type="text"
          id="oab"
          value={oab}
          onChange={(e) => setOAB(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="seguranca">Número:</label>
        <input
          type="text"
          id="seguranca"
          value={seguranca}
          onChange={(e) => setSeguranca(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <p></p>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Register;