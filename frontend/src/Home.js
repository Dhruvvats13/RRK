import React, { useEffect, useState } from 'react'
import Card from './Card'
// import Carousel from '../components/Carousel'
import Footer from './Footer'
import Navbar from './component/Navbar'
import './Home.css'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:3001/api/auth/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response[1][0].CategoryName)
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div className='Home'>
      <div>
        <Navbar />
      </div>
           <div >
              <img src={require("./delicious-indian-food-tray.jpg")} className=" image" />
            </div>
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat !== []
            ? 
            foodCat.map((data) => {
              return (
                <div className='row mb-3' key={data.id}>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {(foodItems !== undefined && foodItems.length > 0) ? foodItems.filter(
  (items) => (items.CategoryName === data.CategoryName) && (items.name && items.name.toLowerCase && items.name.toLowerCase().includes(search.toLowerCase())))
  .map(filterItems => {
    return (
      <div className='col-12 col-md-6 col-lg-3' key={filterItems.id}>
        <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
      </div>
    )
  }) : <div> No Such Data </div>}
                </div>
              )
            })
            
            : ""}
      </div>
      <Footer />
    </div>









  )
}