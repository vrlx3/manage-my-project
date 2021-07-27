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
