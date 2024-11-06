import React, { Component, useState } from "react";
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
  const [isShowHideUserList, setShowHideUserList] = useState(true);
  const handleHideShowUserList = () => {
    setShowHideUserList(!isShowHideUserList);
  };

  return (
    <div className="display-info-container">
      <div>
        <button
          onClick={() => handleHideShowUserList()}
          className={isShowHideUserList === true ? "purple" : "green"}
        >
          {isShowHideUserList === true ? "Hide list users" : "Show list users"}
        </button>
      </div>
      {isShowHideUserList && (
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
