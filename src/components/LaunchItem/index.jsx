import React, { useMemo } from "react";
import './index.scss';
import { Collapsible } from "../Collapsible";
import { timeAgo } from "../../utils/date";
import ReactJson from "react-json-view";
import ImageWithFallback from "../ImageFallback";


const LaunchDetails = ({
  launchTime,
  links,
  details
}) => {
  return (
    <div className="details">
      <div className="detailHeader">
        <div className="launchTime">
          {timeAgo(launchTime)} UTC
        </div>
        {links.video_link && (
          <>
            <div>|</div>
            <a target="_blank"
              rel="noreferrer"
              href={links.video_link}
            >Video</a>
          </>
        )}
      </div>
      <div className="content">
        <div className="badge">
          <ImageWithFallback
            src={links?.mission_patch}
            
            alt="mission patch"
            fallbackSrc='/noun-rocket-7371679.png'
          />
        </div>

        <div className="description">
          {details}
        </div>

      </div>
    </div>
  )
}

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

    <Collapsible>
      <LaunchDetails
        launchTime={item?.launch_date_utc}
        links={item?.links}
        details={item?.details}
      />
      {/* <pre><ReactJson src={item} /></pre> */}
    </Collapsible>

  </div>
}

export { LaunchItem }