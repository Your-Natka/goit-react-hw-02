import css from './Feedback.module.css';

export const Feedback = ({ values: { good, neutral, bad }, totalFeedback, positiveFeedback }) => {
  return (
      <div className={css.container}>
          <p className={css.feedback}>Good: <span className={css.rating}>{good}</span></p>
          <p className={css.feedback}>Neutral: <span className={css.rating}>{neutral}</span></p>
          <p className={css.feedback}>Bad: <span className={css.rating}>{bad}</span></p>
          <p className={css.feedback}>Total: <span className={css.rating}>{totalFeedback}</span></p>
          <p className={css.feedback}>Positive: <span className={css.rating}>{positiveFeedback} %</span></p>
      </div>
  )
}