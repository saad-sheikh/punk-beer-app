import React from 'react';

const Header = (props)=> {

      return (
         <section className="header">
            <div className="level is-mobile">
               <div className="level-left">
                  <span className="level-item head-left title">Beans Lover Beers</span>
               </div>

               <div className="level-right">
                  {props.sections.map((s, index) =>
                     <span key={index}
                           className={"level-item head-right " + (props.currSection.trim().toLowerCase() === s.trim().toLowerCase() ? 'active' : '')}
                           onClick={()=> props.changeSection(s)}
                     >{s}</span>
                  )}
               </div>
            </div>
         </section>
      )

};

export default Header;