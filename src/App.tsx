import { PlusCircle } from 'phosphor-react';

import Clipboard from './assets/clipboard.svg';

import { Header } from './components/Header';

import './global.css';

import styles from './App.module.css';
import { Task } from './components/Task';

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form>
          <input type='text' placeholder='Adicione uma nova tarefa' />

          <button type='submit'>
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div>
          <header className={styles.resume}>
            <div className={styles.contentResume}>
              <h4 className={styles.tasksCreated}>Tarefas criadas</h4>
              <span>0</span>
            </div>

            <div className={styles.contentResume}>
              <h4 className={styles.tasksFinished}>Concluídas</h4>
              <span>0</span>
            </div>
          </header>

          <Task />
          <Task />

          {/* <div className={styles.noList}>
            <img src={Clipboard} alt='Imagem de lista' />

            <h2>Você ainda não tem tarefas cadastradas</h2>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
