import { ImageProcessing } from '../../utils/ImageProcessing';

import './Card.css';

interface CardProps {
    imgName: string
    title: string
}

const Card = ({
    imgName,
    title
}: CardProps) => {
    return (
        <div className="card">
            <div className='card-content'>
                <img
                    src={ImageProcessing(`https://image.tmdb.org/t/p/w500/`, imgName)}
                    alt={title}
                    loading='lazy'
                />
            </div>
            <h5>{title}</h5>
        </div>
    )
}

export default Card;