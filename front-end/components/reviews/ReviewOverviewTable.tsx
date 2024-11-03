import React, { useEffect, useState } from "react";
import { Review } from "../../types";
import ReviewService from "../../services/ReviewService";

type Props = {
  reviews: Array<Review>;
};

const ReviewOverviewTable: React.FC<Props> = ({ reviews }: Props) => {
  return (
    <>
      {reviews && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Score</th>
              <th scope="col">Text</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index} role="button">
                <td>{review.score}</td>
                <td>{review.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ReviewOverviewTable;
