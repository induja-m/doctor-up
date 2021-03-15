/**
 * Ratings for the doctors
 */
import './rating.css';
const Rating = ({rating}) => {
    const printStar =()=> {
        let i=0;
        let starArray=[];
        for (i;i<5;i++){
            let starClass= (i<rating) ?'active-star':'star';
            starArray.push(<span className={starClass} key={i}>&#x02605;</span>)
        }
        return starArray;
    }
    return (
        <>
            {printStar()}
        </>
    )
}
export default Rating;