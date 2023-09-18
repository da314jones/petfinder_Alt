import React from 'react'
import './App.css'
import DogList from './components/DogList'
import AdoptionProcess from './components/AdoptionProcess'
import CharityDonations from './components/CharityDonations'
import SupportSection from './components/SupportSection'
import DogSearch from './components/DogSearch'
// import DogDetails from './components/dogDetails'
function App() {

  return (
    <>
    <h1>Dog List</h1>
      <DogList />
      <AdoptionProcess/>
      <CharityDonations/>
      <SupportSection/>
      <DogSearch/>
      {/* <DogDetails/> */}


    </>
  )
}

export default App
