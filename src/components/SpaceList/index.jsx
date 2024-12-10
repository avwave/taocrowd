import React, { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { LaunchItem, VirtualizedItem } from "../LaunchItem";

import './index.scss'

const DEFAULTLIMIT = 20

const SpaceList = () => {

  const listRef = useRef(null)

  const [loading, setLoading] = useState(false);

  const [launchData, setLaunchData] = useState([]);

  const [error, setError] = useState('');

  const [offset, setOffset] = useState(0);

  const [hasReachedEnd, setHasReachedEnd] = useState(false);


  const fetchData = useCallback(
    async () => {
      if (loading) return;  //premature exit to prevent stacking of network requests
      setLoading(true)

      try {
        setHasReachedEnd(false)
        const scrollTop = listRef.current?.scrollTop;
        console.log(scrollTop, listRef)
        const url = `https://api.spacexdata.com/v3/launches?limit=${DEFAULTLIMIT}&offset=${offset}&sort=flight_number&order=desc`
        const response = await fetch(url)

        if (!response?.ok) {
          setError(`api failure: ${response?.status}`)
          setLoading(false)
          return
        } else {
          const data = await response.json()
          if (data.length <=0) {
            setHasReachedEnd(true)
            return
          }
          setLaunchData([...launchData, ...data])
          setOffset(offset + DEFAULTLIMIT)
          setError(null)
          setTimeout(() => {
            listRef.current.scrollTop = scrollTop;
          }, 0);
        }

      } catch (error) {
        setError(error)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }, [launchData, loading, offset, listRef, setHasReachedEnd]
  );


  useEffect(
    () => {
      
        fetchData()
      
    }, []
  );

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight || loading
      )
        return;

      await fetchData();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [listRef, fetchData, loading]);


  const getItem = (index) => (
    <LaunchItem
      key={launchData[index].flight_number}
      item={launchData[index]}
    />
  )

  return (
    <>
      <div
        className="list"
        ref={listRef}
      >
        {launchData.map((data, index) => (
          <VirtualizedItem getItem={getItem} key={index} index={index} />

        ))}
        {loading && (
          <Spinner/>
        )}
        {hasReachedEnd && (
          <>no more data</>
        )}
      </div>
      {error && <div className="card error">{error}</div>}
    </>
  )
}

export { SpaceList }