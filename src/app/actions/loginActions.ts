"use server";

export async function loginUserAction(loginData: {
  userName: string;
  password: string;
}) {
  try {
    // console.log('Attempting to fetch from:', 'https://localhost:7063/api/login/LoginUser');
    const response = await fetch(`https://127.0.0.1:7063/api/login/LoginUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    console.log(data);

    if (data.message.includes("gin")) {
      return { success: true, message: "Login successful!" };
    } else {
      return {
        success: false,
        message: data.message || "Invalid credentials.",
      };
    }
  } catch (error) {
    console.error("Error during login", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
