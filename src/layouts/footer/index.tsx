import Link from 'next/link';
import styles from './styles.module.scss';
import FacebookSquare from '@/Icon/FacebookSquare';
import Instagram from '@/Icon/Instagram';
import Twitter from '@/Icon/Twitter';
import Youtube from '@/Icon/Youtube';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className='container'>
        <div className={styles['footer-icons']}>
          <Link href=''>
            <FacebookSquare />
          </Link>
          <Link href=''>
            <Instagram />
          </Link>
          <Link href=''>
            <Twitter />
          </Link>
          <Link href=''>
            <Youtube />
          </Link>
        </div>

        <div className={styles['footer-links']}>
          <div className='row'>
            <div className='col-3'>
              <Link href='#'>FAQ</Link>
              <Link href='#'>Investor Relations</Link>
              <Link href='#'>Ways to watch</Link>
              <Link href='#'>Corporate information</Link>
              <Link href='#'>QH Originals</Link>
            </div>

            <div className='col-3'>
              <Link href='#'>Help center</Link>
              <Link href='#'>Jobs</Link>
              <Link href='#'>Terms of use</Link>
              <Link href='#'>Contact us</Link>
            </div>

            <div className='col-3'>
              <Link href='#'>Account</Link>
              <Link href='#'>Redeem Gift cards</Link>
              <Link href='#'>Privacy</Link>
              <Link href='#'>Speed Test</Link>
            </div>

            <div className='col-3'>
              <Link href='#'>Media Center</Link>
              <Link href='#'>Buy Gift Cards</Link>
              <Link href='#'>Cookie Preferences</Link>
              <Link href='#'>Legal Notices</Link>
            </div>
          </div>
        </div>

        <span className={styles['footer-copyright']}>© Developed by QuangHuong</span>
      </div>
    </footer>
  );
}

export default Footer;
