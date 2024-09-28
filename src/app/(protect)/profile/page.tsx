import ProfileItem from './ProfileItem';
import styles from './styles.module.scss';

function Profile() {
  return (
    <div className={styles['profile']}>
      <h1 className={styles['profile-title']}>Who is watching?</h1>
      <div className={styles['profile-list']}>
        <ProfileItem
          imageUrl='/img/profile-a.png'
          text='Quang Huong'
        />
        <ProfileItem
          imageUrl='/img/profile-b.png'
          text='Anh Gau'
        />
        <ProfileItem
          imageUrl='/img/profile-c.png'
          text='Bich Hue'
        />
      </div>
      <span className={styles['profile-label']}>Manage Profile</span>
    </div>
  );
}

export default Profile;
