import React, { useState, useEffect } from 'react';
import api from  './services/api'; 

import './global.css';
import'./App.css'; 
import './Sidebar.css'; 
import './Main.css';

import  DevItem from'./components/DevItem';
import DevForm from  './components/DevFor';

//componente: Bloco isolado de Html css e js o qual não interfere no resto da aplicação 
// Porpiedade: Informacões que um componente Pai passa para componentes Filho 
//estado : informações mantidas pelo componente (lembrar: imultabilidade)

function App() {
  const [ devs, setDevs] = useState([]);
  

  useEffect(() =>{ 
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  },[]);

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
  
    
    setDevs([...devs, response.data]);
  }

  return (
  <div id="app">
    <aside>
      <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
    </aside>
    <main>
      <ul>
        {devs.map(dev => (
          <DevItem  dev={dev} />
        ))}
      </ul>
    </main>
  </div>
  );
}

export default App;
