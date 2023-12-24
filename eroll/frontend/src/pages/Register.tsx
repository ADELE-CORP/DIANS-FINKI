import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

interface Values {
    email: string;
    password: string;
}

function Register() {
    const [cookies] = useCookies(["cookie-name"]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (cookies.jwt) {
    //         navigate("/");
    //     }
    // }, [cookies.jwt, navigate]);

    const [values, setValues] = useState<Values>({ email: "", password: "" });

    const generateError = (error: string) =>
        toast.error(error, {
            position: "bottom-right",
        });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/register",
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
                    navigate("/login");
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Register Account</h2>
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
                        Already have an account ? <Link to="/login" className="text-blue-500">Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Register;
