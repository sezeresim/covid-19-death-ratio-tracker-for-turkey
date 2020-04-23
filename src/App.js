import React,{ Component } from "react";
import './App.css'
import axios from 'axios';
import CanvasJSReact  from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      pages:[],
    };
  }

componentDidMount = async () => { 
  const response =await axios.get('https://pomber.github.io/covid19/timeseries.json');
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
   
    const dataPoint=[];
      this.state.pages.reverse().map(post => {
        let k=post.deaths/post.confirmed;
        let p=post.date;
        dataPoint.push({
          y: k,
          label: p
        })
    });
    
    console.log(dataPoint)

   const options = {
    animationEnabled: true,	
    title:{
      text: "Graph for Death Ratio"
    },
    axisY : {
      title: "Ratio Rate",
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "2020",
      showInLegend: true,
      dataPoints: dataPoint.slice(54)
    }]
}
 return(
  <div className="container">
   <h2>Covid19 Death Ratio</h2>
   <div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
   <hr/>
    <div className="row">
      {/* {posts} */}
    </div>
  </div>
 );
}
}

export default App;
