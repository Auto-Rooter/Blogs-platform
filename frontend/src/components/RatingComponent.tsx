import { useState, useEffect } from 'react'
import { rateArticle } from '../api/ratings';
import { getFingerprint } from '../hooks/useFingerprint'; 
import { formateDuration } from '../utils/formatDuration';

interface RatingProps {
    articleId: string;
}
const RatingComponent = ({articleId}: RatingProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const checkIfRated = async () => {
      const fp = await getFingerprint();
      const rated = localStorage.getItem(`rated-${articleId}-${fp}`);
      if (rated) {
        setRating(parseInt(rated));
        setSubmitted(true);
      }
    };
    checkIfRated();
  }, [articleId]);


  const handleRate = async (value: number) => {
    const fingerprint = await getFingerprint();
    try {
        await rateArticle(articleId, value, fingerprint);
        localStorage.setItem(`rated-${articleId}-${fingerprint}`, value.toString());
        setRating(value);
        setSubmitted(true);
    }catch(e: Error | any){
        console.error(e);
    }
  }
    return (
        <div className='mt-6'>
            { !submitted &&
              <p className='mb-2 font-bold'>Rate the Article</p> 
            }
            <div className='flex gap-2'>
                { [1,2,3,4,5].map((value) => (
                    <button
                        key={value}
                        onClick={() => handleRate(value)}
                        disabled={submitted}
                        className={`text-2xl ${rating !== null && value <= rating ? "text-yellow-300" : "text-gray-400"} hover: scale-110 transition`}
                    >
                        ★
                    </button>
                ))
                }
                { submitted && (
                    <i className='mt-2'>{rating}</i>
                )}
            </div>
        </div>
  )
}

export default RatingComponent