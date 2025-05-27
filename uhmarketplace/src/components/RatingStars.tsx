'use client'

import { useState } from "react"
import { Rating } from 'react-simple-star-rating'

type Props = {
  initialValue?: number
}

export default function RatingStars({ initialValue = 0 }: Props) {
  const [rating, setRating] = useState(initialValue)

  const handleRating = (rate: number) => {
    setRating(rate)
    console.log("Rated:", rate)
  }

  return (
    <Rating
      onClick={handleRating}
      initialValue={rating}
      className="inline-flex"
    />
  )
}
