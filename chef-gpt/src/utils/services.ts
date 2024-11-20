export const BASE_URL = "http://localhost:5000/api";

export const getRequest = async (url: string) => {
    const apiurl = `${BASE_URL}${url}`;

  try {
    const response = await fetch(apiurl);
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
