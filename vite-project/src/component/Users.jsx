import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUser] = useState([]);
  const [showTotal, setShowTotal] = useState(true);

  let total = users.reduce((t, user) => {
    return t + user?.marks || 0;
  }, 0);

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((users) => {
        setUser(
          users.map((user) => {
            user.marks = Math.round(Math.random() * 100);
            return user;
          })
        );
      });
  }, []);

  function updateUser(userid, update) {
    setUser(
      users.map((user) => {
        if (user.id === userid) {
          return {
            ...user,
            ...update,
          };
        }
        return user;
      })
    );
  }
  return (
    <div className="U">
      <h1>Users</h1>
      <button onClick={() => setShowTotal(!showTotal)}>Toggle</button>
      {showTotal && <h4>Total Marks: {total}</h4>}
      <hr />
      <section className="users">
        {users.map((user) => {
          return (
            <UserCard onUserChange={updateUser} user={user} key={user.id} />
          );
        })}
      </section>
    </div>
  );
}

function UserCard(props) {
  const { user, onUserChange } = props;
  const [values, setValues] = useState({
    email: "",
    name: "",
  });

  function handleOnClick(id) {
    onUserChange(id, values);
  }

  const onChange = ({ target: { name, value } }) => {
    if (name === "name")
      setValues({ email: `${value}@gmail.com`, name: value });
   else
    setValues({ ...value, [name]: Number(value) });
  };
  return (
    <div className="user-card">
      <div className="details">
        <h4>Name : {user.name}</h4>
        <p>Age : {user.age}</p>
        <p>Email : {user.email}</p>
        <p>Number : {user.phone}</p>
        <p>City : {user.city}</p>
        <p>Marks : {user.marks}</p>
      </div>
      <div className="inputs">
        <input
          onChange={onChange}
          type="text"
          name="name"
          value={values.name}
          placeholder="Type Name"
        />
        <input
          onChange={onChange}
          type="number"
          name="marks"
          value={values.marks}
          placeholder="Type Marks"
        />
        <input type="text" name="email" placeholder="Type Email" />
        <input className="sub"
          type="submit"
          onClick={() => handleOnClick(user.id)}
          value={"Update"}
        />
      </div>
    </div>
  );
}
