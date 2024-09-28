import classNames from 'classnames';
import styles from './styles.module.scss';

function Skeleton() {
  return (
    <div className='col'>
      <div
        className={classNames(styles['card'], 'skeleton')}
        style={{ borderRadius: 6 }}></div>
    </div>
  );
}

export default Skeleton;
