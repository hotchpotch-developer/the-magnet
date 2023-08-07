import { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const passwordAddedOn = () => {
        let element = document.querySelector('#password-input');
        element.setAttribute('type', element.type === 'password' ? 'text' : 'password');
    }

    useEffect(() => {
        document.querySelector("html").setAttribute("data-bs-theme", "dark");
    }, []);

    return (
        <>
            <div className="auth-page-wrapper pt-5">
                <div className="auth-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src="/images/logo-light.png" alt="Login Logo" height="20" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-4 card-bg-fill">

                                    <div className="card-body p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Velzon.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">Username</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <label className="form-label" htmlFor="password-input">Password</label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <input type="password" className="form-control pe-5 password-input" placeholder="Enter password" id="password-input" />
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => passwordAddedOn()}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="btn btn-primary w-100" type="submit">Sign In</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy; Velzon. Designed by <i className="mdi mdi-heart text-danger"></i> by .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
export default Login;