import React, { Component, useState } from "react";

// export default class AddUserInfo extends Component {
//   state = {
//     name: "",
//     address: "HCM",
//     age: "",
//   };

//   handleOnChange = (event) => {
//     this.setState({
//       name: event.target.value,
//     });
//   };

//   handleOnSubmit = (event) => {
//     event.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };

//   handleChangeName = (event) => {
//     this.setState({ name: event.target.value });
//   };

//   handleChangeAge = (event) => {
//     this.setState({
//       age: parseInt(event.target.value),
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is {this.state.name} and I'm {this.state.age}
//         <form
//           onSubmit={(event) => {
//             this.handleOnSubmit(event);
//           }}
//         >
//           <label>
//             Your name:
//             <input
//               value={this.state.name}
//               type="text"
//               onChange={(event) => {
//                 this.handleChangeName(event);
//               }}
//             />
//           </label>
//           <label>
//             Your age:
//             <input
//               value={this.state.age}
//               type="text"
//               onChange={(event) => {
//                 this.handleChangeAge(event);
//               }}
//             />
//           </label>
//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

const AddUserInfo = (props) => {
  // state = {
  //   name: "",
  //   address: "HCM",
  //   age: "",
  // };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("HCM");
  const [age, setAge] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };

  const handleChangeName = (event) => {
    // this.setState({ name: event.target.value });
    setName(event.target.value);
  };

  const handleChangeAge = (event) => {
    // this.setState({
    //   age: parseInt(event.target.value),
    // });
    setAge(event.target.value);
  };
  return (
    <div>
      My name is {name} and I'm {age}
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <label>
          Your name:
          <input
            value={name}
            type="text"
            onChange={(event) => {
              handleChangeName(event);
            }}
          />
        </label>
        <label>
          Your age:
          <input
            value={age}
            type="text"
            onChange={(event) => {
              handleChangeAge(event);
            }}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfo;
