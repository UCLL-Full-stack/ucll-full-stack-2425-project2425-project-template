import { Profile } from "@/types";

const completeProfile = async (profile: Profile) => {
  const user = sessionStorage.getItem("loggedInUser");
  const token = user ? JSON.parse(user).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });
  if (response.ok) return response.json();
};

export default { completeProfile };
