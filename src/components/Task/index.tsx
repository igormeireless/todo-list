import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

export function Task() {
  return (
    <div className={styles.wrapper}>
      <label>
        <input type='checkbox' />
        <span className={styles.checkmark}></span>

        <div className={styles.contentText}>
          <span className={styles.textActiveTask}>
            Integer urna interdum massa libero auctor neque turpis turpis
            semper. Duis vel sed fames integer.
          </span>
        </div>
      </label>

      <button title='Deletar tarefa'>
        <Trash size={22} />
      </button>
    </div>
  );
}
