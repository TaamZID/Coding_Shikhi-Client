// import React, { useContext, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

// const Signup = () => {
//   const [error, setError] = useState("");
//   const { createUser } = useContext(AuthContext);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     console.log(name, email, password);
//     createUser(email, password)
//       .then((result) => {
//         const user = result.user;
//         console.log(user);
//         setError("");
//         form.reset();
//       })
//       .catch((e) => {
//         console.error(e);
//         setError(e.message);
//       });
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="formBasicName">
//         <Form.Label>Name</Form.Label>
//         <Form.Control name="name" type="text" placeholder="Enter name" />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           name="email"
//           type="email"
//           placeholder="Enter email"
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Signup
//       </Button>
//       <Form.Text className="text-danger">{error}</Form.Text>
//     </Form>
//   );
// };

// export default Signup;

import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  // MDBInput,
  // MDBCheckbox,
} from "mdb-react-ui-kit";

const Signup = () => {
  // Toggle login/signup starts
  const [justifyActive, setJustifyActive] = useState("tab2");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  // Toggle login/signup ends

  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { providerLogin } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  const handleGithubSignIn = () => {
    providerLogin(githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  const from = location.state?.from?.pathname || "/";

  const HandleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        form.reset();
        handleUpdateUserProfile(name, photoURL);
      })
      .catch((e) => {
        console.error(e);
        setError(e.message);
      });
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    // <Form onSubmit={HandleSubmit}>
    //   <h3>Please Login</h3>
    //   <Form.Group className="mb-3" controlId="formBasicEmail">
    //     <Form.Label>Email address</Form.Label>
    //     <Form.Control
    //       name="email"
    //       type="email"
    //       placeholder="Enter email"
    //       required
    //     />
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="formBasicPassword">
    //     <Form.Label>Password</Form.Label>
    //     <Form.Control
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //       required
    //     />
    //   </Form.Group>

    //   <Button variant="primary" type="submit">
    //     Login
    //   </Button>
    //   <Form.Text className="text-danger">{error}</Form.Text>
    //   <br />
    //   <br />
    //   <ButtonGroup vertical>
    //     <Button
    //       onClick={handleGoogleSignIn}
    //       className="mb-2"
    //       variant="outline-primary"
    //     >
    //       SignIn with Google
    //     </Button>
    //     {/* <Button variant="outline-dark"></Button> */}
    //   </ButtonGroup>
    // </Form>

    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <ButtonGroup vertical>
                  <Button
                    onClick={handleGoogleSignIn}
                    className="mb-2"
                    variant="outline-primary"
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </Button>
                  {/* <Button variant="outline-dark"></Button> */}
                </ButtonGroup>
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <Button onClick={handleGithubSignIn} variant="outline-dark">
                  <MDBIcon fab icon="github" size="sm" />
                </Button>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <Form onSubmit={HandleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
            <Form.Text className="text-danger">{error}</Form.Text>
            <br />
            <br />
          </Form>

          {/* <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            name="email"
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            name="password"
            required
          />

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn> */}
          <p className="text-center">
            Not a member? <Link to="/signup">Signup</Link>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <div className="text-center mb-3">
            <p>Sign up with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <ButtonGroup vertical>
                  <Button
                    onClick={handleGoogleSignIn}
                    className="mb-2"
                    variant="outline-primary"
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </Button>
                  {/* <Button variant="outline-dark"></Button> */}
                </ButtonGroup>
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <Button onClick={handleGithubSignIn} variant="outline-dark">
                  <MDBIcon fab icon="github" size="sm" />
                </Button>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          {/* <MDBInput wrapperClass="mb-4" label="Name" id="form1" type="text" />
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="form1"
            type="text"
          />
          <MDBInput wrapperClass="mb-4" label="Email" id="form1" type="email" />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form1"
            type="password"
          />

          <div className="d-flex justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I have read and agree to the terms"
            />
          </div>

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn> */}
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                name="photoURL"
                type="text"
                placeholder="Photo URL"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Signup
            </Button>
            <Form.Text className="text-danger">{error}</Form.Text>
          </Form>
          <p className="text-center">
            Already a member? <Link to="/login">Login</Link>
          </p>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default Signup;
