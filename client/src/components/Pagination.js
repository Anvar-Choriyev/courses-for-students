import { Link } from 'react-router-dom';
import styles from "../components/Pagination.module.css"

const Pagination = ({ route, pagination, size, paginate, page}) => {
    const {allPagesCount, isLastPage, isFirstPage} = pagination

    const pageNumbers = [];
    for(let i = 1; i <= allPagesCount; i++) {
        pageNumbers.push(i)
    }

    return (
    <div className={styles.page}>
        <div className={styles.pagination}>
            <div className={styles.buttons}>
            <Link
        disabled
        to={`/${route}?page=${+page - 1}&size=3`}
        className={`${styles.prev} ${isFirstPage ? styles.disabledTrue : ""}`}
      >
        <svg
          enableBackground="new 0 0 32 32"
          height="28px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 32 32"
          width="28px"
          xmlns="http://www.w3.org/2000/svg"
          fill="#515151"
        >
          <path d="M7.701,14.276l9.586-9.585c0.879-0.878,2.317-0.878,3.195,0l0.801,0.8c0.878,0.877,0.878,2.316,0,3.194  L13.968,16l7.315,7.315c0.878,0.878,0.878,2.317,0,3.194l-0.801,0.8c-0.878,0.879-2.316,0.879-3.195,0l-9.586-9.587  C7.229,17.252,7.02,16.62,7.054,16C7.02,15.38,7.229,14.748,7.701,14.276z" />
        </svg>
      </Link>
            </div>
      <div>
            <ul className={styles.pagination}>
                {pageNumbers.map(number => (
                    <li key={number} className={styles.paginationitems}>
                        <Link onClick={() => paginate(number)} 
                        to={`/${route}?page=${number}&size=${size}`}
                        className={number === +page ? styles.selected: styles.item}>
                            {number}</Link>
                    </li>
                ))}
            </ul>
        </div>
            <div className={styles.buttons}>
            <Link
            disabled
        to={`/${route}?page=${+page + 1}&size=3`}
        className={`${styles.next} ${isLastPage ? 
        styles.disabledTrue : ""
        }`}>
        <svg
          enableBackground="new 0 0 32 32"
          height="28px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 32 32"
          width="28px"
          xmlns="http://www.w3.org/2000/svg"
          fill="#515151"
        >
          <path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z" />
        </svg>
      </Link>
            </div>
        </div>
    </div>
    )
}
 
export default Pagination;