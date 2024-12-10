import React, { useMemo } from "react";
import './index.scss';
const LaunchItem = ({ item }) => {

  const statusChip = useMemo(
    () => {
      if (item.upcoming) {
        return <div className="status upcoming">
          Upcoming
        </div>
      }
      if (item.launch_success) {
        return <div className="status success">
          Success
        </div>
      }
      else {
        return <div className="status failed">
          Failed
        </div>
      }

    }, [item.launch_success, item.upcoming]
  );

  return <div className="list-item">
    <div className="headerbar">
      <h2 className='header'>
        {item?.mission_name}
      </h2>
      {statusChip}
      
    </div>


    <pre>{JSON.stringify(item, null, 2)}</pre>

  </div>
}

export { LaunchItem }