import React from 'react'
// import './App.css'
import DogList from './components/DogList'
import AdoptionProcess from './components/AdoptionProcess'
import CharityDonations from './components/CharityDonations'
function App() {

  return (
    <>
    <h1>Dog List</h1>
      <DogList />
      <AdoptionProcess/>
      <CharityDonations/>
    </>
  )
}

export default App
