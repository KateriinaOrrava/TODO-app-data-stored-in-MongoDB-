import React, { useContext } from 'react'
import styles from './Header.module.css'
import { DataContext } from '../App';

export default function Header() {

  const data= useContext(DataContext);

  return (
    <div className={styles.header}>
      There are {data.length} things to do!
    </div>
  )

}
