import axios from "axios";
import { useState } from "react";

interface IProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body: any;
  onSuccess: () => void;
}

const useRequest = ({ url, method, body, onSuccess }: IProps) => {
  const [error, setErrors] = useState<any>(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      onSuccess();
      return response.data;
    } catch (err) {
      console.log("Error", err);
      setErrors(err);
    }
  };

  return [doRequest, error];
};

export default useRequest;
