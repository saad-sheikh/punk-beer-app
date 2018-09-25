import React, {Component} from 'react';
import './App.css';
import * as Axios from 'axios';
import Header from './components/Header'
import Search from './components/Search'
import MainContainer from "./components/MainContainer";

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         results: [],
         query: '',
         pageNo: 1,
         favourites: [],
         scrollVal: 0,
         currSection: 'home',
         sections: [
            'home',
            'favourites'
         ]
      };
      this.updateQuery = this.updateQuery.bind(this);
      this.search = this.search.bind(this);
      this.changeSection = this.changeSection.bind(this);
      this.addToFav = this.addToFav.bind(this);
      this.loadMore = this.loadMore.bind(this);
   }

   async componentWillMount() {
      this.search(this.state.query, this.state.pageNo)
   }

   componentDidMount() {
      window.addEventListener('scroll', (e) => {
         if (window.scrollY > this.state.scrollVal + 2000) {
            this.setState((prevState) => {
               return {
                  scrollVal: prevState.scrollVal + window.scrollY
               }
            });
            this.loadMore();
         }
      })
   }

   changeSection(val) {
      this.setState({
         currSection: val
      })
   }

   addToFav(id, status) {
      if (status) {
         this.state.favourites.push(id);
         this.setState({
            favourites: this.state.favourites
         })
      }
      else {
         this.state.favourites.splice(this.state.favourites.indexOf(id), 1)
         this.setState({
            favourites: this.state.favourites
         })
      }
   }

   async search(query, pageNo) {

      let params = {};

      if (query.trim() === '') {
         params = {
            page: this.state.pageNo,
            per_page: 40
         };
      } else {
         params = {
            page: this.state.pageNo,
            per_page: 40,
            beer_name: query
         }
      }

      await Axios.get('https://api.punkapi.com/v2/beers', {params})
         .then((res) => {

            if (res.data.length > 0) {
               res.data.forEach(x => {
                  x.isFav = false;
                  for (let i of this.state.favourites) {
                     if (i === x.id) {
                        x.isFav = true;
                     }
                  }
               })
            }

            if (this.state.pageNo === 1) {
               this.setState({
                  results: res.data,
                  scrollVal: 0,
               });
            }
            else {
               this.setState((prevState) => {
                  return {results: this.state.results.concat(res.data)};
               });
            }
         })
         .catch((e) => {
            console.error(e)
         })

   }

   loadMore() {
      this.setState((prevState) => {
         return {pageNo: ++prevState.pageNo}
      });
      this.search(this.state.query, this.state.pageNo)
   }

   updateQuery(searchTerm) {

      this.setState({
         query: searchTerm,
         pageNo: 1,
      });

      setTimeout(() => {
         this.search(this.state.query, this.state.pageNo)
      }, 100)
   }

   render() {
      return (
         <section className="beer-app">
            <div className="container">

               <Header sections={this.state.sections} currSection={this.state.currSection}
                       changeSection={this.changeSection}/>

               <Search query={this.state.query} updateQuery={this.updateQuery} currSection={this.state.currSection}/>

               <MainContainer favourites={this.state.favourites} query={this.state.query} results={this.state.results}
                              currSection={this.state.currSection} addToFav={this.addToFav}/>

            </div>
         </section>
      );
   }

}

export default App;