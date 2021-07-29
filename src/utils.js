import axios from "axios";

export async function addActivity(activityString) {
  try {
    const data = await axios.post("/api/activities", {
      activity: activityString,
    });
    // console.log("from utils.js", data);
    return data;
  } catch (error) {
    console.error("Error adding new activity", error);
    return error;
  }
}

export async function logIn(ev, email, password) {
  ev.preventDefault();
  try {
    const data = await axios.post("/api/register", { email, password });
    return data;
  } catch (error) {
    console.error("error with axios login", error);
    return error;
  }
}

export async function register(regObj) {
  try {
    const data = await axios.post("/api/register", regObj);
    return data;
  } catch (error) {
    return error;
  }
}
