import { joinClassNames } from '../../../utils/joinClassNames.js';
import styles from './Avatar.modules.css'

const Avatar = ({src, alt = '', size = 36, className = ''}) => {
    return (
        <span className={joinClassNames(styles.avatar, className)} style={{width: size, height: size}}>
            {src && <img src={src} alt={alt} className={styles.image} />}
        </span>
    )
}

export default Avatar;