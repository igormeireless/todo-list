import { FormEvent, useEffect, useState } from 'react';
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

  const LOCAL_STORAGE_KEY = '@todo-list:tasks';

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

  function getTasks() {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  function addTasks(value: Task[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  }

  const onSubmit: SubmitHandler<Inputs> = (newData) => {
    const newTask: Task = {
      id: uuidv4(),
      title: newData.task,
      isComplete: false,
    };

    try {
      const data = getTasks();
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [newTask, ...currentData];

      addTasks(dataFormatted);
      setTasks(dataFormatted);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  function handleToggleTask(id: string) {
    try {
      const data = getTasks();
      const currentData: Task[] = data ? JSON.parse(data) : [];

      const updatedTasks = currentData.map((task) => ({
        ...task,
        isComplete: task.id === id ? !task.isComplete : task.isComplete,
      }));

      addTasks(updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  }

  function handleRemoveTask(id: string) {
    try {
      const data = getTasks();
      const currentData: Task[] = data ? JSON.parse(data) : [];

      const newTask = currentData.filter((task) => task.id !== id);

      addTasks(newTask);
      setTasks(newTask);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = getTasks();
    const currentData = data ? JSON.parse(data) : [];

    setTasks(currentData);
  }, []);

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
            {errors.task && <small>Campo obrigat??rio</small>}
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
              <h4 className={styles.tasksFinished}>Conclu??das</h4>
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

              <h2>Voc?? ainda n??o tem tarefas cadastradas</h2>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
