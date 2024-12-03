export const BASE_URL = "http://localhost:5000/api";

export const getRequest = async (
  url: string,
  method: string = 'GET',
  headers: Record<string, string> = {},
  body: any = null
) => {
  const apiurl = `${BASE_URL}${url}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers, // Merge user-defined headers with default headers
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(apiurl, options);
    const data = await response.json();

    if (!response.ok) {
      let message = "Error occurred!";
      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
      return { error: true, message };
    }

    return data;
  } catch (error) {
    console.error("Network error:", error);
    return { error: true, message: "Network error" };
  }
};


export const postRequest = async (url: string, body: any): Promise<any> => {
  const apiurl = `${BASE_URL}${url}`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify(body), // Serialize the body as JSON
  };

  const response = await fetch(apiurl, options);
  const data = await response.json();

  if (!response.ok) {
    let message = data?.message ? data.message : data;
    return { error: true, message };
  }

  return data;
};

