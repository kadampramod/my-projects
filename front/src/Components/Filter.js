import React from "react";
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/Filter.css';


class myfilter extends React.Component {
  constructor() {
    super();
    this.state = {
        restaurants: [],
        locations: [],
        mealtype: undefined,
        location: undefined,
        cuisine: [],
        lcost: undefined,
        hcost: undefined,
        sort: 1,
        page: 1,
        pageCount: []
    }
}

componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { mealtype, location } = qs;

    const filterObj = {
        mealtype: Number(mealtype),
        location
    };

    axios({
        method: 'POST',
        url: 'http://localhost:1234/filter',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
    })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, mealtype, pageCount: response.data.pageCount })
        })
        .catch()

    axios({
        method: 'GET',
        url: 'http://localhost:1234/locations',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            this.setState({ locations: response.data.locations })
        })
        .catch()
}

handleSortChange = (sort) => {

    const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

    const filterObj = {
        mealtype: Number(mealtype),
        cuisine:cuisine.length == 0 ?undefined:cuisine,
        location,
        lcost,
        hcost,
        sort,
        page
    };

    axios({
        method: 'POST',
        url: 'http://localhost:1234/filter',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
    })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, sort, pageCount: response.data.pageCount })
        })
        .catch()
}

handleCostChange = (lcost, hcost) => {

    const { mealtype, cuisine, location, sort, page } = this.state;

    const filterObj = {
        mealtype: Number(mealtype),
        cuisine:cuisine.length == 0 ?undefined:cuisine,
        location,
        lcost,
        hcost,
        sort,
        page
    };

    axios({
        method: 'POST',
        url: 'http://localhost:1234/filter',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
    })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, lcost, hcost, pageCount: response.data.pageCount })
        })
        .catch()
}

handleLocationChange = (event) => {
    const location = event.target.value;

    const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

    const filterObj = {
        mealtype: Number(mealtype),
        cuisine:cuisine.length == 0 ?undefined:cuisine,
        location,
        lcost,
        hcost,
        sort,
        page
    };

    axios({
        method: 'POST',
        url: 'http://localhost:1234/filter',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
    })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, location, pageCount: response.data.pageCount })
        })
        .catch()
}
handleCuisine = (cuisineId) => {   

    const { mealtype,cuisine, location, lcost, hcost, sort, page } = this.state;   

const index = cuisine.indexOf(cuisineId);

if(index == -1){
    cuisine.push(cuisineId);
}else{
    cuisine.splice(index,1);
}

    const filterObj = {
        mealtype: Number(mealtype),
        cuisine: cuisine.length == 0 ?undefined:cuisine,
        location,
        lcost,
        hcost,
        sort,
        page
    };

    axios({
        method: 'POST',
        url: 'http://localhost:1234/filter',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
    })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants,cuisine, pageCount: response.data.pageCount })
        })
        .catch()
        }

        handlepage = (page) => {   

            const { mealtype,cuisine, location, lcost, hcost, sort } = this.state;   
        
        
            const filterObj = {
                mealtype: Number(mealtype),
                cuisine:cuisine.length == 0 ?undefined:cuisine,
                location,
                lcost,
                hcost,
                sort,
                page
            };
        
            axios({
                method: 'POST',
                url: 'http://localhost:1234/filter',
                headers: { 'Content-Type': 'application/json' },
                data: filterObj
            })
                .then(response => {
                    this.setState({ restaurants: response.data.restaurants,page, pageCount: response.data.pageCount })
                })
                .catch()

            }
            handleClick = (resId) =>{
                this.props.history.push(`/details?restaurant=${resId}`);
            }

  render() {
    const { restaurants, locations, pageCount } = this.state;
    return (
      <div> 
      
       
       <div className=" mainheading">Breakfast Places </div>
       
       <div className="container-fluid">
       <div className="row">  
                     <div  class="lb col-sm-12 col-lg-3 col-md-3 "  >     
<div className="fil">Filters</div>
                     <span className="glyphicon glyphicon-chevron-down toggle-span icon" data-toggle="collapse"
                                    data-target="#filter"></span>                       
                             <div id="filter" className="collapse show">                                   
                                        
                          <div className=" locat">Select Location</div>   
                          <div > <select className="select" onChange={this.handleLocationChange}> 
                          <option value="0">Select</option>
                                        {locations.map((item) => {
                                            return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                        })}
                         </select> </div>   
                          <div className="cuisine">Cuisine</div>   
                           <div className="cbox"> <input type="checkbox"onChange={() => this.handleCuisine(1)}/> North Indian</div>   
                          <div className="cbox"> <input type="checkbox" onChange={() => this.handleCuisine(2)}/> South Indian</div>   
                          <div className="cbox"> <input type="checkbox" onChange={() => this.handleCuisine(3)}/> Chinese</div>   
                          <div className="cbox"><input type="checkbox" onChange={() => this.handleCuisine(4)}/> Fast Food</div>   
                          <div className="cbox"> <input type="checkbox" onChange={() => this.handleCuisine(5)}/>Street Food</div>                 
                          <div className="cost">Cost For Two</div>    
                          <div className="radio"><input type="radio" name="CFT" onChange={() => this.handleCostChange(1, 500)}/> Less than ₹500 </div>   
                          <div className="radio"> <input type="radio"name="CFT" onChange={() => this.handleCostChange(500, 1000)}/> ₹500 to ₹1000</div>   
                          <div className="radio"> <input type="radio" name="CFT" onChange={() => this.handleCostChange(1000, 1500)}/> ₹1000 to ₹1500</div>   
                          <div className="radio"><input type="radio" name="CFT" onChange={() => this.handleCostChange(1500, 2000)}/>  ₹1500 to ₹2000</div>   
                          <div className="radio"> <input type="radio" name="CFT" onChange={() => this.handleCostChange(2000, 50000)}/> ₹2000+</div>   
                          <div className="sort"> Sort</div>   
                          <div className="radio"> <input type="radio" name="sort" onChange={() => this.handleSortChange(1)}/> Price low to high</div>   
                          <div className="radio"> <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)}/> Price high to low</div>   
                   </div>
                   </div>
                   
                      
              <div className=" col-sm-12 col-lg-8 col-md-8 ">                    
                   {restaurants.length > 0 ? restaurants.map(item => {
                                    return <div className="rb" onClick={() => this.handleClick(item._id)}>
                                    
                       <div className="rb1">
                           <img src={`./${item.image}`} className="img" />
                      <div className="righttop"> <div className="shop">{item.name}</div> <div className="add1"> {item.locality}</div>
                            <div className="add2"> {item.city}</div> </div>
                            <hr/>
                            <div className="Bb1">  CUISINES: </div><span className="Bb2">
                               {item.cuisine.map(cuisineItem => { return `${cuisineItem.name}, ` })}  </span>
                               <br/>
                             <div className="Bb1">COST FOR TWO: </div>  <span className="Bb2"> &#8377; {item.min_price}    </span>
                             </div>   
                       <br/>                       
                 </div> }) : <div className='no-records'>No Records Found ...</div>}
                       
                        {restaurants.length > 0 ? <div className="sb">
                            <span className="sbs ">&lt;</span> 
                            {pageCount.map(pageNo => {
                                            return <span className="sbs" onClick={() => this.handlepage(pageNo)}>{pageNo}</span>
                                        })}
                            <span className="sbs"> &gt;</span>
                        </div>: null}
                        </div>
                    </div>
                   </div>
                   </div>
                 
                        
    );
  }
}

export default myfilter;
