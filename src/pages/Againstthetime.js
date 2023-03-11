import React, { useEffect, useState } from 'react'
import StreetView from '../components/StreetView'
import { useDispatch, useSelector } from 'react-redux'
import { startthegametime } from '../Redux/MapGameSlices/gameSlice'
import Maptime from '../components/minimaps/MiniMapfortimemod'
import AgainstResultPage from './resultPages/AgainstthetimeresultPage'
import { setagaintimescore, againsttimeguess } from '../Redux/MapGameSlices/mapSlice'
import { useParams } from "react-router-dom";

import styles from "../styles/mapStyle.module.css";

export default function Againstthetime() {
  const dispatch = useDispatch()
  const [starting, setstarting] = useState(false)
  const isshow = useSelector((state) => state.gmSlc.gamestarttime);
  const guess = useSelector((state) => state.mapSlc.guess);
  const score = useSelector((state) => state.mapSlc.againsttimescore);
  const [timer, settimer] = useState(0)
  const [timer1, settimer1] = useState(5)
  const [timer2, settimer2] = useState(20)
  const [timer3, settimer3] = useState(100)
  const [round, setround] = useState(0)
  const [sonuc, setsonuc] = useState(0)
  const [showresult, setshowresult] = useState(true)

  const { countryName } = useParams();

  useEffect(() => {


    const time = setInterval(() => {

      if (timer1 > 1) {
        ilksayac()
      } else {
        setstarting(true)
      }
      ucsayac()
      if (timer3 === 0) {
        setshowresult(true)
        settimer2(20)
        dispatch(setagaintimescore(0))
        dispatch(againsttimeguess(0))
        setround(round + 1)

      }
      if (round === 5) {
        setsonuc(1)

      }

      if (isshow === true) {
        ikisayac()

        if (timer2 === 0) {
          console.log('see you later')
          dispatch(startthegametime())
          setshowresult(false)
          console.log(score, guess)
          if (round === 5) {
            settimer3(-1)
          } else {
            settimer3(10)
          }

        }


      }
      addtime()

    }, 1000);

    return () => clearInterval(time)
  })

  const addtime = () => {

    settimer(timer + 1)


  }
  const ilksayac = () => {

    settimer1(timer1 - 1)


  }
  const ikisayac = () => {

    settimer2(timer2 - 1)


  }
  const ucsayac = () => {

    settimer3(timer3 - 1)


  }

  return (
    <div>
      {starting ? (
        <>
          {showresult ? (
            <div>
              <Maptime></Maptime>
              <StreetView countryName={countryName} />
              {isshow ? (
                // kalan zaman ve etrafındaki çember
                <div className='flex items-center justify-center'>
                  <svg width="100" height="100" style={{ zIndex: 2 }}>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ff4500" />
                        <stop offset="100%" stopColor="#8a2be2" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" stroke="#cccccc" />
                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" stroke="url(#gradient)"
                      strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (1 - timer2 / 20)} />
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className={styles.counterVal} style={{ fontSize: "30px" }}>
                      {timer2}
                    </text>
                  </svg>
                </div>

              ) : (
                <></>
              )}
            </div>
          ) : (
            <>
              <AgainstResultPage score={score} guess={guess} sonuc={sonuc} ></AgainstResultPage>
            </>
          )}
        </>
      ) : (
        <div className="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-500 via-sky-800 to-red-900 min-h-screen flex justify-center items-center">
          <p className={styles.counterVal} style={{ fontSize: "15rem" }}>
            {timer1}
          </p>
        </div>
      )}
    </div>
  )
}