import { FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Header } from './components/Header';
import Clipboard from './assets/clipboard.svg';

import './global.css';

import styles from './App.module.css';
import { Task } from './components/Task';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

interface Inputs {
  task: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const resumeTasks = tasks.reduce(
    (acc, task) => {
      if (task.isComplete) {
        acc.tasksCompleted++;
      }
      acc.total++;

      return acc;
    },
    {
      total: 0,
      tasksCompleted: 0,
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.task,
      isComplete: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
    reset();
  };

  function handleToggleTask(id: string) {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isComplete: task.id === id ? !task.isComplete : task.isComplete,
    }));

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: string) {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.content}>
            <input
              type='text'
              {...register('task', { required: true })}
              placeholder='Adicione uma nova tarefa'
            />
            {errors.task && <small>Campo obrigatório</small>}
          </div>

          <button type='submit'>
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div>
          <header className={styles.resume}>
            <div className={styles.contentResume}>
              <h4 className={styles.tasksCreated}>Tarefas criadas</h4>
              <span>{resumeTasks.total}</span>
            </div>

            <div className={styles.contentResume}>
              <h4 className={styles.tasksFinished}>Concluídas</h4>
              <span>{`${resumeTasks.tasksCompleted} de ${resumeTasks.total}`}</span>
            </div>
          </header>

          {tasks.length > 0 ? (
            tasks.map((item) => (
              <Task
                key={item.id}
                task={item}
                onChangeTask={handleToggleTask}
                onRemoveTask={handleRemoveTask}
              />
            ))
          ) : (
            <div className={styles.noList}>
              <img src={Clipboard} alt='Imagem de lista' />

              <h2>Você ainda não tem tarefas cadastradas</h2>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
