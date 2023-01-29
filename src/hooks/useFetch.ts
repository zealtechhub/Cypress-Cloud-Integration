import { FormDataType } from "src/components/auth/CompleteDetails";
import { User } from "src/lib/types";
import { message } from "antd";
import React from "react";

function useFetch() {
  const controller = new AbortController();
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    return () => {
      controller.abort();
      console.log("Fetch Aborted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customFetch = async <T>(
    url: string,
    method: "GET" | "POST",
    body?: BodyInit | null | undefined
  ): Promise<T & { error: boolean }> => {
    let responseData, error;
    try {
      setFetching(true);
      const requestData = await fetch(url, {
        method,
        body,
        headers: {
          Accept: "application/json",
        },
        redirect: "follow",
        signal: controller.signal,
      });

      responseData = (await requestData?.json()) ?? {};
    } catch (err) {
      console.error(err);
      message.error("We have issue communicating with the server");
      responseData = {};
      error = true;
    } finally {
      setFetching(false);
    }

    setFetching(false);
    return { ...responseData, error };
  };

  const fakeFetch = async <T>(data: T): Promise<T> => {
    setFetching(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setFetching(false);
        resolve(data);
      }, 3000);
    });
  };

  const userRegistered = async (phone: string): Promise<boolean> => {
    // const { isRegistered } = await customFetch<{ isRegistered: boolean }>(
    //   "",
    //   "POST"
    // );
    return await fakeFetch(false);
  };

  const sign = async (credentials: {
    phone: string;
    password: string;
  }): Promise<{ user: User | null; error?: boolean }> => {
    // * @type userDetails = {verified: boolean, ...others}
    // * response should return {user: null | userDetails}
    // return await customFetch<{ user: User | null }>(
    //   "https://node.wizarphics.com/users/sign-in/",
    //   "POST",
    //   JSON.stringify(credentials)
    // );

    return await fakeFetch({
      user: {
        email: "oderindejames02@gmail.com",
        name: "Timi James",
        gender: "male",
        phone: credentials.phone,
        verified: true,
      },
    });
  };

  type CreateReturnType = {
    /** Tell if user has been created or not */
    success: boolean;
    /** feedback like ("Account Created Successfully") or reason why success is false */
    feedback: string;
    /** This tell if there is error communicating with the server */
    error?: boolean;
  };

  const create = async (newUser: FormDataType): Promise<CreateReturnType> => {
    // return await customFetch<CreateReturnType>("", "POST", JSON.stringify(newUser))

    return await fakeFetch({
      success: true,
      feedback: "Account Created Successfully",
      error: false,
    });
  };

  const verify = async (otp: number) => {};

  const logout = async () => {
    sessionStorage.removeItem("user");
  };

  const sendCode = async (phone: string) => {
    // return await customFetch<{ success: boolean; message: object }>(
    //   "http://127.0.0.1:8000",
    //   "POST",
    //   JSON.stringify({ phone });
    // );
  };

  return {
    fetching,
    userRegistered,
    sign,
    logout,
    create,
    verify,
    customFetch,
    sendCode,
  };
}

export default useFetch;
