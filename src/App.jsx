import React from 'react'
import './App.css'
import DogList from './components/DogList'
import AdoptionProcess from './components/AdoptionProcess'
import CharityDonations from './components/CharityDonations'
import SupportSection from './components/SupportSection'
import DogSearch from './components/DogSearch'
import SocialMedia from './components/SocialMedia'
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
      <SocialMedia/>
      {/* <DogDetails/> */}


    </>
  )
}

export default App
