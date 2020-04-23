import React,{ Component } from "react";
import './App.css'
import axios from 'axios';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      pages:[],
    };
  }

componentDidMount = async () => { 
  const response =await axios.get('https://pomber.github.io/covid19/timeseries.json');
  console.log(response.data["Turkey"]);
  this.setState({ 
    pages: response.data["Turkey"], 
  }); 
};


render() {
   const posts = this.state.pages.reverse().map(post => (
     <div className="alert alert-primary col-md-12">
        <strong className="text text-danger">{post.deaths/post.confirmed}</strong> 
        <hr/>
        <p>{post.date}</p>
     </div>
   ));

 return(
  <div className="container">
   <h2>Covid19 Death Ratio</h2>
   <hr/>
    <div className="row">
      {posts}
    </div>
  </div>
 );
}
}

export default App;
