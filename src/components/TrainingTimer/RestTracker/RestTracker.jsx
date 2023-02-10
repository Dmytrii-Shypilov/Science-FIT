import s from "./rest-tracker.module.scss";

import Timer from "../Timer";
import { useState } from "react";

const RestTracker = ({ restInterval, startNextSet }) => {
  const [restFinished, setRestFinished] = useState(false);

const completeRest = () => {
    setRestFinished(true)
}

  return (
    <div className={s.setsTracker}>
      <Timer countDown={true} time={restInterval} completeRest={completeRest} />
      {restFinished && (
        <div className={s.completionBlock}>
          <p className={s.text}>The rest is over. Please, proceed to the next round</p>
          <div>
            <button className={s.btn} onClick={startNextSet}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestTracker;
