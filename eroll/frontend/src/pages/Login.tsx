import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

interface Values {
    email: string;
    password: string;
}

function Login() {
    const [cookies] = useCookies(['jwt']);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.jwt) {
            axios.get('http://localhost:4000/auth/user', { withCredentials: true })
                .then(response => {
                    if (response.data.status) {
                        toast.success(`Welcome, ${response.data.user.email}`, {
                            position: "bottom-right",
                        });
                        navigate("/");
                    }
                })
                .catch(error => console.log(error));
        }
    }, [cookies, navigate]);


    const [values, setValues] = useState<Values>({ email: "", password: "" });

    const generateError = (error: string) =>
        toast.error(error, {
            position: "bottom-right",
        });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/login",
                {
                    ...values,
                },
                { withCredentials: true }
            );

            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    toast.success(`Hello, ${values.email}`, {
                        position: "bottom-right",
                    });
                    navigate('/mapgen', { state: { email: values.email } });
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Login to your Account</h2>
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded font-medium uppercase cursor-pointer">Submit</button>
                <span>
         Don't have an account ?<Link to="/register" className="text-blue-500"> Register</Link>
        </span>
            </form>
            <ToastContainer />
        </div>
        </div>
    );
}

export default Login;

