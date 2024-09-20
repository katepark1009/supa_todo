"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import * as Yup from "yup";

export default function SignUp({ setView }) {
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  const validationSchema = useMemo(() => {
    if (confirmationRequired) {
      return Yup.object().shape({
        otp: Yup.string().required().length(6, "Please type 6 digits."),
      });
    } else {
      return Yup.object().shape({
        email: Yup.string()
          .email("Please type a valid email.")
          .required("Please type a valid email."),
        password: Yup.string()
          .min(1, "Please type a valid password.")
          .required("Please type a valid password."),
      });
    }
  }, [confirmationRequired]);

  const supabase = createBrowserSupabaseClient();
  // signup mutation

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (confirmationRequired) {
        verifyOtpMutation.mutate();
      } else {
        signupMutation.mutate();
      }
    },
  });

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });
    console.log(data);
  };

  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email: formik.values.email,
        password: formik.values.password,
        options: {
          emailRedirectTo: "http://localhost:3000/signup/confirm",
        },
      });

      if (data) {
        setConfirmationRequired(true);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email: formik.values.email,
        token: formik.values.otp,
      });

      if (data) {
        console.log(data);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        {confirmationRequired ? (
          <>
            <Input
              value={formik.values.otp}
              onChange={formik.handleChange}
              label="otp"
              name="otp"
              type="text"
              className="w-full rounded-sm"
              placeholder="Please type 6 digit code"
            />
            <span className="text-red-700">{formik.errors.otp}</span>
          </>
        ) : (
          <>
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              label="email"
              name="email"
              type="email"
              className="w-full rounded-sm"
            />
            <span className="text-red-700">{formik.errors.email}</span>
            <Input
              value={formik.values.password}
              onChange={formik.handleChange}
              label="password"
              name="password"
              type="password"
              className="w-full rounded-sm"
            />
            <span className="text-red-700">{formik.errors.password}</span>
          </>
        )}
        <Button
          type="submit"
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          disabled={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          color="light-blue"
          className="w-full text-md py-1"
        >
          {confirmationRequired ? "Verify" : "Sign up"}
        </Button>
        <Button
          onClick={() => signInWithGithub()}
          className="w-full text-md py-1"
        >
          Github Login
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        <div>
          Do you have an account?
        </div>
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNIN")}
        >
          Login
        </button>
      </div>
    </form>
  );
}