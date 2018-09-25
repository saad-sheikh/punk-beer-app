import React from 'react';

const Search = (props) => {

   return (

      <div className="columns is-mobile">
      <div className="column is-9-mobile is-12-desktop">
         <div className="field has-addons">
         { props.currSection.trim().toLowerCase() === 'home' &&
         <div className="control input-btn has-icons-left is-expanded">
               <input className="input is-medium" type="text" value={props.query}
                      onChange={(event) => props.updateQuery(event.target.value)}
                      placeholder="Search for beers..."/>
               <span className="icon is-left">
              <i className="fas fa-search"></i>
                </span>
               <button className="button is-medium is-info search-btn">
                  Search
               </button>
            </div>
         }
         {
            props.currSection.trim().toLowerCase() !== 'home' && <div className="title fav-header">
               Favourites
            </div>
         }
      </div>
      </div>
      </div>
   )

};

export default Search;
