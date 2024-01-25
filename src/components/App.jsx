import { useState, useEffect } from "react";
import { Description } from './Description/Description';
import { Options } from './Options/Options';
import { Feedback } from './Feedback/Feedback';
import { Notification } from './Notification/Notification';

const getInitialValues = () => {
  const savedValues = window.localStorage.getItem('saved-values');
  if (savedValues !== null) {
    return JSON.parse(savedValues);
  }

  return {
    good: 0,
    neutral: 0,
    bad: 0
  }
};

const getInitialClicks = () => {
  const savedClicks = window.localStorage.getItem('saved-clicks');
  if (savedClicks !== null) {
    return JSON.parse(savedClicks);
  }

  return 0;
};

export const App = () => {
  const [values, setValues] = useState(getInitialValues);

  const [clicks, setClicks] = useState(getInitialClicks);

  const onLeaveFeedback = (option) => {
    setValues({
      ...values,
      [option]: values[option] + 1
    });
    
    setClicks(clicks + 1);
  };

  const onReset = () => {
    setValues({
      ...values,
      good: 0,
      neutral: 0,
      bad: 0
    });
    
    setClicks(0);
  };

  useEffect(() => {
    window.localStorage.setItem('saved-values', JSON.stringify(values));
    window.localStorage.setItem('saved-clicks', clicks);
  }, [values, clicks]);

  const isHidden = clicks === 0;

  const totalFeedback = values.good + values.neutral + values.bad;

  const positiveFeedback = Math.round(((values.good + values.neutral) / totalFeedback) * 100);

  return (
    <div>
      <Description />
      <Options onUpdate={onLeaveFeedback} isHidden={isHidden} onReset={onReset} />
      {
        isHidden ? <Notification /> : <Feedback values={values} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback}/> 
      }
    </div>
  );
};