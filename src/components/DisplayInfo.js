import React, { Component } from "react";
import "./DisplayInfo.scss";
import logo from "../logo.svg";

// export default class DisplayInfo extends Component {
//   render() {
//     console.log("render");
//     const { listUsers } = this.props;
//     return (
//       <div className="display-info-container">
//         {true && (
//           <>
//             {listUsers.map((item) => {
//               return (
//                 <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
//                   <div>
//                     <div>My name's {item.name} </div>
//                     <div>I'm {item.age} years old </div>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(item.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <br />
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfo = (props) => {
  const { listUsers } = props;

  return (
    <div className="display-info-container">
      {true && (
        <>
          {listUsers.map((item) => {
            return (
              <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                <div>
                  <div>My name's {item.name} </div>
                  <div>I'm {item.age} years old </div>
                </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(item.id)}>
                    Delete
                  </button>
                </div>
                <br />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfo;
