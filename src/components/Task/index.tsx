import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

interface TaskProps {
  task: Task;
  onChangeTask: (id: string) => void;
  onRemoveTask: (id: string) => void;
}

export function Task({ task, onChangeTask, onRemoveTask }: TaskProps) {
  return (
    <div className={styles.wrapper}>
      <label>
        <input
          type='checkbox'
          checked={task.isComplete}
          onChange={() => onChangeTask(task.id)}
        />
        <span className={styles.checkmark}></span>
        <p
          className={
            task.isComplete ? styles.textDisableTask : styles.textActiveTask
          }
        >
          {task.title}
        </p>
      </label>

      <button title='Deletar tarefa'>
        <Trash size={22} onClick={() => onRemoveTask(task.id)} />
      </button>
    </div>
  );
}
