import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { LaunchItem } from "../LaunchItem";

import './index.scss'

const DEFAULTLIMIT = 10

const SpaceList = () => {

  const [loading, setLoading] = useState(false);

  const [launchData, setLaunchData] = useState([]);

  const [error, setError] = useState('');

  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(
    async () => {
      if (loading) return;  //premature exit to prevent stacking of network requests
      setLoading(true)

      try {
        const url = `https://api.spacexdata.com/v3/launches?limit=${DEFAULTLIMIT}&offset=${offset}&sort=flight_number&order=desc`
        const response = await fetch(url)

        if (!response?.ok) {
          setError(`api failure: ${response?.status}`)
          setLoading(false)
          return
        } else {
          const data = await response.json()
          setLaunchData([...launchData, ...data])
          setOffset(offset + DEFAULTLIMIT)
          setError(null)
        }

      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }

      return null
    }, [launchData, loading, offset]
  );


  useEffect(
    () => {
      fetchData()
    }, []
  );

  const handleScroll = useCallback(
    async () => {

      return null
    }, []
  );

  if (loading) {
    return <Spinner />
  }

  if (launchData.length <= 0) {
    return <>No data</>
  }
  return (
    <>
      <ul className="list">
        {launchData.map((data, index) => (
          <li
            key={index}
            className="item">
              <LaunchItem item={data}/>
          </li>
        ))}
      </ul>
      {error && <div className="card error">{error}</div>}
    </>
  )
}

export { SpaceList }