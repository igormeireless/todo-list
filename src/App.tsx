import { PlusCircle } from 'phosphor-react';

import { Header } from './components/Header';

import './global.css';

import styles from './App.module.css';

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <div className={styles.contentInput}>
          <input type='text' placeholder='Adicione uma nova tarefa' />
          <button type='submit'>
            Criar
            <PlusCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
