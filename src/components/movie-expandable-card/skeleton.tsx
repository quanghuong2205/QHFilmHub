import classNames from 'classnames';
import styles from './styles.module.scss';

function Skeleton() {
  return (
    <div className='col'>
      <div
        className={classNames({
          [styles['card']]: true,
          [styles['skeleton']]: true,
        })}>
        <div className='skeleton'></div>
      </div>
    </div>
  );
}

export default Skeleton;
