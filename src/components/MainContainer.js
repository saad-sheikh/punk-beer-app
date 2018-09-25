import React, {Component} from 'react';
import star from '../assets/star.svg'
import emptyStar from '../assets/empty-star.svg'

class ProductContainer extends Component {

   constructor(props) {
      super(props);
      this.state = {
         item: props.item
      };
      this.toggleFav = this.toggleFav.bind(this);
   }

   truncate(text, length) {
      const clamp = '...';
      length = length || 30;
      if (text.length <= length) return text;
      let tcText = text.slice(0, length - clamp.length);
      return tcText + clamp;
   }

   toggleFav(item) {
      item.isFav = !item.isFav;

      this.setState({
         item: item
      });

      item.isFav === true ? this.props.addToFav(item.id, true) : this.props.addToFav(item.id, false);
   }

   render() {

      let item = this.state.item;

      return (
               <div className="card">
                  <div className="card-image">
                     <figure className="image is-4by3">
                        <img src={item.image_url} className="prod-img" alt={item.name}/>
                     </figure>
                  </div>
                  <div className="card-content">
                     <div className="media">
                        <div className="media-content">
                           <p className="title product-name is-4">{item.name}</p>
                        </div>
                        <div className="wishlist-icon" onClick={() => {this.toggleFav(item)}}>
                           {item.isFav ? <img src={star} alt="Star" title="Added to Favourites" /> : <img src={emptyStar} alt="Empty Star" title="Add to Favourites" />}
                        </div>
                     </div>

                     <div className="prod-description">
                        <span>{this.truncate(item.description, 100)}</span>
                     </div>
                  </div>
               </div>

      )
   }

}

const MainContainer = (props)=> {

      return (
         <section className="container result-container">
            <div className="columns is-multiline is-mobile">
               {
                  props.results.filter((x) => {
                     if(props.currSection.trim().toLowerCase() !== 'home') {
                        if (x.isFav) {
                           return x;
                        }
                     }
                     else {
                        return x;
                     }
                     return 0;
                  })
                     .map((item) =>
                     <div className="column is-12-mobile is-3-desktop" key={(item.id +Math.random()).toString()}>
                        <ProductContainer item={item} currSection={props.currSection} addToFav={props.addToFav}/>
                     </div>
                  )
               }
            </div>

            <div className="no-result-msg">
            { props.results.length === 0 && props.currSection.trim().toLowerCase() === 'home' && props.query.trim().length > 0 &&
               <div className="title is-6">
                  Sorry, No Results Found
               </div>
            }
               {props.currSection.trim().toLowerCase() !== 'home' && props.favourites.length === 0 &&
               <div className="title is-6">
                  No Favourites Added
               </div>
               }
            </div>

         </section>
      )
   };

export default MainContainer;