import React from "react";
import { uriBase, api } from "../const";
import objectId from 'bson-objectid';
export default function UsersF(props) {
  const [users, setUsers] = React.useState(objectId());
  const [id, setId] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");
  const [userName, setuserName] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [showId, setshowId] = React.useState(true);

  const refresh = () => {
    console.log("refresh");
    fetch(`${uriBase}${api}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(HttpResponse => {
        if (!HttpResponse.ok) {
          throw new Error("Bad Response");
        }
        return HttpResponse.json();
      })
      .then(users => {
        setUsers(users);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onEditClickHandler = (event, index) => {
    let user = users[index];
    setId(user._id);
    setfName(user.fName);
    setlName(user.lName);
    setuserName(user.userName);
    setpassword(user.password);
    setshowId(false);
  };

  const onSaveHandler = () => {
    let update = {};
    let method ="PATCH"

    let user = users.find(user => {
      return user._id === id;
    });

   if (user !== undefined) {
      //found? we are patching
      
            if (user.fName !== fName ||user.fName === undefined) {
              update.fName = fName;
            }
       
            if (user.lName !== lName ||user.lName === undefined) {
              update.lName = lName;
            }
          
            if (user.userName !== userName ||user.userName === undefined) {
              update.userName = userName;
            }
           
            if (user.password !== password ||user.password === undefined) {
              update.password = password;
            }
       else {
         //not found, we are posting
         method = "PUT"
         update._id = id
         update.fName = fName
         update.lName = lName
         update.userName = userName
         update.password = password
      }
      console.log(update)
    }
    //make sure we are not trying to update with a blank object
    if (Object.entries(update).length>0) {
    //patch or put
    fetch(`${uriBase}${api}/users/${id}`, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(update)
    })
    .then(httpResponse => {
      if(!httpResponse.ok) {
        throw new Error (`Couldn't $(method}`)
      }
      return httpResponse.json()
    })
    .then(user => {
      refresh()
    })
    .catch(error => {
      console.log(error)
    })
  }
 } //end of onSaveHandler

  const onCancelHandler = () => {
    setId(objectId());
    setfName("");
    setlName("");
    setuserName("");
    setpassword("");
    setshowId(true);
  };
  const onDeleteClickHandler = (event, index) => {
    const id = users[index]._id;
    fetch(`${uriBase}${api}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(httpResponse => {
        if (!httpResponse.ok) {
          throw new Error("Delete Failed");
        }
        return httpResponse.json();
      })
      .then(response => {
        refresh();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangeHandler = event => {
    switch (event.target.name) {
      case "id":
        setId(event.target.value);
        break;

      case "fName":
        setfName(event.target.value);
        break;

      case "lName":
        setlName(event.target.value);
        break;

      case "userName":
        setuserName(event.target.value);
        break;

      case "password":
        setpassword(event.target.value);
        break;

      default:
    }
  };

  const idField = () => {
    if (showId === true) {
      return (
        <React.Fragment>
          Id<input onChange={onChangeHandler} name="id" value={id}></input>
        </React.Fragment>
      );
    } else {
      return null;
    }
  
};

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <h1>DB Users</h1>
      <div>
        <ul>
          {users.map((user, index) => {
            return (
              <li key={index}>
                {user.fName}
                <button
                  onClick={event => {
                    onEditClickHandler(event, index);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={event => {
                    onDeleteClickHandler(event, index);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {idField()}
        First Name
        <input onChange={onChangeHandler} name="fName" value={fName}></input>
        Last Name
        <input onChange={onChangeHandler} name="lName" value={lName}></input>
        Username
        <input
          onChange={onChangeHandler}
          name="userName"
          value={userName}
        ></input>
        password
        <input
          onChange={onChangeHandler}
          name="password"
          value={password}
        ></input>
      </div>
      <div>
        <button onClick={onSaveHandler}>Save</button>
        <button onClick={onCancelHandler}>Cancel</button>
      </div>
    </div>
  );
}

